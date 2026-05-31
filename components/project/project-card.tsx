import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { formatProjectDateRange } from "@/lib/content";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  href?: string;
  compact?: boolean;
};

export function ProjectCard({ project, href, compact = false }: ProjectCardProps) {
  const tags = project.techStack?.slice(0, 4) ?? [];
  const target = href ?? `/projects/${project.slug.current}`;
  const dateRange = formatProjectDateRange(project.startDate, project.endDate);

  return (
    <Link
      className="group block overflow-hidden rounded-[var(--radius-cards)] bg-vapor-gray transition-colors duration-200 hover:bg-midnight-ink hover:text-cloud-canvas"
      href={target}
    >
      {!compact ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-cloud-canvas">
          <Image
            alt=""
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.025]"
            height={900}
            src="/images/project-evidence-visual.webp"
            width={1800}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-cloud-canvas/75 via-cloud-canvas/20 to-soft-lilac/35" />
          <div className="absolute inset-4 flex flex-col justify-between rounded-[var(--radius-images)] border border-midnight-ink/10 bg-cloud-canvas/82 p-4 transition-transform duration-200 group-hover:-translate-y-0.5">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-medium uppercase text-sky-blue group-hover:text-cloud-canvas/70">
                {project.category ?? "Project"}
              </span>
              <span className="rounded-[var(--radius-buttons)] border border-midnight-ink/15 bg-cloud-canvas/80 px-2 py-1 text-xs font-medium group-hover:border-cloud-canvas/25">
                {project.status ?? "Completed"}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="h-10 rounded-[var(--radius-inputs)] bg-cloud-canvas/75 group-hover:bg-cloud-canvas/15" />
              <span className="h-10 rounded-[var(--radius-inputs)] bg-cloud-canvas/75 group-hover:bg-cloud-canvas/15" />
              <span className="h-10 rounded-[var(--radius-inputs)] bg-cloud-canvas/75 group-hover:bg-cloud-canvas/15" />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-cloud-canvas p-4">
          <div className="flex items-center justify-between gap-4 rounded-[var(--radius-images)] border border-midnight-ink/10 p-4 transition-colors group-hover:border-cloud-canvas/20">
            <span className="text-xs font-medium uppercase text-sky-blue group-hover:text-cloud-canvas/70">
              {project.category ?? "Project"}
            </span>
            <span className="rounded-[var(--radius-buttons)] border border-midnight-ink/15 px-2 py-1 text-xs font-medium group-hover:border-cloud-canvas/25">
              {project.status ?? "Completed"}
            </span>
          </div>
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-medium leading-7">{project.title}</h3>
          <ArrowUpRight
            className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            size={20}
          />
        </div>
        {dateRange ? (
          <p className="mt-2 text-xs font-medium uppercase text-sky-blue group-hover:text-cloud-canvas/70">
            {dateRange}
          </p>
        ) : null}
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
