import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type ProjectCardProps = {
  title: string;
  summary: string;
  tags: string[];
  href: string;
};

export function ProjectCard({ title, summary, tags, href }: ProjectCardProps) {
  return (
    <Link
      className="group block rounded-[var(--radius-cards)] bg-vapor-gray p-5 transition-colors hover:bg-midnight-ink hover:text-cloud-canvas"
      href={href}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-medium leading-7">{title}</h3>
        <ArrowUpRight className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={20} />
      </div>
      <p className="mt-4 text-sm font-medium leading-6 text-midnight-ink/65 group-hover:text-cloud-canvas/70">
        {summary}
      </p>
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
    </Link>
  );
}
