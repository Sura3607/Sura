import { Award, MapPin } from "lucide-react";
import { SectionHeader } from "@/components/sections/section-header";
import { ContentBlocks } from "@/components/ui/content-blocks";
import { PageShell } from "@/components/ui/page-shell";
import { formatDate, getCertificates, getExperiences, getProfile } from "@/lib/content";

export const metadata = {
  title: "About",
  description: "Bio, education, experience, and certificates.",
};

export default async function AboutPage() {
  const [profile, experiences, certificates] = await Promise.all([
    getProfile(),
    getExperiences(),
    getCertificates(),
  ]);

  return (
    <PageShell narrow>
      <SectionHeader
        eyebrow="About"
        title="A compact view of direction, context, and proof."
        description={profile.shortBio}
      />

      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-[var(--radius-cards)] bg-vapor-gray p-6">
          <p className="text-sm font-medium uppercase text-sky-blue">Profile</p>
          <h3 className="mt-4 text-2xl font-black leading-tight text-charcoal-void">
            {profile.name}
          </h3>
          <p className="mt-2 font-medium text-midnight-ink/70">{profile.title}</p>
          {profile.location ? (
            <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-midnight-ink/60">
              <MapPin size={16} />
              {profile.location}
            </p>
          ) : null}
        </div>
        <div className="rounded-[var(--radius-cards)] border border-midnight-ink/10 p-6 text-sm font-medium leading-6 text-midnight-ink/70">
          <ContentBlocks value={profile.longBio} fallback="Profile content will appear here after Sanity is populated." />
        </div>
      </section>

      <section className="mt-14">
        <SectionHeader
          eyebrow="Experience"
          title="Where the work has been practiced."
        />
        <div className="mt-8 grid gap-3">
          {experiences.map((experience) => (
            <article className="rounded-[var(--radius-cards)] bg-vapor-gray p-6" key={`${experience.organization}-${experience.role}`}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-sky-blue">{experience.type}</p>
                  <h3 className="mt-2 text-xl font-medium leading-7 text-charcoal-void">
                    {experience.role}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-midnight-ink/60">
                    {experience.organization}
                  </p>
                </div>
                <p className="text-sm font-medium text-midnight-ink/55">
                  {formatDate(experience.startDate)} -{" "}
                  {experience.isCurrent ? "Present" : formatDate(experience.endDate)}
                </p>
              </div>
              <div className="mt-5 text-sm font-medium leading-6 text-midnight-ink/70">
                <ContentBlocks value={experience.description} />
              </div>
              {experience.technologies?.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <span className="rounded-[var(--radius-buttons)] border border-midnight-ink/15 px-2 py-1 text-xs font-medium" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <SectionHeader eyebrow="Certificates" title="Signals worth keeping visible." />
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {certificates.map((certificate) => (
            <article className="rounded-[var(--radius-cards)] border border-midnight-ink/10 p-5" key={`${certificate.issuer}-${certificate.title}`}>
              <Award className="text-sky-blue" size={20} />
              <h3 className="mt-4 text-lg font-medium leading-6 text-charcoal-void">
                {certificate.title}
              </h3>
              <p className="mt-2 text-sm font-medium text-midnight-ink/60">
                {certificate.issuer}
                {certificate.issuedDate ? ` / ${formatDate(certificate.issuedDate)}` : ""}
              </p>
              {certificate.description ? (
                <p className="mt-4 text-sm font-medium leading-6 text-midnight-ink/65">
                  {certificate.description}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
