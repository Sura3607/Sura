import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  narrow?: boolean;
};

export function PageShell({ children, narrow = false }: PageShellProps) {
  return (
    <main
      className={`mx-auto w-full px-6 py-16 sm:px-8 lg:px-10 ${
        narrow ? "max-w-5xl" : "max-w-7xl"
      }`}
    >
      {children}
    </main>
  );
}
