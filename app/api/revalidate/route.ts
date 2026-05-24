import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const allowedTags = new Set([
  "siteSettings",
  "profile",
  "projects",
  "blog",
  "skills",
  "certificates",
  "experiences",
]);

const allowedPathPrefixes = [
  "/",
  "/about",
  "/projects",
  "/blog",
  "/skills",
  "/resume",
  "/contact",
];

export async function POST(request: Request) {
  const url = new URL(request.url);
  const secret =
    request.headers.get("x-revalidate-secret") ?? url.searchParams.get("secret");

  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const tag = typeof body.tag === "string" ? body.tag : null;
  const path = typeof body.path === "string" ? body.path : null;
  const slug = typeof body.slug === "string" ? body.slug : null;
  const type = typeof body._type === "string" ? body._type : null;
  const revalidated = new Set<string>();

  if (tag && allowedTags.has(tag)) {
    revalidateTag(tag, "max");
    revalidated.add(`tag:${tag}`);
  }

  if (tag?.startsWith("project:") || tag?.startsWith("blog:")) {
    revalidateTag(tag, "max");
    revalidated.add(`tag:${tag}`);
  }

  if (path && allowedPathPrefixes.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))) {
    revalidatePath(path, "page");
    revalidated.add(`path:${path}`);
  }

  if (type === "project" && slug) {
    revalidateTag("projects", "max");
    revalidateTag(`project:${slug}`, "max");
    revalidatePath("/projects", "page");
    revalidatePath(`/projects/${slug}`, "page");
    revalidated.add("tag:projects");
    revalidated.add(`tag:project:${slug}`);
    revalidated.add("path:/projects");
    revalidated.add(`path:/projects/${slug}`);
  }

  if (type === "blogPost" && slug) {
    revalidateTag("blog", "max");
    revalidateTag(`blog:${slug}`, "max");
    revalidatePath("/blog", "page");
    revalidatePath(`/blog/${slug}`, "page");
    revalidated.add("tag:blog");
    revalidated.add(`tag:blog:${slug}`);
    revalidated.add("path:/blog");
    revalidated.add(`path:/blog/${slug}`);
  }

  if (revalidated.size === 0) {
    return NextResponse.json(
      { error: "No valid tag, path, or Sanity document payload provided." },
      { status: 400 },
    );
  }

  return NextResponse.json({ revalidated: true, targets: Array.from(revalidated) });
}
