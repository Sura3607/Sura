import { defineField, defineType } from "sanity";

export const profile = defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "avatar", title: "Avatar", type: "image", options: { hotspot: true } }),
    defineField({ name: "shortBio", title: "Short Bio", type: "text", rows: 3 }),
    defineField({ name: "longBio", title: "Long Bio", type: "blockContent" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "email", title: "Email", type: "email" }),
    defineField({ name: "githubUrl", title: "GitHub URL", type: "url" }),
    defineField({ name: "linkedinUrl", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "facebookUrl", title: "Facebook URL", type: "url" }),
    defineField({ name: "resumeFile", title: "Resume PDF", type: "file" }),
    defineField({ name: "resumeUrl", title: "Resume URL", type: "url" }),
    defineField({ name: "heroCtaPrimary", title: "Hero CTA Primary", type: "string" }),
    defineField({ name: "heroCtaSecondary", title: "Hero CTA Secondary", type: "string" }),
  ],
});
