import { SectionHeader } from "@/components/sections/section-header";

export const metadata = {
  title: "About",
  description: "Bio, education, experience, and certificates.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20 sm:px-8 lg:px-10">
      <SectionHeader
        eyebrow="About"
        title="Bio, education, direction, experience."
        description="Connect this page to Sanity profile, experience, and certificate documents."
      />
    </main>
  );
}
