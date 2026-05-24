import type { MetadataRoute } from "next";
import { getBlogPostSlugs, getProjectSlugs } from "@/lib/content";
import { getBaseUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const routes = ["", "/about", "/projects", "/skills", "/resume", "/blog", "/contact"];
  const [projectSlugs, blogSlugs] = await Promise.all([
    getProjectSlugs(),
    getBlogPostSlugs(),
  ]);
  const dynamicRoutes = [
    ...projectSlugs.map((item) => `/projects/${item.slug}`),
    ...blogSlugs.map((item) => `/blog/${item.slug}`),
  ];

  return [...routes, ...dynamicRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
