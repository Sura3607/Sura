import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  title: string;
  description: string;
  href?: string;
  action?: string;
};

export function EmptyState({ title, description, href, action }: EmptyStateProps) {
  return (
    <div className="rounded-[var(--radius-cards)] border border-midnight-ink/10 bg-vapor-gray p-6">
      <p className="text-xl font-medium leading-7 text-charcoal-void">{title}</p>
      <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-midnight-ink/65">
        {description}
      </p>
      {href && action ? (
        <div className="mt-5">
          <Button href={href} icon={<ArrowRight size={17} />} size="sm">
            {action}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
