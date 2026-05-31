import { Code, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/sections/section-header";
import { Button } from "@/components/ui/button";
import { ContentBlocks } from "@/components/ui/content-blocks";
import { PageShell } from "@/components/ui/page-shell";
import { formatProjectDateRange, getProjectBySlug } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  return createMetadata({
    title: project?.seoTitle ?? project?.title ?? slug,
    description: project?.seoDescription ?? project?.summary ?? "Project detail page.",
    path: `/projects/${slug}`,
  });
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const dateRange = formatProjectDateRange(project.startDate, project.endDate);

  return (
    <PageShell narrow>
      <SectionHeader
        eyebrow={project.category ?? "Project detail"}
        title={project.title}
        description={project.summary}
      />

      <div className="mt-8 flex flex-wrap gap-2">
        {(project.techStack ?? []).map((tech) => (
          <span className="rounded-[var(--radius-buttons)] bg-vapor-gray px-3 py-1.5 text-sm font-medium" key={tech}>
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        {project.githubUrl ? (
          <Button href={project.githubUrl} icon={<Code size={18} />} variant="ghost">
            GitHub
          </Button>
        ) : null}
        {project.demoUrl ? (
          <Button href={project.demoUrl} icon={<ExternalLink size={18} />}>
            Live demo
          </Button>
        ) : null}
      </div>

      <section className="mt-12 grid gap-4 sm:grid-cols-3">
        {[
          ["Status", project.status ?? "Completed"],
          ["Role", project.role ?? "Contributor"],
          ["Timeline", dateRange ?? "Not specified"],
        ].map(([label, value]) => (
          <div className="rounded-[var(--radius-cards)] bg-vapor-gray p-5" key={label}>
            <p className="text-xs font-medium uppercase text-sky-blue">{label}</p>
            <p className="mt-3 text-lg font-medium leading-6">{value}</p>
          </div>
        ))}
      </section>

      <section className="mt-12 space-y-10 text-sm font-medium leading-7 text-midnight-ink/70">
        <ArticleSection title="Problem" value={project.problem} fallback="Add the user or technical problem in Sanity." />
        <ArticleSection title="Solution" value={project.solution} fallback="Add the implemented solution and decisions in Sanity." />
        <ArticleSection title="Architecture" value={project.architecture} fallback="Add system shape, integrations, and tradeoffs in Sanity." />
        <ArticleSection title="Lessons learned" value={project.lessonsLearned} />
        <ArticleSection title="Future improvements" value={project.futureImprovements} />
      </section>
    </PageShell>
  );
}

function ArticleSection({
  title,
  value,
  fallback,
}: {
  title: string;
  value?: unknown[];
  fallback?: string;
}) {
  if ((!value || value.length === 0) && !fallback) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl font-black leading-tight text-charcoal-void">{title}</h2>
      <div className="mt-4">
        <ContentBlocks value={value} fallback={fallback} />
      </div>
    </section>
  );
}
