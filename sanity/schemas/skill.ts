import { defineField, defineType } from "sanity";

export const skill = defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  orderings: [
    {
      title: "Category, then order",
      name: "categoryThenOrder",
      by: [
        { field: "category", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["Language", "Framework", "Database", "AI/ML", "Tool", "Cloud", "Other"],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "level",
      title: "Level",
      type: "string",
      options: {
        list: ["Familiar", "Working Knowledge", "Project Experience", "Strong"],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "usedInProjects", title: "Used In Projects", type: "array", of: [{ type: "reference", to: [{ type: "project" }] }] }),
    defineField({ name: "icon", title: "Icon", type: "image" }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 }),
  ],
  preview: {
    select: {
      title: "name",
      category: "category",
      level: "level",
      media: "icon",
    },
    prepare({ title, category, level, media }) {
      return {
        title,
        subtitle: [category, level].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
