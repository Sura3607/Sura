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
  const sizeClass = size === "sm" ? "h-10 px-4 text-sm" : "h-12 px-5 text-base";
  const variantClass =
    variant === "ghost"
      ? "border-midnight-ink/15 text-midnight-ink hover:border-midnight-ink"
      : "border-vivid-azure text-midnight-ink hover:bg-vivid-azure hover:text-cloud-canvas";
  const className = `inline-flex items-center justify-center gap-2 rounded-[var(--radius-buttons)] border bg-transparent font-medium transition-colors ${sizeClass} ${variantClass}`;

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
