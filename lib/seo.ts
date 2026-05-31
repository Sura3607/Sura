import type { Metadata } from "next";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

const defaultTitle = "Sura Portfolio";
const defaultDescription =
  "Portfolio for AI, backend systems, and product-minded software engineering.";

export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

export function absoluteUrl(path = "/") {
  return new URL(path, getBaseUrl()).toString();
}

export function trimDescription(description?: string) {
  const fallback = description?.trim() || defaultDescription;
  return fallback.length > 160 ? `${fallback.slice(0, 157).trim()}...` : fallback;
}

export function createMetadata({
  title,
  description,
  path = "/",
  image,
  type = "website",
  noIndex = false,
}: SeoInput): Metadata {
  const safeDescription = trimDescription(description);
  const url = absoluteUrl(path);
  const imageUrl = image ? absoluteUrl(image) : absoluteUrl("/opengraph-image");

  return {
    title,
    description: safeDescription,
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: safeDescription,
      url,
      type,
      images: [{ url: imageUrl }],
      siteName: defaultTitle,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: safeDescription,
      images: [imageUrl],
    },
  };
}
