export type Skill = {
  name: string;
  category: "Language" | "Framework" | "Database" | "AI/ML" | "Tool" | "Cloud" | "Other";
  level: "Familiar" | "Working Knowledge" | "Project Experience" | "Strong";
  usedInProjects?: Array<{
    title: string;
    slug: { current: string };
  }>;
  icon?: unknown;
  order?: number;
};
