import Link from "next/link";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/blog", label: "Notes" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-midnight-ink/10 bg-cloud-canvas/90 backdrop-blur">
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-10">
        <Link className="text-base font-semibold" href="/">
          Portfolio
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link className="text-sm font-medium text-midnight-ink/70 hover:text-midnight-ink" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
        <Button href="/resume" size="sm">
          Resume
        </Button>
      </nav>
    </header>
  );
}
