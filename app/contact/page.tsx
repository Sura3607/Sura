import { Mail } from "lucide-react";
import { SectionHeader } from "@/components/sections/section-header";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Contact",
  description: "Contact information and inquiry form.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20 sm:px-8 lg:px-10">
      <SectionHeader
        eyebrow="Contact"
        title="A clear path for recruiters and collaborators."
        description="Start with mailto, then enable the Resend API route when environment variables are ready."
      />
      <div className="mt-8">
        <Button href="mailto:your-email@example.com" icon={<Mail size={18} />}>
          Send email
        </Button>
      </div>
    </main>
  );
}
