import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-64px)] max-w-3xl flex-col justify-center px-6 py-16">
      <p className="font-mono text-sm font-medium text-sky-blue">404</p>
      <h1 className="mt-4 text-5xl font-medium leading-none text-charcoal-void sm:text-6xl">
        Page not found.
      </h1>
      <p className="mt-5 text-base font-normal leading-7 text-fog">
        The page may have moved, or the matching Sanity document has not been published yet.
      </p>
      <Link
        className="mt-8 inline-flex w-fit items-center gap-2 rounded-[var(--radius-buttons)] border border-vivid-azure px-4 py-3 text-sm font-medium text-charcoal-void"
        href="/"
      >
        <ArrowLeft size={17} />
        Back to home
      </Link>
    </main>
  );
}
