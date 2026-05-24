import { defineField, defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({ name: "organization", title: "Organization", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: { list: ["Internship", "Freelance", "Academic", "Personal", "Volunteer"] },
    }),
    defineField({ name: "startDate", title: "Start Date", type: "date" }),
    defineField({ name: "endDate", title: "End Date", type: "date" }),
    defineField({ name: "isCurrent", title: "Current", type: "boolean", initialValue: false }),
    defineField({ name: "description", title: "Description", type: "blockContent" }),
    defineField({ name: "technologies", title: "Technologies", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 }),
  ],
});
