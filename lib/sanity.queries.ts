import { defineQuery } from "next-sanity";

export const profileQuery = defineQuery(`*[_type == "profile"][0]`);

export const featuredProjectsQuery = defineQuery(`
  *[_type == "project" && featured == true] | order(priority asc, startDate desc) {
    title,
    slug,
    thumbnail,
    summary,
    techStack,
    category,
    status,
    githubUrl,
    demoUrl
  }
`);

export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]
`);

export const publishedBlogPostsQuery = defineQuery(`
  *[_type == "blogPost" && isPublished == true] | order(publishedAt desc) {
    title,
    slug,
    coverImage,
    excerpt,
    tags,
    publishedAt,
    readingTime
  }
`);
