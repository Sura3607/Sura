import { Download } from "lucide-react";
import { SectionHeader } from "@/components/sections/section-header";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Resume",
  description: "Online resume and downloadable PDF.",
};

export default function ResumePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20 sm:px-8 lg:px-10">
      <SectionHeader
        eyebrow="Resume"
        title="Readable online CV with a PDF fallback."
        description="Upload the PDF to Sanity or public assets, then render a structured HTML resume here."
      />
      <div className="mt-8">
        <Button href="/resume.pdf" icon={<Download size={18} />}>
          Download CV
        </Button>
      </div>
    </main>
  );
}
