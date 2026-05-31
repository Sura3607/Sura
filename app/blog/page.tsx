import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/sections/section-header";
import { EmptyState } from "@/components/ui/empty-state";
import { PageShell } from "@/components/ui/page-shell";
import { getBlogPosts } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Blog",
  description: "Technical notes and project writeups.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <PageShell narrow>
      <SectionHeader
        eyebrow="Notes"
        title="Technical writing that explains the decisions."
        description="Short notes and project writeups on AI workflows, backend architecture, and implementation tradeoffs."
      />

      {posts.length ? (
        <div className="mt-10 grid gap-4">
          {posts.map((post) => (
            <Link
              className="group rounded-[var(--radius-cards)] border border-graphite-rail bg-vapor-gray p-6 transition-colors hover:border-smoke"
              href={`/blog/${post.slug.current}`}
              key={post.slug.current}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs font-medium uppercase text-sky-blue">
                    {post.readingTime ? `${post.readingTime} min read` : "Article"}
                  </p>
                  <h2 className="mt-3 text-2xl font-medium leading-tight text-charcoal-void">{post.title}</h2>
                </div>
                <ArrowUpRight
                  className="shrink-0 text-fog transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-charcoal-void"
                  size={20}
                />
              </div>
              {post.excerpt ? (
                <p className="mt-4 text-sm font-normal leading-6 text-fog">
                  {post.excerpt}
                </p>
              ) : null}
              {post.tags?.length ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span className="rounded-[var(--radius-buttons)] border border-graphite-rail px-2 py-1 font-mono text-xs text-fog" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-10">
          <EmptyState
            title="No published notes yet."
            description="Publish blogPost documents in Sanity and this page will list them."
            href="/admin"
            action="Open Studio"
          />
        </div>
      )}
    </PageShell>
  );
}
