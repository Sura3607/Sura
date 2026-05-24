export type Project = {
  title: string;
  slug: { current: string };
  summary?: string;
  techStack?: string[];
  category?: string;
  status?: "Learning" | "In Progress" | "Completed" | "Archived";
  githubUrl?: string;
  demoUrl?: string;
};
