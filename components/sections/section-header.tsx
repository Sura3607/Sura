type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      <p className="font-mono text-xs font-medium uppercase text-sky-blue">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-medium leading-none text-charcoal-void sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base font-normal leading-7 text-fog">
          {description}
        </p>
      ) : null}
    </div>
  );
}
