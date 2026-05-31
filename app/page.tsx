import {
  ArrowUpRight,
  Award,
  Braces,
  CheckCircle2,
  ExternalLink,
  Mail,
  MapPin,
  Terminal,
} from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { ProjectCard } from "@/components/project/project-card";
import { SectionHeader } from "@/components/sections/section-header";
import { Button } from "@/components/ui/button";
import { ContentBlocks } from "@/components/ui/content-blocks";
import { HeroThreeObject } from "@/components/visual/hero-three-object";
import {
  formatDate,
  getCertificates,
  getExperiences,
  getFeaturedProjects,
  getProfile,
  getSkills,
  groupSkills,
} from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Sura Portfolio",
  description:
    "Portfolio for AI workflows, backend systems, and product-minded software engineering.",
  path: "/",
});

export default async function Home() {
  const [profile, featuredProjects, skills, certificates, experiences] = await Promise.all([
    getProfile(),
    getFeaturedProjects(),
    getSkills(),
    getCertificates(),
    getExperiences(),
  ]);

  const emailHref = profile.email ? `mailto:${profile.email}` : "/contact";
  const visibleProjects = featuredProjects.slice(0, 2);
  const skillGroups = Object.entries(groupSkills(skills));
  const primaryExperience = experiences[0];
  const socialLinks = [
    profile.githubUrl ? { label: "GitHub", href: profile.githubUrl } : null,
    profile.linkedinUrl ? { label: "LinkedIn", href: profile.linkedinUrl } : null,
    profile.facebookUrl ? { label: "Facebook", href: profile.facebookUrl } : null,
  ].filter(Boolean) as Array<{ label: string; href: string }>;
  const highlightedSkills = skills.slice(0, 6);
  const currentFocus = [
    "AI workflows",
    "Backend systems",
    "Cybersecurity-aware engineering",
  ];

  return (
    <main className="bg-cloud-canvas text-midnight-ink">
      <section className="resend-grid light-ray relative overflow-hidden border-b border-graphite-rail" id="top">
        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-10 lg:py-24">
          <div className="motion-reveal max-w-3xl">
            <div className="mb-7 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-graphite-rail px-3 py-1.5 font-mono text-xs text-charcoal-void">
                Available for engineering roles
              </span>
              {profile.location ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-graphite-rail px-3 py-1.5 text-xs font-medium text-fog">
                  <MapPin size={14} />
                  {profile.location}
                </span>
              ) : null}
            </div>
            <p className="font-mono text-sm text-sky-blue">{profile.title}</p>
            <h1 className="mt-5 max-w-[760px] text-5xl font-medium leading-none tracking-normal text-charcoal-void sm:text-7xl lg:text-[88px]">
              {profile.name}
            </h1>
            <p className="mt-7 max-w-2xl text-base font-normal leading-7 text-fog sm:text-lg">
              {profile.shortBio ??
                "A product-style portfolio for AI, backend systems, and practical engineering decisions."}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="#projects" icon={<ArrowUpRight size={18} />}>
                View projects
              </Button>
              <Button href="#contact" variant="ghost" icon={<Mail size={18} />}>
                Contact
              </Button>
            </div>
          </div>

          <HeroEvidencePanel
            email={profile.email}
            focus={currentFocus}
            projects={visibleProjects.map((project) => ({
              category: project.category ?? "Project",
              title: project.title,
              timeline: project.startDate ? formatDate(project.startDate) : "Planned",
            }))}
            skills={highlightedSkills.map((skill) => skill.name)}
          />
        </div>
      </section>

      <section className="scroll-section surface-noise relative border-b border-graphite-rail" id="about">
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 py-20 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-10 lg:py-28">
          <SectionHeader
            eyebrow="About"
            title="Direction, education, and current focus in one scan."
            description={profile.shortBio}
          />
          <div className="grid gap-4">
            <article className="rounded-[var(--radius-cards)] border border-graphite-rail bg-vapor-gray p-6">
              <p className="font-mono text-xs font-medium uppercase text-sky-blue">Profile</p>
              <h2 className="mt-4 text-2xl font-medium leading-tight text-charcoal-void">
                {profile.name}
              </h2>
              <p className="mt-2 text-sm font-medium text-fog">{profile.title}</p>
              <div className="mt-5 text-sm font-normal leading-6 text-fog">
                <ContentBlocks
                  value={profile.longBio}
                  fallback="Profile content will appear here after Sanity is populated."
                />
              </div>
            </article>

            {primaryExperience ? (
              <article className="rounded-[var(--radius-cards)] border border-graphite-rail bg-cloud-canvas p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-mono text-xs font-medium uppercase text-sky-blue">
                      {primaryExperience.type}
                    </p>
                    <h3 className="mt-2 text-xl font-medium leading-7 text-charcoal-void">
                      {primaryExperience.role}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-fog">
                      {primaryExperience.organization}
                    </p>
                  </div>
                  <p className="font-mono text-xs text-fog">
                    {formatDate(primaryExperience.startDate)} -{" "}
                    {primaryExperience.isCurrent
                      ? "Present"
                      : formatDate(primaryExperience.endDate)}
                  </p>
                </div>
                <div className="mt-5 text-sm font-normal leading-6 text-fog">
                  <ContentBlocks value={primaryExperience.description} />
                </div>
              </article>
            ) : null}
          </div>
        </div>
      </section>

      <section className="scroll-section resend-grid relative border-b border-graphite-rail" id="projects">
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              eyebrow="Projects"
              title="Featured proof, with deeper case studies one click away."
              description="The Home page stays compact. Open the project index or a case study for the fuller build story."
            />
            <Button href="/projects" icon={<ArrowUpRight size={18} />} variant="ghost">
              View all projects
            </Button>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.slug.current} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-section surface-noise relative border-b border-graphite-rail" id="skills">
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 py-20 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:px-10 lg:py-28">
          <SectionHeader
            eyebrow="Skills"
            title="Grouped by practical use, not percentages."
            description="A compact view of the tools that support the projects: languages, backend, AI, cloud, data, and delivery."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {skillGroups.map(([category, items]) => (
              <section
                className="rounded-[var(--radius-cards)] border border-graphite-rail bg-vapor-gray p-5"
                key={category}
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-medium leading-tight text-charcoal-void">
                    {category}
                  </h2>
                  <span className="font-mono text-xs text-fog">{items.length}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      className="rounded-[var(--radius-buttons)] border border-graphite-rail bg-cloud-canvas px-3 py-1.5 text-sm font-medium text-fog"
                      key={skill.name}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-section border-b border-graphite-rail" id="certificates">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:px-10 lg:py-28">
          <div>
            <SectionHeader
              eyebrow="Certificates"
              title="Learning signals worth keeping visible."
              description="Certificates and awards stay on the main journey because they are fast proof points for reviewers."
            />
            <CertificateSignalPanel count={certificates.length} issuer={certificates[0]?.issuer} />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {certificates.map((certificate) => (
              <article
                className="rounded-[var(--radius-cards)] border border-graphite-rail bg-vapor-gray p-5"
                key={`${certificate.issuer}-${certificate.title}`}
              >
                <Award className="text-sky-blue" size={20} />
                <h3 className="mt-4 text-lg font-medium leading-6 text-charcoal-void">
                  {certificate.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-fog">
                  {certificate.issuer}
                  {certificate.issuedDate ? ` / ${formatDate(certificate.issuedDate)}` : ""}
                </p>
                {certificate.credentialUrl ? (
                  <a
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-sky-blue hover:text-charcoal-void"
                    href={certificate.credentialUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Credential
                    <ExternalLink size={15} />
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-section" id="contact">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:px-10 lg:py-28">
          <div>
            <SectionHeader
              eyebrow="Contact"
              title="A direct path for hiring and collaboration."
              description="Use email for quick follow-up, or send a structured message through the form."
            />
            <div className="mt-8 grid gap-3">
              <a
                className="inline-flex items-center gap-3 rounded-[var(--radius-cards)] border border-graphite-rail bg-vapor-gray px-4 py-3 text-sm font-medium text-fog hover:text-charcoal-void"
                href={emailHref}
              >
                <Mail size={18} />
                {profile.email ?? "Email"}
              </a>
              {socialLinks.map((link) => (
                <a
                  className="inline-flex items-center gap-3 rounded-[var(--radius-cards)] border border-graphite-rail px-4 py-3 text-sm font-medium text-fog hover:text-charcoal-void"
                  href={link.href}
                  key={link.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  <ExternalLink size={18} />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="rounded-[var(--radius-cards)] border border-graphite-rail bg-vapor-gray p-6">
            <ContactForm fallbackEmail={profile.email} />
          </div>
        </div>
      </section>
    </main>
  );
}

function HeroEvidencePanel({
  email,
  focus,
  projects,
  skills,
}: {
  email?: string;
  focus: string[];
  projects: Array<{ category: string; title: string; timeline: string }>;
  skills: string[];
}) {
  const rows = projects.length
    ? projects
    : [{ category: "Project", title: "Case studies publish from Sanity", timeline: "Draft" }];

  return (
    <div className="motion-reveal motion-reveal-delay-1 spotlight relative min-h-[560px] overflow-hidden rounded-[var(--radius-cards)] border border-graphite-rail bg-vapor-gray/60 lg:min-h-[620px]">
      <HeroThreeObject className="absolute inset-0 z-0" />
      <div className="surface-noise absolute inset-0" />
      <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-charcoal-void/30 to-transparent" />
      <div className="relative z-10 flex min-h-[560px] flex-col justify-end gap-3 p-3 lg:min-h-[620px] lg:p-5">
        <div className="ml-auto w-full max-w-sm rounded-[var(--radius-images)] border border-graphite-rail bg-cloud-canvas/82 p-4 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-sm font-medium text-charcoal-void">
            <CheckCircle2 className="text-delivered-green" size={17} />
            Current focus
          </div>
          <div className="mt-4 grid gap-2">
            {focus.map((item) => (
              <div
                className="rounded-[var(--radius-inputs)] border border-graphite-rail px-3 py-2 font-mono text-xs text-fog"
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[calc(var(--radius-cards)-4px)] border border-graphite-rail bg-cloud-canvas/90 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-graphite-rail px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-bounced-red" />
              <span className="h-2.5 w-2.5 rounded-full bg-complained-yellow" />
              <span className="h-2.5 w-2.5 rounded-full bg-delivered-green" />
            </div>
            <p className="font-mono text-xs text-fog">portfolio.log</p>
          </div>
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="border-b border-graphite-rail p-5 lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-2 text-sm font-medium text-charcoal-void">
                <Terminal size={18} />
                Evidence stream
              </div>
              <div className="mt-5 space-y-4 font-mono text-sm">
                {rows.map((row, index) => (
                  <div className="grid grid-cols-[auto_1fr] gap-3" key={`${row.title}-${index}`}>
                    <span className="pt-1 text-xs text-ash">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="text-charcoal-void">
                        <span className="text-resend-violet">{row.category}</span> / {row.title}
                      </p>
                      <p className="mt-1 text-xs text-fog">{row.timeline}</p>
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-[auto_1fr] gap-3">
                  <span className="pt-1 text-xs text-ash">03</span>
                  <p className="text-fog">
                    contact.to(<span className="text-resend-violet">{email ?? "email"}</span>)
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-charcoal-void">
                <Braces size={17} />
                Stack sample
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    className="rounded-[var(--radius-buttons)] border border-graphite-rail px-2.5 py-1 font-mono text-xs text-fog"
                    key={skill}
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-4 rounded-[var(--radius-images)] border border-graphite-rail p-4">
                <div className="flex items-center gap-2 text-sm text-fog">
                  <CheckCircle2 className="text-delivered-green" size={17} />
                  Procedural 3D, no generated imagery
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CertificateSignalPanel({ count, issuer }: { count: number; issuer?: string }) {
  return (
    <div className="mt-8 rounded-[var(--radius-cards)] border border-graphite-rail bg-vapor-gray p-5">
      <div className="flex items-center justify-between gap-4 border-b border-graphite-rail pb-4">
        <p className="font-mono text-xs text-fog">credentials.json</p>
        <span className="rounded-full border border-graphite-rail px-2.5 py-1 font-mono text-xs text-delivered-green">
          verified
        </span>
      </div>
      <div className="mt-5 font-mono text-sm leading-7">
        <p className="text-fog">
          <span className="text-resend-violet">certificates</span>: {count}
        </p>
        <p className="text-fog">
          <span className="text-resend-violet">latestIssuer</span>: {issuer ?? "Sanity"}
        </p>
        <p className="text-fog">
          <span className="text-resend-violet">surface</span>: compact review signal
        </p>
      </div>
    </div>
  );
}
