import { SectionHeader } from "@/components/sections/section-header";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  return {
    title: slug,
    description: "Blog detail page.",
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  return (
    <main className="mx-auto max-w-3xl px-6 py-20 sm:px-8 lg:px-10">
      <SectionHeader
        eyebrow="Article"
        title={slug.replaceAll("-", " ")}
        description="Wire this page to Sanity Portable Text content."
      />
    </main>
  );
}
