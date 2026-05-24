import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "@/lib/sanity.client";
import { schemaTypes } from "@/sanity/schemas";
import { structure } from "@/sanity/structure";

export default defineConfig({
  name: "default",
  title: "Portfolio CMS",
  projectId,
  dataset,
  basePath: "/admin",
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
  },
  scheduledPublishing: {
    enabled: false,
  },
  document: {
    productionUrl: async (prev, context) => {
      const slug = context.document?.slug as { current?: string } | undefined;
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

      if (!siteUrl || !slug?.current) {
        return prev;
      }

      if (context.document?._type === "project") {
        return `${siteUrl}/projects/${slug.current}`;
      }

      if (context.document?._type === "blogPost") {
        return `${siteUrl}/blog/${slug.current}`;
      }

      return prev;
    },
  },
  apiVersion,
});
