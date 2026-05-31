import { SectionHeader } from "@/components/sections/section-header";
import { PageShell } from "@/components/ui/page-shell";
import { getSkills, groupSkills } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Skills",
  description: "Technical skills grouped by category and project evidence.",
  path: "/skills",
});

export default async function SkillsPage() {
  const skills = await getSkills();
  const groups = groupSkills(skills);

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Skills"
        title="Grouped by practical use, not arbitrary percentages."
        description="Each skill is framed by where it belongs in real work: languages, frameworks, AI/ML, cloud, tooling, and data."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {Object.entries(groups).map(([category, items]) => (
          <section className="rounded-[var(--radius-cards)] border border-graphite-rail bg-vapor-gray p-6" key={category}>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-medium leading-tight text-charcoal-void">
                {category}
              </h2>
              <span className="font-mono text-xs text-fog">
                {items.length}
              </span>
            </div>
            <div className="mt-6 grid gap-2">
              {items.map((skill) => (
                <div className="rounded-[var(--radius-buttons)] border border-graphite-rail bg-cloud-canvas px-4 py-3" key={skill.name}>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-medium">{skill.name}</p>
                    <p className="font-mono text-xs text-sky-blue">{skill.level}</p>
                  </div>
                  {skill.usedInProjects?.length ? (
                    <p className="mt-2 text-xs font-medium text-fog">
                      Used in {skill.usedInProjects.map((project) => project.title).join(", ")}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
