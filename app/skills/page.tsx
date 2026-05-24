import { SectionHeader } from "@/components/sections/section-header";

export const metadata = {
  title: "Skills",
  description: "Technical skills grouped by category and project evidence.",
};

export default function SkillsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20 sm:px-8 lg:px-10">
      <SectionHeader
        eyebrow="Skills"
        title="Grouped by practical use, not arbitrary percentages."
        description="Use Sanity skill documents and link skills to real projects."
      />
    </main>
  );
}
