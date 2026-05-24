import { getSiteSettings } from "@/lib/content";

export async function Footer() {
  const settings = await getSiteSettings();

  return (
    <footer className="border-t border-midnight-ink/10 px-6 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm font-medium text-midnight-ink/60 sm:flex-row sm:items-center sm:justify-between">
        <p>{settings.footerText ?? "Built with Next.js, Sanity, and Vercel."}</p>
        <div className="flex flex-wrap gap-4">
          {(settings.socialLinks ?? []).map((link) => (
            <a className="hover:text-midnight-ink" href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
          <span>Design follows DESIGN.md.</span>
        </div>
      </div>
    </footer>
  );
}
