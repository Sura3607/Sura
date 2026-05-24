import { defineField, defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  orderings: [
    {
      title: "Order, then newest",
      name: "orderThenNewest",
      by: [
        { field: "order", direction: "asc" },
        { field: "startDate", direction: "desc" },
      ],
    },
  ],
  fields: [
    defineField({ name: "organization", title: "Organization", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "role", title: "Role", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: { list: ["Internship", "Freelance", "Academic", "Personal", "Volunteer"] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "startDate", title: "Start Date", type: "date" }),
    defineField({ name: "endDate", title: "End Date", type: "date" }),
    defineField({ name: "isCurrent", title: "Current", type: "boolean", initialValue: false }),
    defineField({ name: "description", title: "Description", type: "blockContent" }),
    defineField({ name: "technologies", title: "Technologies", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 }),
  ],
  preview: {
    select: {
      title: "role",
      organization: "organization",
      type: "type",
    },
    prepare({ title, organization, type }) {
      return {
        title,
        subtitle: [organization, type].filter(Boolean).join(" · "),
      };
    },
  },
});
