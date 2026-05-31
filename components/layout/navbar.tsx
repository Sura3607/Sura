"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <header className="sticky top-0 z-50 border-b border-graphite-rail bg-cloud-canvas/86 backdrop-blur-2xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-10">
        <Link className="text-sm font-semibold tracking-normal text-charcoal-void" href="/">
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
                className={`relative flex h-16 items-center text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:rounded-full after:bg-vivid-azure after:transition-transform ${
                  isActive
                    ? "text-charcoal-void after:scale-x-100"
                    : "text-fog after:scale-x-0 hover:text-charcoal-void hover:after:scale-x-100"
                }`}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </a>
            );
          })}
        </div>
        <a
          className="hidden rounded-[var(--radius-buttons)] border border-vivid-azure px-3.5 py-2 text-sm font-medium text-charcoal-void transition-colors hover:border-charcoal-void md:inline-flex"
          href="/resume"
        >
          Resume
        </a>
      </nav>
      <div className="border-t border-graphite-rail md:hidden">
        <div className="mx-auto flex max-w-7xl gap-4 overflow-x-auto px-6 sm:px-8">
          {links.map((link) => {
            const isActive =
              pathname === "/" &&
              (link.hash === activeHash || (link.hash === "#top" && activeHash === ""));

            return (
              <a
                aria-current={isActive ? "page" : undefined}
                className={`relative flex h-11 shrink-0 items-center text-sm font-medium after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:rounded-full after:bg-vivid-azure after:transition-transform ${
                  isActive
                    ? "text-charcoal-void after:scale-x-100"
                    : "text-fog after:scale-x-0"
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
