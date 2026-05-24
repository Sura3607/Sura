import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  href?: string;
};

export function ProjectCard({ project, href }: ProjectCardProps) {
  const tags = project.techStack?.slice(0, 4) ?? [];
  const target = href ?? `/projects/${project.slug.current}`;

  return (
    <Link
      className="group block overflow-hidden rounded-[var(--radius-cards)] bg-vapor-gray transition-colors hover:bg-midnight-ink hover:text-cloud-canvas"
      href={target}
    >
      <div className="aspect-[16/10] bg-cloud-canvas p-4">
        <div className="flex h-full flex-col justify-between rounded-[var(--radius-images)] border border-midnight-ink/10 p-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-medium uppercase text-sky-blue group-hover:text-cloud-canvas/70">
              {project.category ?? "Project"}
            </span>
            <span className="rounded-[var(--radius-buttons)] border border-midnight-ink/15 px-2 py-1 text-xs font-medium group-hover:border-cloud-canvas/25">
              {project.status ?? "Completed"}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="h-10 rounded-[var(--radius-inputs)] bg-vapor-gray group-hover:bg-cloud-canvas/15" />
            <span className="h-10 rounded-[var(--radius-inputs)] bg-vapor-gray group-hover:bg-cloud-canvas/15" />
            <span className="h-10 rounded-[var(--radius-inputs)] bg-vapor-gray group-hover:bg-cloud-canvas/15" />
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-medium leading-7">{project.title}</h3>
          <ArrowUpRight
            className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            size={20}
          />
        </div>
        <p className="mt-4 text-sm font-medium leading-6 text-midnight-ink/65 group-hover:text-cloud-canvas/70">
          {project.summary ?? "Open the case study for problem, solution, architecture, and lessons learned."}
        </p>
        {tags.length ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                className="rounded-[var(--radius-buttons)] border border-midnight-ink/15 px-2 py-1 text-xs font-medium group-hover:border-cloud-canvas/25"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
