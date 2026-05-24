import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid contact payload." }, { status: 400 });
  }

  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const receiver = process.env.CONTACT_RECEIVER_EMAIL;

  if (!apiKey || !receiver) {
    return NextResponse.json(
      { error: "Email service is not configured yet." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: receiver,
    replyTo: parsed.data.email,
    subject: `Portfolio contact: ${parsed.data.name}`,
    text: parsed.data.message,
  });

  return NextResponse.json({ ok: true });
}
