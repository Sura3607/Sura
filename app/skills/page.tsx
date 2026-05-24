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
          <section className="rounded-[var(--radius-cards)] bg-vapor-gray p-6" key={category}>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-black leading-tight text-charcoal-void">
                {category}
              </h2>
              <span className="text-sm font-medium text-midnight-ink/45">
                {items.length}
              </span>
            </div>
            <div className="mt-6 grid gap-2">
              {items.map((skill) => (
                <div className="rounded-[var(--radius-buttons)] bg-cloud-canvas px-4 py-3" key={skill.name}>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-medium">{skill.name}</p>
                    <p className="text-xs font-medium text-sky-blue">{skill.level}</p>
                  </div>
                  {skill.usedInProjects?.length ? (
                    <p className="mt-2 text-xs font-medium text-midnight-ink/55">
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
