import { Download } from "lucide-react";
import { SectionHeader } from "@/components/sections/section-header";
import { Button } from "@/components/ui/button";
import { ContentBlocks } from "@/components/ui/content-blocks";
import { PageShell } from "@/components/ui/page-shell";
import { formatDate, getCertificates, getExperiences, getProfile, getSkills } from "@/lib/content";

export const metadata = {
  title: "Resume",
  description: "Online resume and downloadable PDF.",
};

export default async function ResumePage() {
  const [profile, experiences, certificates, skills] = await Promise.all([
    getProfile(),
    getExperiences(),
    getCertificates(),
    getSkills(),
  ]);
  const resumeHref = profile.resumeUrl ?? "/resume.pdf";

  return (
    <PageShell narrow>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <SectionHeader
          eyebrow="Resume"
          title={profile.name}
          description={profile.shortBio}
        />
        <Button href={resumeHref} icon={<Download size={18} />}>
          Download CV
        </Button>
      </div>

      <section className="mt-10 rounded-[var(--radius-cards)] bg-vapor-gray p-6 text-sm font-medium leading-6 text-midnight-ink/70">
        <ContentBlocks value={profile.longBio} />
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-black leading-tight text-charcoal-void">Experience</h2>
        <div className="mt-5 grid gap-4">
          {experiences.map((experience) => (
            <article className="border-b border-midnight-ink/10 pb-5 last:border-b-0" key={`${experience.organization}-${experience.role}`}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-medium">{experience.role}</h3>
                  <p className="text-sm font-medium text-midnight-ink/60">
                    {experience.organization} / {experience.type}
                  </p>
                </div>
                <p className="text-sm font-medium text-midnight-ink/55">
                  {formatDate(experience.startDate)} -{" "}
                  {experience.isCurrent ? "Present" : formatDate(experience.endDate)}
                </p>
              </div>
              <div className="mt-3 text-sm font-medium leading-6 text-midnight-ink/70">
                <ContentBlocks value={experience.description} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-black leading-tight text-charcoal-void">Skills</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span className="rounded-[var(--radius-buttons)] bg-vapor-gray px-3 py-1.5 text-sm font-medium" key={skill.name}>
                {skill.name}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-black leading-tight text-charcoal-void">Certificates</h2>
          <div className="mt-5 grid gap-3">
            {certificates.map((certificate) => (
              <article className="rounded-[var(--radius-cards)] border border-midnight-ink/10 p-4" key={`${certificate.issuer}-${certificate.title}`}>
                <p className="font-medium">{certificate.title}</p>
                <p className="mt-1 text-sm font-medium text-midnight-ink/60">
                  {certificate.issuer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
