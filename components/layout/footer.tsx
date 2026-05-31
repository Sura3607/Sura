import { getSiteSettings } from "@/lib/content";

export async function Footer() {
  const settings = await getSiteSettings();
  const socialLinks = settings.socialLinks ?? [];
  const utilityLinks = [
    { label: "All projects", href: "/projects" },
    { label: "Notes", href: "/blog" },
  ];

  return (
    <footer className="border-t border-midnight-ink/10 px-6 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm font-medium text-midnight-ink/60 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-4">
          {utilityLinks.map((link) => (
            <a className="hover:text-midnight-ink" href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 sm:justify-end">
          {socialLinks.map((link) => (
            <a className="hover:text-midnight-ink" href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
