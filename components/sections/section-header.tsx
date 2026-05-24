type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-medium text-sky-blue">{eyebrow}</p>
      <h2 className="mt-3 text-4xl font-black leading-tight text-charcoal-void sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base font-medium leading-7 text-midnight-ink/65">
          {description}
        </p>
      ) : null}
    </div>
  );
}
