import { Award, MapPin } from "lucide-react";
import { SectionHeader } from "@/components/sections/section-header";
import { ContentBlocks } from "@/components/ui/content-blocks";
import { PageShell } from "@/components/ui/page-shell";
import { formatDate, getCertificates, getExperiences, getProfile } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About",
  description: "Bio, education, experience, and certificates.",
  path: "/about",
});

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
        <div className="rounded-[var(--radius-cards)] border border-graphite-rail bg-vapor-gray p-6">
          <p className="font-mono text-xs font-medium uppercase text-sky-blue">Profile</p>
          <h3 className="mt-4 text-2xl font-medium leading-tight text-charcoal-void">
            {profile.name}
          </h3>
          <p className="mt-2 font-medium text-fog">{profile.title}</p>
          {profile.location ? (
            <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-fog">
              <MapPin size={16} />
              {profile.location}
            </p>
          ) : null}
        </div>
        <div className="rounded-[var(--radius-cards)] border border-graphite-rail p-6 text-sm font-normal leading-6 text-fog">
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
            <article className="rounded-[var(--radius-cards)] border border-graphite-rail bg-vapor-gray p-6" key={`${experience.organization}-${experience.role}`}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-mono text-xs font-medium uppercase text-sky-blue">{experience.type}</p>
                  <h3 className="mt-2 text-xl font-medium leading-7 text-charcoal-void">
                    {experience.role}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-fog">
                    {experience.organization}
                  </p>
                </div>
                <p className="font-mono text-xs text-fog">
                  {formatDate(experience.startDate)} -{" "}
                  {experience.isCurrent ? "Present" : formatDate(experience.endDate)}
                </p>
              </div>
              <div className="mt-5 text-sm font-normal leading-6 text-fog">
                <ContentBlocks value={experience.description} />
              </div>
              {experience.technologies?.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <span className="rounded-[var(--radius-buttons)] border border-graphite-rail px-2 py-1 font-mono text-xs text-fog" key={tech}>
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
            <article className="rounded-[var(--radius-cards)] border border-graphite-rail bg-vapor-gray p-5" key={`${certificate.issuer}-${certificate.title}`}>
              <Award className="text-sky-blue" size={20} />
              <h3 className="mt-4 text-lg font-medium leading-6 text-charcoal-void">
                {certificate.title}
              </h3>
              <p className="mt-2 text-sm font-medium text-fog">
                {certificate.issuer}
                {certificate.issuedDate ? ` / ${formatDate(certificate.issuedDate)}` : ""}
              </p>
              {certificate.description ? (
                <p className="mt-4 text-sm font-normal leading-6 text-fog">
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
