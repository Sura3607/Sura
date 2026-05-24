export type Slug = {
  current: string;
};

export type Certificate = {
  title: string;
  issuer: string;
  issuedDate?: string;
  credentialUrl?: string;
  badgeImage?: unknown;
  description?: string;
  order?: number;
};

export type Experience = {
  organization: string;
  role: string;
  type: "Internship" | "Freelance" | "Academic" | "Personal" | "Volunteer";
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  description?: unknown[];
  technologies?: string[];
  order?: number;
};

export type SiteSettings = {
  siteTitle: string;
  siteDescription: string;
  siteUrl?: string;
  defaultOgImage?: unknown;
  favicon?: unknown;
  navbarLinks?: Array<{
    label: string;
    href: string;
  }>;
  footerText?: string;
  socialLinks?: Array<{
    label: string;
    href: string;
  }>;
  seoKeywords?: string[];
};
