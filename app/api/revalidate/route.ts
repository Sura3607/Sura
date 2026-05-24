import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const allowedTags = new Set([
  "profile",
  "projects",
  "blog",
  "skills",
  "certificates",
  "experiences",
]);

export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret");

  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const tag = typeof body.tag === "string" ? body.tag : null;
  const path = typeof body.path === "string" ? body.path : null;

  if (tag && allowedTags.has(tag)) {
    revalidateTag(tag, "max");
  }

  if (path && path.startsWith("/")) {
    revalidatePath(path, "page");
  }

  return NextResponse.json({ revalidated: true });
}
