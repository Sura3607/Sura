import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href: string;
  icon?: ReactNode;
  size?: "sm" | "md";
  variant?: "outline" | "ghost";
};

export function Button({
  children,
  href,
  icon,
  size = "md",
  variant = "outline",
}: ButtonProps) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  const sizeClass = size === "sm" ? "h-10 px-4 text-sm" : "h-11 px-5 text-sm";
  const variantClass =
    variant === "ghost"
      ? "border-graphite-rail text-fog hover:border-smoke hover:text-charcoal-void"
      : "border-vivid-azure text-charcoal-void hover:border-charcoal-void";
  const className = `inline-flex items-center justify-center gap-2 rounded-[var(--radius-buttons)] border bg-transparent font-medium transition-all duration-200 ${sizeClass} ${variantClass}`;

  if (isExternal) {
    return (
      <a className={className} href={href} rel="noreferrer" target={href.startsWith("http") ? "_blank" : undefined}>
        {children}
        {icon}
      </a>
    );
  }

  return (
    <Link className={className} href={href}>
      {children}
      {icon}
    </Link>
  );
}
