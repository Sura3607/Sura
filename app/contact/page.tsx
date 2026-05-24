import { ExternalLink, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { SectionHeader } from "@/components/sections/section-header";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/ui/page-shell";
import { getProfile } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact",
  description: "Contact information and inquiry path.",
  path: "/contact",
});

export default async function ContactPage() {
  const profile = await getProfile();
  const emailHref = profile.email ? `mailto:${profile.email}` : "mailto:hello@example.com";

  return (
    <PageShell narrow>
      <SectionHeader
        eyebrow="Contact"
        title="A clear path for recruiters and collaborators."
        description="Phase 03 keeps contact simple with mailto. Phase 04 can replace this with the validated Resend-backed form."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-[var(--radius-cards)] bg-vapor-gray p-6">
          <Mail className="text-sky-blue" size={22} />
          <h2 className="mt-5 text-xl font-medium leading-7 text-charcoal-void">
            Email
          </h2>
          <p className="mt-3 text-sm font-medium leading-6 text-midnight-ink/65">
            Use email for project conversations, hiring loops, and collaboration notes.
          </p>
          <div className="mt-5">
            <Button href={emailHref} icon={<Mail size={18} />}>
              Send email
            </Button>
          </div>
        </div>

        <div className="rounded-[var(--radius-cards)] border border-midnight-ink/10 p-6">
          <MapPin className="text-sky-blue" size={22} />
          <h2 className="mt-5 text-xl font-medium leading-7 text-charcoal-void">
            Location
          </h2>
          <p className="mt-3 text-sm font-medium leading-6 text-midnight-ink/65">
            {profile.location ?? "Location will appear after the profile document is filled."}
          </p>
          {profile.githubUrl ? (
            <div className="mt-5">
              <Button href={profile.githubUrl} icon={<ExternalLink size={18} />} variant="ghost">
                GitHub
              </Button>
            </div>
          ) : null}
        </div>
      </div>

      <section className="mt-10 rounded-[var(--radius-cards)] border border-midnight-ink/10 p-6">
        <h2 className="text-2xl font-black leading-tight text-charcoal-void">
          Send a structured message
        </h2>
        <p className="mt-3 text-sm font-medium leading-6 text-midnight-ink/65">
          This form uses the server route and falls back to email if Resend is not configured.
        </p>
        <div className="mt-6">
          <ContactForm fallbackEmail={profile.email} />
        </div>
      </section>
    </PageShell>
  );
}
