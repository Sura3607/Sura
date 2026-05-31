import Link from "next/link";
import { ArrowUpRight, CheckCircle2, GitBranch } from "lucide-react";
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
      className="group block overflow-hidden rounded-[var(--radius-cards)] border border-graphite-rail bg-vapor-gray transition-colors duration-200 hover:border-smoke"
      href={target}
    >
      {!compact ? (
        <div className="border-b border-graphite-rail bg-cloud-canvas p-4">
          <div className="rounded-[var(--radius-images)] border border-graphite-rail p-4">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-xs uppercase text-sky-blue">
                {project.category ?? "Project"}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-graphite-rail px-2 py-1 font-mono text-xs text-fog">
                <CheckCircle2 size={13} />
                {project.status ?? "Completed"}
              </span>
            </div>
            <div className="mt-6 grid gap-2 font-mono text-xs">
              <div className="flex items-center justify-between rounded-[var(--radius-inputs)] border border-graphite-rail px-3 py-2 text-fog">
                <span>timeline</span>
                <span className="text-charcoal-void">{dateRange ?? "Not specified"}</span>
              </div>
              <div className="flex items-center justify-between rounded-[var(--radius-inputs)] border border-graphite-rail px-3 py-2 text-fog">
                <span>role</span>
                <span className="text-charcoal-void">{project.role ?? "Contributor"}</span>
              </div>
              <div className="flex items-center justify-between rounded-[var(--radius-inputs)] border border-graphite-rail px-3 py-2 text-fog">
                <span>stack</span>
                <GitBranch className="text-sky-blue" size={14} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-b border-graphite-rail bg-cloud-canvas p-4">
          <div className="flex items-center justify-between gap-4 rounded-[var(--radius-images)] border border-graphite-rail p-4 transition-colors group-hover:border-smoke">
            <span className="font-mono text-xs uppercase text-sky-blue">
              {project.category ?? "Project"}
            </span>
            <span className="rounded-full border border-graphite-rail px-2 py-1 font-mono text-xs text-fog">
              {project.status ?? "Completed"}
            </span>
          </div>
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-medium leading-7 text-charcoal-void">{project.title}</h3>
          <ArrowUpRight
            className="shrink-0 text-fog transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-charcoal-void"
            size={20}
          />
        </div>
        {dateRange ? (
          <p className="mt-2 font-mono text-xs uppercase text-sky-blue">
            {dateRange}
          </p>
        ) : null}
        <p className="mt-4 text-sm font-normal leading-6 text-fog">
          {project.summary ?? "Open the case study for problem, solution, architecture, and lessons learned."}
        </p>
        {tags.length ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                className="rounded-[var(--radius-buttons)] border border-graphite-rail px-2 py-1 font-mono text-xs text-fog"
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
