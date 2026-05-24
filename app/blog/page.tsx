import { SectionHeader } from "@/components/sections/section-header";

export const metadata = {
  title: "Blog",
  description: "Technical notes and project writeups.",
};

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20 sm:px-8 lg:px-10">
      <SectionHeader
        eyebrow="Notes"
        title="Technical writing that explains the decisions."
        description="Connect this page to Sanity blogPost documents and render published posts."
      />
    </main>
  );
}
