import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteTitle", title: "Site Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "siteDescription",
      title: "Site Description",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({ name: "siteUrl", title: "Site URL", type: "url" }),
    defineField({ name: "defaultOgImage", title: "Default Open Graph Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "favicon", title: "Favicon", type: "image", options: { hotspot: true } }),
    defineField({
      name: "navbarLinks",
      title: "Navbar Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "href", title: "Href", type: "string", validation: (Rule) => Rule.required() }),
          ],
        },
      ],
    }),
    defineField({ name: "footerText", title: "Footer Text", type: "string" }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "href", title: "Href", type: "url", validation: (Rule) => Rule.required() }),
          ],
        },
      ],
    }),
    defineField({ name: "seoKeywords", title: "SEO Keywords", type: "array", of: [{ type: "string" }] }),
  ],
  preview: {
    select: {
      title: "siteTitle",
      subtitle: "siteUrl",
      media: "defaultOgImage",
    },
  },
});
