import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/sections/section-header";
import { ContentBlocks } from "@/components/ui/content-blocks";
import { PageShell } from "@/components/ui/page-shell";
import { getBlogPostBySlug } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  return createMetadata({
    title: post?.seoTitle ?? post?.title ?? slug,
    description: post?.seoDescription ?? post?.excerpt ?? "Blog detail page.",
    path: `/blog/${slug}`,
    type: "article",
  });
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <PageShell narrow>
      <article>
        <SectionHeader
          eyebrow={post.readingTime ? `${post.readingTime} min read` : "Article"}
          title={post.title}
          description={post.excerpt}
        />
        {post.tags?.length ? (
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span className="rounded-[var(--radius-buttons)] border border-graphite-rail bg-vapor-gray px-3 py-1.5 font-mono text-xs text-fog" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        <div className="mt-12 text-base font-normal leading-8 text-fog">
          <ContentBlocks value={post.body} fallback="Article content will appear after the Sanity body field is filled." />
        </div>
      </article>
    </PageShell>
  );
}
