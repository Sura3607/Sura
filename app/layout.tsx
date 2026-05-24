import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Developer Portfolio",
    template: "%s | Developer Portfolio",
  },
  description:
    "A modern developer portfolio powered by Next.js, Sanity CMS, and Vercel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
