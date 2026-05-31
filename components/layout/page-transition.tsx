"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type PageTransitionProps = {
  children: React.ReactNode;
};

function shouldSkipTransition(event: MouseEvent, anchor: HTMLAnchorElement, pathname: string) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    anchor.target ||
    anchor.hasAttribute("download") ||
    pathname.startsWith("/admin")
  ) {
    return true;
  }

  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return true;
  }

  const url = new URL(anchor.href);
  const current = new URL(window.location.href);

  if (url.pathname === current.pathname && url.search === current.search && url.hash !== current.hash) {
    return true;
  }

  return (
    url.origin !== current.origin ||
    url.pathname.startsWith("/admin") ||
    (url.pathname === current.pathname && url.search === current.search && url.hash === current.hash)
  );
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const router = useRouter();
  const timeoutRef = useRef<number | null>(null);
  const isNavigatingRef = useRef(false);
  const [phase, setPhase] = useState<"idle" | "leaving" | "entering">("entering");

  useEffect(() => {
    isNavigatingRef.current = false;
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const frame = window.requestAnimationFrame(() => setPhase("entering"));
    const timeout = window.setTimeout(() => setPhase("idle"), 320);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor || shouldSkipTransition(event, anchor, pathname)) {
        return;
      }

      event.preventDefault();
      const url = new URL(anchor.href);
      const destination = `${url.pathname}${url.search}${url.hash}`;

      if (isNavigatingRef.current) {
        return;
      }

      isNavigatingRef.current = true;
      setPhase("leaving");

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        router.push(destination);
      }, 32);
    }

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [pathname, router]);

  return (
    <>
      <div aria-hidden="true" className={`route-progress ${phase !== "idle" ? "active" : ""}`} />
      <div className={`route-shell route-shell-${phase}`}>{children}</div>
    </>
  );
}
