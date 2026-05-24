import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteTitle", title: "Site Title", type: "string" }),
    defineField({ name: "siteDescription", title: "Site Description", type: "text", rows: 2 }),
    defineField({ name: "siteUrl", title: "Site URL", type: "url" }),
    defineField({ name: "defaultOgImage", title: "Default Open Graph Image", type: "image" }),
    defineField({ name: "favicon", title: "Favicon", type: "image" }),
    defineField({
      name: "navbarLinks",
      title: "Navbar Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "href", title: "Href", type: "string" },
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
            { name: "label", title: "Label", type: "string" },
            { name: "href", title: "Href", type: "url" },
          ],
        },
      ],
    }),
    defineField({ name: "seoKeywords", title: "SEO Keywords", type: "array", of: [{ type: "string" }] }),
  ],
});
