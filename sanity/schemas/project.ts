import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  orderings: [
    {
      title: "Priority, then newest",
      name: "priorityThenNewest",
      by: [
        { field: "priority", direction: "asc" },
        { field: "startDate", direction: "desc" },
      ],
    },
  ],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "thumbnail", title: "Thumbnail", type: "image", options: { hotspot: true } }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({ name: "description", title: "Description", type: "blockContent" }),
    defineField({ name: "problem", title: "Problem", type: "blockContent" }),
    defineField({ name: "solution", title: "Solution", type: "blockContent" }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "architecture", title: "Architecture", type: "blockContent" }),
    defineField({
      name: "techStack",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["Learning", "In Progress", "Completed", "Archived"] },
      initialValue: "Completed",
    }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "priority", title: "Priority", type: "number", initialValue: 0 }),
    defineField({ name: "githubUrl", title: "GitHub URL", type: "url" }),
    defineField({ name: "demoUrl", title: "Demo URL", type: "url" }),
    defineField({ name: "screenshots", title: "Screenshots", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
    defineField({ name: "startDate", title: "Start Date", type: "date" }),
    defineField({ name: "endDate", title: "End Date", type: "date" }),
    defineField({ name: "lessonsLearned", title: "Lessons Learned", type: "blockContent" }),
    defineField({ name: "futureImprovements", title: "Future Improvements", type: "blockContent" }),
    defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text", rows: 2 }),
    defineField({ name: "ogImage", title: "Open Graph Image", type: "image", options: { hotspot: true } }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      status: "status",
      media: "thumbnail",
    },
    prepare({ title, category, status, media }) {
      return {
        title,
        subtitle: [category, status].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
