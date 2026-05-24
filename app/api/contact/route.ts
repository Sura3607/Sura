import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validators";

const rateWindowMs = 60_000;
const maxRequestsPerWindow = 3;
const requestCounts = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid contact payload." }, { status: 400 });
  }

  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  const now = Date.now();
  const bucket = requestCounts.get(ip);

  if (bucket && bucket.resetAt > now) {
    if (bucket.count >= maxRequestsPerWindow) {
      return NextResponse.json(
        { error: "Too many contact attempts. Please try again in a minute." },
        { status: 429 },
      );
    }

    bucket.count += 1;
  } else {
    requestCounts.set(ip, { count: 1, resetAt: now + rateWindowMs });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const receiver = process.env.CONTACT_RECEIVER_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  if (!apiKey || !receiver) {
    return NextResponse.json(
      { error: "Email service is not configured yet." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from,
    to: receiver,
    replyTo: parsed.data.email,
    subject: `Portfolio contact: ${parsed.data.name}`,
    text: [
      `Name: ${parsed.data.name}`,
      `Email: ${parsed.data.email}`,
      "",
      parsed.data.message,
    ].join("\n"),
  });

  return NextResponse.json({ ok: true });
}
