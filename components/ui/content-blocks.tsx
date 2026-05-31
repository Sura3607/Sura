import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

type ContentBlocksProps = {
  value?: unknown[];
  fallback?: string;
};

export function ContentBlocks({ value, fallback }: ContentBlocksProps) {
  if (!Array.isArray(value) || value.length === 0) {
    if (!fallback) {
      return null;
    }

    return <p>{fallback}</p>;
  }

  return (
    <div className="space-y-4">
      <PortableText
        value={value as PortableTextBlock[]}
        components={{
          block: {
            normal: ({ children }) => <p>{children}</p>,
            h2: ({ children }) => (
              <h2 className="pt-4 text-2xl font-medium leading-tight text-charcoal-void">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="pt-3 text-xl font-medium leading-tight text-charcoal-void">
                {children}
              </h3>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-2 border-vivid-azure pl-4 text-fog">
                {children}
              </blockquote>
            ),
          },
          list: {
            bullet: ({ children }) => (
              <ul className="ml-5 list-disc space-y-2">{children}</ul>
            ),
            number: ({ children }) => (
              <ol className="ml-5 list-decimal space-y-2">{children}</ol>
            ),
          },
          marks: {
            link: ({ children, value }) => {
              const href = typeof value?.href === "string" ? value.href : "#";
              return (
                <a className="underline decoration-vivid-azure" href={href}>
                  {children}
                </a>
              );
            },
            code: ({ children }) => (
              <code className="rounded-[var(--radius-inputs)] border border-graphite-rail bg-cloud-canvas px-1.5 py-0.5 font-mono text-sm text-resend-violet">
                {children}
              </code>
            ),
          },
        }}
      />
    </div>
  );
}
