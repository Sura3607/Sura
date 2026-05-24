import { ProjectCard } from "@/components/project/project-card";
import { SectionHeader } from "@/components/sections/section-header";

export const metadata = {
  title: "Projects",
  description: "Selected software, backend, and AI projects.",
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
      <SectionHeader
        eyebrow="Projects"
        title="Evidence of how the work gets built."
        description="Replace placeholder cards with Sanity project queries, filters, and search."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ProjectCard
          title="Project template"
          summary="Problem, solution, architecture, screenshots, links, and lessons learned."
          tags={["TypeScript", "Backend", "AI"]}
          href="/projects/project-template"
        />
      </div>
    </main>
  );
}
