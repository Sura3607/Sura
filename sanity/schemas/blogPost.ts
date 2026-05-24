import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  orderings: [
    {
      title: "Published date, newest",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(220),
    }),
    defineField({ name: "body", title: "Body", type: "blockContent" }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({ name: "readingTime", title: "Reading Time", type: "number" }),
    defineField({ name: "isFeatured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "isPublished", title: "Published", type: "boolean", initialValue: false }),
    defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text", rows: 2 }),
    defineField({ name: "ogImage", title: "Open Graph Image", type: "image", options: { hotspot: true } }),
  ],
  preview: {
    select: {
      title: "title",
      publishedAt: "publishedAt",
      isPublished: "isPublished",
      media: "coverImage",
    },
    prepare({ title, publishedAt, isPublished, media }) {
      return {
        title,
        subtitle: `${isPublished ? "Published" : "Draft"}${publishedAt ? ` · ${publishedAt}` : ""}`,
        media,
      };
    },
  },
});
