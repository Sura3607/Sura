import { blogPost } from "@/sanity/schemas/blogPost";
import { blockContent } from "@/sanity/schemas/blockContent";
import { certificate } from "@/sanity/schemas/certificate";
import { experience } from "@/sanity/schemas/experience";
import { profile } from "@/sanity/schemas/profile";
import { project } from "@/sanity/schemas/project";
import { siteSettings } from "@/sanity/schemas/siteSettings";
import { skill } from "@/sanity/schemas/skill";

export const schemaTypes = [
  blockContent,
  profile,
  project,
  skill,
  certificate,
  experience,
  blogPost,
  siteSettings,
];
