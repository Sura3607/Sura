"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const links = [
  { href: "/#top", label: "Home", hash: "#top" },
  { href: "/#about", label: "About", hash: "#about" },
  { href: "/#projects", label: "Projects", hash: "#projects" },
  { href: "/#skills", label: "Skills", hash: "#skills" },
  { href: "/#certificates", label: "Certificates", hash: "#certificates" },
  { href: "/#contact", label: "Contact", hash: "#contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    function updateHash() {
      setActiveHash(window.location.hash);
    }

    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-midnight-ink/10 bg-cloud-canvas/90 backdrop-blur">
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-10">
        <Link className="text-base font-semibold" href="/">
          Sura
        </Link>
        <div className="hidden items-center gap-5 md:flex">
          {links.map((link) => {
            const isActive =
              pathname === "/" &&
              (link.hash === activeHash || (link.hash === "#top" && activeHash === ""));

            return (
              <a
                aria-current={isActive ? "page" : undefined}
                className={`relative flex h-[72px] items-center text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-vivid-azure after:transition-transform ${
                  isActive
                    ? "text-midnight-ink after:scale-x-100"
                    : "text-midnight-ink/70 after:scale-x-0 hover:text-midnight-ink hover:after:scale-x-100"
                }`}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </a>
            );
          })}
        </div>
        <ThemeToggle />
      </nav>
      <div className="border-t border-midnight-ink/10 md:hidden">
        <div className="mx-auto flex max-w-7xl gap-4 overflow-x-auto px-6 sm:px-8">
          {links.map((link) => {
            const isActive =
              pathname === "/" &&
              (link.hash === activeHash || (link.hash === "#top" && activeHash === ""));

            return (
              <a
                aria-current={isActive ? "page" : undefined}
                className={`relative flex h-11 shrink-0 items-center text-sm font-medium after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-vivid-azure after:transition-transform ${
                  isActive
                    ? "text-midnight-ink after:scale-x-100"
                    : "text-midnight-ink/60 after:scale-x-0"
                }`}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}
