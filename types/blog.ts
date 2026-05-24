export type BlogPost = {
  title: string;
  slug: { current: string };
  excerpt?: string;
  tags?: string[];
  publishedAt?: string;
  readingTime?: number;
};
