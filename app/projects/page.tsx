import { ProjectCard } from "@/components/project/project-card";
import { SectionHeader } from "@/components/sections/section-header";
import { EmptyState } from "@/components/ui/empty-state";
import { PageShell } from "@/components/ui/page-shell";
import { getProjects } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Projects",
  description: "Selected software, backend, and AI projects.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const projects = await getProjects();
  const categories = Array.from(new Set(projects.map((project) => project.category).filter(Boolean)));

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Projects"
        title="Evidence of how the work gets built."
        description="Each case study is shaped around the problem, solution, architecture, and lessons learned."
      />

      {categories.length ? (
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span className="rounded-[var(--radius-buttons)] border border-graphite-rail px-3 py-1.5 font-mono text-xs text-fog" key={category}>
              {category}
            </span>
          ))}
        </div>
      ) : null}

      {projects.length ? (
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug.current} project={project} />
          ))}
        </div>
      ) : (
        <div className="mt-10">
          <EmptyState
            title="No projects published yet."
            description="Create project documents in Sanity and this route will render them automatically."
            href="/admin"
            action="Open Studio"
          />
        </div>
      )}
    </PageShell>
  );
}
