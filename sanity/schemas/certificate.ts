import { defineField, defineType } from "sanity";

export const certificate = defineType({
  name: "certificate",
  title: "Certificate",
  type: "document",
  orderings: [
    {
      title: "Order, then newest",
      name: "orderThenNewest",
      by: [
        { field: "order", direction: "asc" },
        { field: "issuedDate", direction: "desc" },
      ],
    },
  ],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "issuer", title: "Issuer", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "issuedDate", title: "Issued Date", type: "date" }),
    defineField({ name: "credentialUrl", title: "Credential URL", type: "url" }),
    defineField({ name: "badgeImage", title: "Badge Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 }),
  ],
  preview: {
    select: {
      title: "title",
      issuer: "issuer",
      issuedDate: "issuedDate",
      media: "badgeImage",
    },
    prepare({ title, issuer, issuedDate, media }) {
      return {
        title,
        subtitle: [issuer, issuedDate].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
