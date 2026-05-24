import {
  blogPostBySlugQuery,
  blogPostSlugsQuery,
  certificatesQuery,
  experiencesQuery,
  featuredProjectsQuery,
  profileQuery,
  projectBySlugQuery,
  projectSlugsQuery,
  projectsQuery,
  publishedBlogPostsQuery,
  siteSettingsQuery,
  skillsQuery,
} from "@/lib/sanity.queries";
import { sanityClient } from "@/lib/sanity.client";
import type { BlogPost } from "@/types/blog";
import type { Profile } from "@/types/profile";
import type { Project } from "@/types/project";
import type { Skill } from "@/types/skill";

export type SiteSettings = {
  siteTitle?: string;
  siteDescription?: string;
  siteUrl?: string;
  navbarLinks?: Array<{ label: string; href: string }>;
  footerText?: string;
  socialLinks?: Array<{ label: string; href: string }>;
  seoKeywords?: string[];
};

export type Certificate = {
  title: string;
  issuer: string;
  issuedDate?: string;
  credentialUrl?: string;
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

const hasSanityConfig = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "00000000",
);

async function fetchFromSanity<T>(
  query: string,
  params?: Record<string, string>,
  tags?: string[],
): Promise<T | null> {
  if (!hasSanityConfig) {
    return null;
  }

  try {
    return await sanityClient.fetch<T>(query, params ?? {}, tags ? { next: { tags } } : {});
  } catch (error) {
    console.warn("Sanity fetch failed, using fallback content.", error);
    return null;
  }
}

export const fallbackProfile: Profile = {
  name: "Portfolio Owner",
  title: "AI, Backend & Product-minded Software Engineer",
  shortBio:
    "A focused portfolio for AI workflows, backend systems, and practical product engineering.",
  longBio: plainBlocks([
    "This portfolio is ready to render content from Sanity. Until CMS data is published, it uses non-sensitive fallback copy so every route remains usable.",
    "The content model supports profile details, project case studies, skills, certificates, experiences, blog posts, and site settings.",
  ]),
  location: "Ho Chi Minh City, Vietnam",
  heroCtaPrimary: "View projects",
  heroCtaSecondary: "Start a conversation",
};

export const fallbackProjects: Project[] = [
  {
    title: "AI Workflow System",
    slug: { current: "ai-workflow-system" },
    summary:
      "A representative case study for turning unstructured inputs into structured decisions with AI and backend orchestration.",
    description: plainBlocks([
      "Use this placeholder as the shape for a production project story. Replace it in Sanity with the real problem, constraints, and results.",
    ]),
    problem: plainBlocks([
      "Teams often start with an impressive model demo, then discover that data quality, failure states, and operational handoff are the real product work.",
    ]),
    solution: plainBlocks([
      "Design a typed backend boundary, keep AI output structured, and add fallbacks that make the workflow useful even when model confidence is low.",
    ]),
    role: "System design, backend implementation, AI integration",
    architecture: plainBlocks([
      "Next.js frontend, API boundary, queue-friendly processing layer, retrieval context, and structured persistence.",
    ]),
    techStack: ["Next.js", "TypeScript", "LLM", "RAG"],
    category: "AI/ML",
    status: "Completed",
    featured: true,
    priority: 1,
    lessonsLearned: plainBlocks([
      "Reliable AI products need evaluation loops and fallback UI as much as they need good prompts.",
    ]),
    futureImprovements: plainBlocks([
      "Add live traces, richer evaluation datasets, and human review workflows.",
    ]),
  },
  {
    title: "Multi-tenant SaaS Foundation",
    slug: { current: "multi-tenant-saas-foundation" },
    summary:
      "A scalable SaaS architecture story focused on tenant isolation, access control, and cloud-ready backend structure.",
    problem: plainBlocks([
      "Business workflows need shared infrastructure without leaking data, permissions, or operational concerns between tenants.",
    ]),
    solution: plainBlocks([
      "Separate tenant-aware data access, role boundaries, and deployment concerns early so the product can grow without rewrites.",
    ]),
    role: "Backend and cloud architecture",
    architecture: plainBlocks([
      "React interface, Node.js services, relational database, object storage, and IAM-based access boundaries.",
    ]),
    techStack: ["Node.js", "React", "AWS", "SQL"],
    category: "Full-stack",
    status: "Completed",
    featured: true,
    priority: 2,
  },
  {
    title: "Structured NLP Extraction",
    slug: { current: "structured-nlp-extraction" },
    summary:
      "A text processing project pattern for extracting entities and relationships from domain-specific documents.",
    problem: plainBlocks([
      "Free-form text hides important domain facts that teams need to search, compare, and route through downstream systems.",
    ]),
    solution: plainBlocks([
      "Combine dataset preparation, model fine-tuning, and typed output schemas to turn raw text into usable structured data.",
    ]),
    role: "NLP pipeline and dataset preparation",
    architecture: plainBlocks([
      "Custom dataset, entity extraction model, relation extraction layer, and structured JSON output.",
    ]),
    techStack: ["Python", "NLP", "Dataset", "Model evaluation"],
    category: "NLP",
    status: "Completed",
    featured: false,
    priority: 3,
  },
];

export const fallbackSkills: Skill[] = [
  { name: "TypeScript", category: "Language", level: "Strong", order: 1 },
  { name: "Python", category: "Language", level: "Strong", order: 2 },
  { name: "Node.js", category: "Framework", level: "Strong", order: 3 },
  { name: "React", category: "Framework", level: "Project Experience", order: 4 },
  { name: "RAG Pipelines", category: "AI/ML", level: "Project Experience", order: 5 },
  { name: "Prompt Engineering", category: "AI/ML", level: "Project Experience", order: 6 },
  { name: "SQL", category: "Database", level: "Project Experience", order: 7 },
  { name: "AWS", category: "Cloud", level: "Project Experience", order: 8 },
  { name: "GitHub", category: "Tool", level: "Strong", order: 9 },
  { name: "Cybersecurity Awareness", category: "Other", level: "Working Knowledge", order: 10 },
];

export const fallbackCertificates: Certificate[] = [
  {
    title: "RAG and Agentic AI study track",
    issuer: "Learning portfolio",
    description:
      "Placeholder for published credentials. Add real certificate links in Sanity when ready.",
    order: 1,
  },
  {
    title: "Cybersecurity fundamentals",
    issuer: "Learning portfolio",
    description:
      "Fallback entry that keeps the resume structure visible without exposing private credential links.",
    order: 2,
  },
];

export const fallbackExperiences: Experience[] = [
  {
    organization: "Computer Science Program",
    role: "Software Engineering and AI Focus",
    type: "Academic",
    isCurrent: true,
    description: plainBlocks([
      "Academic and project work across artificial intelligence, backend development, algorithms, and security-aware software design.",
    ]),
    technologies: ["AI", "Backend", "Algorithms", "Systems"],
    order: 1,
  },
];

export const fallbackBlogPosts: BlogPost[] = [
  {
    title: "Building AI features that survive real data",
    slug: { current: "building-ai-features-that-survive-real-data" },
    excerpt:
      "A draft-style note on making AI workflows useful beyond the demo: structure, evaluation, and fallbacks.",
    body: plainBlocks([
      "AI features become useful when the system around the model is designed with the same care as the model interaction itself.",
      "The practical loop is simple: understand the input mess, keep outputs structured, measure behavior, and build graceful fallbacks.",
      "For a portfolio, this post can become a concise case study about how technical decisions connect to product reliability.",
    ]),
    tags: ["AI", "RAG", "Backend"],
    readingTime: 5,
    isFeatured: true,
    isPublished: true,
  },
];

export async function getSiteSettings() {
  return (
    (await fetchFromSanity<SiteSettings>(siteSettingsQuery, undefined, ["siteSettings"])) ?? {
      siteTitle: "Sura Portfolio",
      siteDescription:
        "Portfolio for AI, backend systems, and product-minded software engineering.",
      footerText: "Built with Next.js, Sanity, and Vercel.",
      socialLinks: [],
    }
  );
}

export async function getProfile() {
  return (await fetchFromSanity<Profile>(profileQuery, undefined, ["profile"])) ?? fallbackProfile;
}

export async function getProjects() {
  const projects = await fetchFromSanity<Project[]>(projectsQuery, undefined, ["projects"]);
  return projects?.length ? projects : fallbackProjects;
}

export async function getFeaturedProjects() {
  const projects = await fetchFromSanity<Project[]>(featuredProjectsQuery, undefined, ["projects"]);
  return projects?.length ? projects : fallbackProjects.filter((project) => project.featured);
}

export async function getProjectBySlug(slug: string) {
  const project = await fetchFromSanity<Project>(projectBySlugQuery, { slug }, [
    "projects",
    `project:${slug}`,
  ]);
  return project ?? fallbackProjects.find((item) => item.slug.current === slug) ?? null;
}

export async function getSkills() {
  const skills = await fetchFromSanity<Skill[]>(skillsQuery, undefined, ["skills"]);
  return skills?.length ? skills : fallbackSkills;
}

export async function getCertificates() {
  const certificates = await fetchFromSanity<Certificate[]>(certificatesQuery, undefined, [
    "certificates",
  ]);
  return certificates?.length ? certificates : fallbackCertificates;
}

export async function getExperiences() {
  const experiences = await fetchFromSanity<Experience[]>(experiencesQuery, undefined, [
    "experiences",
  ]);
  return experiences?.length ? experiences : fallbackExperiences;
}

export async function getBlogPosts() {
  const posts = await fetchFromSanity<BlogPost[]>(publishedBlogPostsQuery, undefined, ["blog"]);
  return posts?.length ? posts : fallbackBlogPosts;
}

export async function getBlogPostBySlug(slug: string) {
  const post = await fetchFromSanity<BlogPost>(blogPostBySlugQuery, { slug }, [
    "blog",
    `blog:${slug}`,
  ]);
  return post ?? fallbackBlogPosts.find((item) => item.slug.current === slug) ?? null;
}

export async function getProjectSlugs() {
  const slugs = await fetchFromSanity<Array<{ slug: string }>>(
    projectSlugsQuery,
    undefined,
    ["projects"],
  );
  return slugs?.length ? slugs : fallbackProjects.map((project) => ({ slug: project.slug.current }));
}

export async function getBlogPostSlugs() {
  const slugs = await fetchFromSanity<Array<{ slug: string }>>(
    blogPostSlugsQuery,
    undefined,
    ["blog"],
  );
  return slugs?.length ? slugs : fallbackBlogPosts.map((post) => ({ slug: post.slug.current }));
}

export function formatDate(value?: string) {
  if (!value) {
    return "Present";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function plainBlocks(paragraphs: string[]) {
  return paragraphs.map((paragraph, index) => ({
    _type: "block",
    _key: `fallback-${index}`,
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: `fallback-span-${index}`,
        text: paragraph,
        marks: [],
      },
    ],
  }));
}

export function groupSkills(skills: Skill[]) {
  return skills.reduce<Record<string, Skill[]>>((groups, skill) => {
    const category = skill.category ?? "Other";
    groups[category] = [...(groups[category] ?? []), skill];
    return groups;
  }, {});
}
