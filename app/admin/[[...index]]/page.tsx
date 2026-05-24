import type { Metadata, Viewport } from "next";
import { AdminStudio } from "@/components/admin/admin-studio";

export const metadata: Metadata = {
  title: "Portfolio CMS",
  robots: "noindex",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function StudioPage() {
  return <AdminStudio />;
}
