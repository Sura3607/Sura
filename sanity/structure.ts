import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Portfolio")
    .items([
      S.listItem()
        .title("Profile")
        .schemaType("profile")
        .child(S.document().schemaType("profile").documentId("profile").title("Profile")),
      S.listItem()
        .title("Site Settings")
        .schemaType("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings"),
        ),
      S.divider(),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("blogPost").title("Blog Posts"),
      S.documentTypeListItem("skill").title("Skills"),
      S.documentTypeListItem("certificate").title("Certificates"),
      S.documentTypeListItem("experience").title("Experiences"),
    ]);
