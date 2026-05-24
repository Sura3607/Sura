import type { Metadata } from "next";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

export function createMetadata({ title, description, path = "/", image }: SeoInput): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const url = new URL(path, baseUrl);

  return {
    title,
    description,
    alternates: {
      canonical: url.toString(),
    },
    openGraph: {
      title,
      description,
      url: url.toString(),
      images: image ? [{ url: image }] : undefined,
    },
  };
}
