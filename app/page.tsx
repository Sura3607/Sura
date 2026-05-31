import {
  ArrowUpRight,
  Award,
  ExternalLink,
  Mail,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import { ContactForm } from "@/components/contact/contact-form";
import { ProjectCard } from "@/components/project/project-card";
import { SectionHeader } from "@/components/sections/section-header";
import { Button } from "@/components/ui/button";
import { ContentBlocks } from "@/components/ui/content-blocks";
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

  return (
    <main className="bg-cloud-canvas text-midnight-ink">
      <section className="relative overflow-hidden border-b border-midnight-ink/10" id="top">
        <div className="absolute inset-x-0 top-0 h-32 bg-vapor-gray/70" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-14 sm:px-8 sm:pt-18 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-10 lg:pb-20 lg:pt-24">
          <div className="motion-reveal max-w-3xl">
            <div className="mb-7 flex flex-wrap items-center gap-2">
              <span className="rounded-[var(--radius-buttons)] bg-cloud-canvas px-3 py-1.5 text-sm font-medium text-sky-blue">
                {profile.title}
              </span>
              {profile.location ? (
                <span className="inline-flex items-center gap-2 rounded-[var(--radius-buttons)] border border-midnight-ink/10 px-3 py-1.5 text-sm font-medium text-midnight-ink/55">
                  <MapPin size={15} />
                  {profile.location}
                </span>
              ) : null}
            </div>
            <h1 className="max-w-[760px] text-5xl font-black leading-[0.92] tracking-normal text-charcoal-void sm:text-7xl lg:text-[84px]">
              {profile.name}
            </h1>
            <p className="mt-7 max-w-2xl text-base font-medium leading-7 text-midnight-ink/70 sm:text-lg">
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

          <div className="motion-reveal motion-reveal-delay-1">
            <div className="relative overflow-hidden rounded-[var(--radius-cards)] bg-vapor-gray">
              <Image
                alt="Minimal 3D geometric shapes used as a portfolio visual system"
                className="h-[380px] w-full object-cover object-center lg:h-[520px]"
                height={900}
                priority
                src="/images/portfolio-workflow-visual.webp"
                width={1800}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cloud-canvas via-cloud-canvas/10 to-transparent" />
              <div className="absolute left-4 right-4 top-4 flex items-center justify-between rounded-[var(--radius-images)] border border-cloud-canvas/70 bg-cloud-canvas/88 px-4 py-3 text-sm font-medium">
                <span>Portfolio journey</span>
                <span className="rounded-[var(--radius-buttons)] bg-soft-rose px-2 py-1 text-xs text-midnight-ink/70">
                  One-page view
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 grid gap-3 sm:grid-cols-3">
                {[
                  ["01", "Context"],
                  ["02", "Projects"],
                  ["03", "Contact"],
                ].map(([value, label]) => (
                  <div
                    className="rounded-[var(--radius-images)] bg-cloud-canvas/90 p-4 text-sm font-medium shadow-[0_10px_24px_rgba(27,27,27,0.08)]"
                    key={label}
                  >
                    <p className="text-xs uppercase text-sky-blue">{value}</p>
                    <p className="mt-2 text-charcoal-void">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="scroll-section border-b border-midnight-ink/10" id="about">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-10 lg:py-20">
          <SectionHeader
            eyebrow="About"
            title="Direction, education, and current focus in one scan."
            description={profile.shortBio}
          />
          <div className="grid gap-4">
            <article className="rounded-[var(--radius-cards)] bg-vapor-gray p-6">
              <p className="text-sm font-medium uppercase text-sky-blue">Profile</p>
              <h2 className="mt-4 text-2xl font-black leading-tight text-charcoal-void">
                {profile.name}
              </h2>
              <p className="mt-2 font-medium text-midnight-ink/70">{profile.title}</p>
              <div className="mt-5 text-sm font-medium leading-6 text-midnight-ink/70">
                <ContentBlocks
                  value={profile.longBio}
                  fallback="Profile content will appear here after Sanity is populated."
                />
              </div>
            </article>

            {primaryExperience ? (
              <article className="rounded-[var(--radius-cards)] border border-midnight-ink/10 p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-sky-blue">
                      {primaryExperience.type}
                    </p>
                    <h3 className="mt-2 text-xl font-medium leading-7 text-charcoal-void">
                      {primaryExperience.role}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-midnight-ink/60">
                      {primaryExperience.organization}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-midnight-ink/55">
                    {formatDate(primaryExperience.startDate)} -{" "}
                    {primaryExperience.isCurrent
                      ? "Present"
                      : formatDate(primaryExperience.endDate)}
                  </p>
                </div>
                <div className="mt-5 text-sm font-medium leading-6 text-midnight-ink/70">
                  <ContentBlocks value={primaryExperience.description} />
                </div>
              </article>
            ) : null}
          </div>
        </div>
      </section>

      <section className="scroll-section border-b border-midnight-ink/10 bg-vapor-gray/55" id="projects">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              eyebrow="Projects"
              title="Featured proof, with deeper case studies one click away."
              description="The Home page keeps this compact. Open the project index or a case study when you need the fuller build story."
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

      <section className="scroll-section border-b border-midnight-ink/10" id="skills">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:px-10 lg:py-20">
          <SectionHeader
            eyebrow="Skills"
            title="Grouped by practical use, not percentages."
            description="A compact view of the tools that support the projects: languages, backend, AI, cloud, data, and delivery."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {skillGroups.map(([category, items]) => (
              <section
                className="rounded-[var(--radius-cards)] bg-vapor-gray p-5"
                key={category}
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-black leading-tight text-charcoal-void">
                    {category}
                  </h2>
                  <span className="text-sm font-medium text-midnight-ink/45">
                    {items.length}
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      className="rounded-[var(--radius-buttons)] bg-cloud-canvas px-3 py-1.5 text-sm font-medium"
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

      <section className="scroll-section border-b border-midnight-ink/10 bg-vapor-gray/55" id="certificates">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:px-10 lg:py-20">
          <div>
            <SectionHeader
              eyebrow="Certificates"
              title="Learning signals worth keeping visible."
              description="Certificates and awards stay on the main journey because they are fast proof points for reviewers."
            />
            <div className="mt-8 overflow-hidden rounded-[var(--radius-cards)] border border-midnight-ink/10 bg-cloud-canvas">
              <Image
                alt="Abstract credential and skills milestone visual"
                className="aspect-[16/10] w-full object-cover"
                height={900}
                src="/images/capability-map-visual.webp"
                width={1350}
              />
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {certificates.map((certificate) => (
              <article
                className="rounded-[var(--radius-cards)] border border-midnight-ink/10 bg-cloud-canvas p-5"
                key={`${certificate.issuer}-${certificate.title}`}
              >
                <Award className="text-sky-blue" size={20} />
                <h3 className="mt-4 text-lg font-medium leading-6 text-charcoal-void">
                  {certificate.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-midnight-ink/60">
                  {certificate.issuer}
                  {certificate.issuedDate ? ` / ${formatDate(certificate.issuedDate)}` : ""}
                </p>
                {certificate.credentialUrl ? (
                  <a
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-sky-blue hover:text-midnight-ink"
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
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:px-10 lg:py-20">
          <div>
            <SectionHeader
              eyebrow="Contact"
              title="A direct path for hiring and collaboration."
              description="Use email for quick follow-up, or send a structured message through the form."
            />
            <div className="mt-8 grid gap-3">
              <a
                className="inline-flex items-center gap-3 rounded-[var(--radius-cards)] bg-vapor-gray px-4 py-3 text-sm font-medium hover:text-sky-blue"
                href={emailHref}
              >
                <Mail size={18} />
                {profile.email ?? "Email"}
              </a>
              {socialLinks.map((link) => (
                <a
                  className="inline-flex items-center gap-3 rounded-[var(--radius-cards)] border border-midnight-ink/10 px-4 py-3 text-sm font-medium hover:text-sky-blue"
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
          <div className="rounded-[var(--radius-cards)] border border-midnight-ink/10 p-6">
            <ContactForm fallbackEmail={profile.email} />
          </div>
        </div>
      </section>
    </main>
  );
}
