import { ArrowUpRight, ExternalLink, Mail } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ProjectCard } from "@/components/project/project-card";
import { SectionHeader } from "@/components/sections/section-header";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-cloud-canvas text-midnight-ink">
      <Navbar />
      <main>
        <section className="mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10">
          <div className="max-w-3xl">
            <p className="mb-6 text-sm font-medium text-sky-blue">Next.js · Sanity · Vercel</p>
            <h1 className="text-5xl font-black leading-[0.95] tracking-normal text-charcoal-void sm:text-7xl lg:text-8xl">
              Build useful systems. Ship clear stories.
            </h1>
            <p className="mt-8 max-w-2xl text-base font-medium leading-7 text-midnight-ink/70 sm:text-lg">
              Portfolio skeleton đã sẵn sàng để biến profile, projects, skills,
              blog và resume thành một product-style developer site.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/projects" icon={<ArrowUpRight size={18} />}>
                View projects
              </Button>
              <Button href="/contact" variant="ghost" icon={<Mail size={18} />}>
                Contact
              </Button>
              <Button href="https://github.com" variant="ghost" icon={<ExternalLink size={18} />}>
                GitHub
              </Button>
            </div>
          </div>

          <div className="rounded-[var(--radius-cards)] bg-vapor-gray p-5">
            <div className="grid gap-3">
              <div className="rounded-[var(--radius-images)] bg-cloud-canvas p-5">
                <p className="text-xs font-medium uppercase text-sky-blue">Workflow</p>
                <div className="mt-4 grid gap-3">
                  {["Design the system", "Engineer the core", "Deploy and iterate"].map(
                    (item, index) => (
                      <div
                        className="flex items-center justify-between border-b border-midnight-ink/10 pb-3 last:border-b-0 last:pb-0"
                        key={item}
                      >
                        <span className="font-medium">{item}</span>
                        <span className="text-sm text-midnight-ink/45">
                          0{index + 1}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
              <ProjectCard
                title="Featured project"
                summary="Connect Sanity content to a fast, typed Next.js frontend."
                tags={["Next.js", "Sanity", "ISR"]}
                href="/projects"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-8 lg:px-10">
          <SectionHeader
            eyebrow="Ready sections"
            title="Code from structure, not from blank pages."
            description="Routes, content schemas, API handlers and design tokens are prepared so the next step is implementation detail."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              "CMS-backed profile and project content",
              "SEO-ready route structure and metadata helpers",
              "Air-inspired UI direction from DESIGN.md",
            ].map((item) => (
              <div className="rounded-[var(--radius-cards)] bg-vapor-gray p-6" key={item}>
                <p className="text-lg font-medium leading-7">{item}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
