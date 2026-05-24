import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Portfolio")
    .items([
      S.documentTypeListItem("profile").title("Profile"),
      S.divider(),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("blogPost").title("Blog Posts"),
      S.documentTypeListItem("skill").title("Skills"),
      S.documentTypeListItem("certificate").title("Certificates"),
      S.documentTypeListItem("experience").title("Experiences"),
      S.divider(),
      S.documentTypeListItem("siteSettings").title("Site Settings"),
    ]);
