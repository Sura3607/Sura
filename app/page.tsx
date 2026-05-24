import { ArrowUpRight, ExternalLink, Mail } from "lucide-react";
import { ProjectCard } from "@/components/project/project-card";
import { SectionHeader } from "@/components/sections/section-header";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects, getProfile, getSkills } from "@/lib/content";

export default async function Home() {
  const [profile, projects, skills] = await Promise.all([
    getProfile(),
    getFeaturedProjects(),
    getSkills(),
  ]);
  const emailHref = profile.email ? `mailto:${profile.email}` : "/contact";

  return (
    <main className="bg-cloud-canvas text-midnight-ink">
      <section className="mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl gap-12 px-6 py-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10">
        <div className="max-w-3xl">
          <p className="mb-6 text-sm font-medium text-sky-blue">{profile.title}</p>
          <h1 className="text-5xl font-black leading-[0.95] tracking-normal text-charcoal-void sm:text-7xl lg:text-8xl">
            Build useful systems. Ship clear evidence.
          </h1>
          <p className="mt-8 max-w-2xl text-base font-medium leading-7 text-midnight-ink/70 sm:text-lg">
            {profile.shortBio ??
              "A product-style portfolio for AI, backend systems, and practical engineering decisions."}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/projects" icon={<ArrowUpRight size={18} />}>
              {profile.heroCtaPrimary ?? "View projects"}
            </Button>
            <Button href={emailHref} variant="ghost" icon={<Mail size={18} />}>
              {profile.heroCtaSecondary ?? "Contact"}
            </Button>
            <Button
              href={profile.githubUrl ?? "/about"}
              variant="ghost"
              icon={<ExternalLink size={18} />}
            >
              GitHub
            </Button>
          </div>
        </div>

        <div className="rounded-[var(--radius-cards)] bg-vapor-gray p-5">
          <div className="grid gap-3">
            <div className="rounded-[var(--radius-images)] bg-cloud-canvas p-5">
              <p className="text-xs font-medium uppercase text-sky-blue">Workflow</p>
              <div className="mt-4 grid gap-3">
                {["Define the problem", "Design the system", "Prove with a project"].map(
                  (item, index) => (
                    <div
                      className="flex items-center justify-between border-b border-midnight-ink/10 pb-3 last:border-b-0 last:pb-0"
                      key={item}
                    >
                      <span className="font-medium">{item}</span>
                      <span className="text-sm text-midnight-ink/45">0{index + 1}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
            {projects.slice(0, 1).map((project) => (
              <ProjectCard href={`/projects/${project.slug.current}`} key={project.slug.current} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-8 lg:px-10">
        <SectionHeader
          eyebrow="Approach"
          title="From problem to architecture to proof."
          description="The site is arranged around evidence: what problem existed, how the system was shaped, and what technical choices made the work usable."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            "Problem framing before implementation details.",
            "Backend and AI boundaries made explicit.",
            "Project cards that lead to deeper case studies.",
          ].map((item) => (
            <div className="rounded-[var(--radius-cards)] bg-vapor-gray p-6" key={item}>
              <p className="text-lg font-medium leading-7">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-8 lg:px-10">
        <div className="grid gap-8 rounded-[var(--radius-cards)] border border-midnight-ink/10 p-6 lg:grid-cols-[0.85fr_1.15fr] lg:p-8">
          <SectionHeader
            eyebrow="Skills"
            title="Practical tools, grouped by use."
            description="No proficiency bars. The emphasis is project use, workflow fit, and how each tool supports real implementation."
          />
          <div className="grid content-start gap-2 sm:grid-cols-2">
            {skills.slice(0, 8).map((skill) => (
              <div className="rounded-[var(--radius-buttons)] bg-vapor-gray px-4 py-3" key={skill.name}>
                <p className="font-medium">{skill.name}</p>
                <p className="mt-1 text-xs font-medium text-midnight-ink/55">
                  {skill.category} / {skill.level}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
