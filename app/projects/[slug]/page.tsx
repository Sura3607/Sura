import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/sections/section-header";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params;

  return {
    title: slug,
    description: "Project detail page.",
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-20 sm:px-8 lg:px-10">
      <SectionHeader
        eyebrow="Project detail"
        title={slug.replaceAll("-", " ")}
        description="Wire this page to Sanity using project slug, then render problem, solution, architecture, screenshots and links."
      />
    </main>
  );
}
