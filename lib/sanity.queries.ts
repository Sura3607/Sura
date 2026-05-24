import { defineQuery } from "next-sanity";

export const profileQuery = defineQuery(`*[_type == "profile"][0] {
  name,
  title,
  avatar,
  shortBio,
  longBio,
  location,
  email,
  githubUrl,
  linkedinUrl,
  facebookUrl,
  resumeFile,
  resumeUrl,
  heroCtaPrimary,
  heroCtaSecondary
}`);

export const siteSettingsQuery = defineQuery(`*[_type == "siteSettings"][0] {
  siteTitle,
  siteDescription,
  siteUrl,
  defaultOgImage,
  favicon,
  navbarLinks,
  footerText,
  socialLinks,
  seoKeywords
}`);

export const projectsQuery = defineQuery(`
  *[_type == "project"] | order(priority asc, startDate desc) {
    title,
    slug,
    thumbnail,
    summary,
    techStack,
    category,
    status,
    featured,
    priority,
    githubUrl,
    demoUrl,
    startDate,
    endDate
  }
`);

export const featuredProjectsQuery = defineQuery(`
  *[_type == "project" && featured == true] | order(priority asc, startDate desc) {
    title,
    slug,
    thumbnail,
    summary,
    techStack,
    category,
    status,
    featured,
    priority,
    githubUrl,
    demoUrl,
    startDate,
    endDate
  }
`);

export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    title,
    slug,
    thumbnail,
    summary,
    description,
    problem,
    solution,
    role,
    architecture,
    techStack,
    category,
    status,
    featured,
    priority,
    githubUrl,
    demoUrl,
    screenshots,
    startDate,
    endDate,
    lessonsLearned,
    futureImprovements,
    seoTitle,
    seoDescription,
    ogImage
  }
`);

export const projectSlugsQuery = defineQuery(`
  *[_type == "project" && defined(slug.current)] {
    "slug": slug.current
  }
`);

export const skillsQuery = defineQuery(`
  *[_type == "skill"] | order(category asc, order asc) {
    name,
    category,
    level,
    usedInProjects[]->{
      title,
      slug
    },
    icon,
    order
  }
`);

export const certificatesQuery = defineQuery(`
  *[_type == "certificate"] | order(order asc, issuedDate desc) {
    title,
    issuer,
    issuedDate,
    credentialUrl,
    badgeImage,
    description,
    order
  }
`);

export const experiencesQuery = defineQuery(`
  *[_type == "experience"] | order(order asc, startDate desc) {
    organization,
    role,
    type,
    startDate,
    endDate,
    isCurrent,
    description,
    technologies,
    order
  }
`);

export const publishedBlogPostsQuery = defineQuery(`
  *[_type == "blogPost" && isPublished == true] | order(publishedAt desc) {
    title,
    slug,
    coverImage,
    excerpt,
    tags,
    publishedAt,
    readingTime,
    isFeatured,
    seoTitle,
    seoDescription,
    ogImage
  }
`);

export const blogPostBySlugQuery = defineQuery(`
  *[_type == "blogPost" && slug.current == $slug && isPublished == true][0] {
    title,
    slug,
    coverImage,
    excerpt,
    body,
    tags,
    publishedAt,
    readingTime,
    isFeatured,
    isPublished,
    seoTitle,
    seoDescription,
    ogImage
  }
`);

export const blogPostSlugsQuery = defineQuery(`
  *[_type == "blogPost" && isPublished == true && defined(slug.current)] {
    "slug": slug.current
  }
`);
