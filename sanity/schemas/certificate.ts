import { defineField, defineType } from "sanity";

export const certificate = defineType({
  name: "certificate",
  title: "Certificate",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "issuer", title: "Issuer", type: "string" }),
    defineField({ name: "issuedDate", title: "Issued Date", type: "date" }),
    defineField({ name: "credentialUrl", title: "Credential URL", type: "url" }),
    defineField({ name: "badgeImage", title: "Badge Image", type: "image" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 }),
  ],
});
