import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6">
      <p className="text-sm font-medium text-sky-blue">404</p>
      <h1 className="mt-4 text-5xl font-black leading-none text-charcoal-void">
        Page not found.
      </h1>
      <Link className="mt-8 font-medium underline" href="/">
        Back to home
      </Link>
    </main>
  );
}
