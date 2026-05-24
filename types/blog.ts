export type BlogPost = {
  title: string;
  slug: { current: string };
  coverImage?: unknown;
  excerpt?: string;
  body?: unknown[];
  tags?: string[];
  publishedAt?: string;
  readingTime?: number;
  isFeatured?: boolean;
  isPublished?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: unknown;
};
