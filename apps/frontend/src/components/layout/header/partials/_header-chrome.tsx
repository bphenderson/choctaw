"use client";

import { usePathname } from "next/navigation";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";

// Runs before paint on the client (so the header's top is measured without a
// flash) and falls back to useEffect during SSR to avoid the React warning.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * HeaderChrome
 * Positions and themes the <header>.
 *
 * Homepage (leads with the full-bleed hero): a `fixed`, scroll-aware overlay.
 * It starts transparent with white chrome over the hero, then flips to a solid
 * cream bar with dark chrome once scrolled (~24px). Its `top` tracks the bottom
 * of the notice bar, so the notice bar scrolls away while the header pins to 0.
 *
 * Other pages: a plain solid `sticky` bar (no hero to overlay).
 */
export default function HeaderChrome({
  children,
  locale,
}: PropsWithChildren<{ locale?: string }>) {
  const pathname = usePathname();
  // The homepage is served locale-prefixed (e.g. "/en"), never bare "/", so
  // match both the root and the "/{locale}" form for the transparent hero
  // overlay. Fall back to a locale-shaped single segment (e.g. "/en", "/en-US")
  // when no explicit locale is passed; that pattern excludes real top-level
  // routes like "/search" and "/preview".
  const overlay =
    pathname === "/" ||
    (!!locale && pathname === `/${locale}`) ||
    /^\/[a-z]{2}(-[a-z]{2})?\/?$/i.test(pathname);

  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [top, setTop] = useState(0);

  useIsomorphicLayoutEffect(() => {
    if (!overlay) return;
    const headerEl = ref.current;
    // The notice bar (when present) is the header's previous sibling.
    const noticeEl = headerEl?.previousElementSibling as HTMLElement | null;
    let raf = 0;
    const update = () => {
      raf = 0;
      const noticeH = noticeEl ? noticeEl.getBoundingClientRect().height : 0;
      const y = window.scrollY;
      setTop(Math.max(0, noticeH - y)); // slide up in lockstep with the notice bar
      setScrolled(y > 24);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [overlay]);

  if (overlay) {
    return (
      <header
        ref={ref}
        style={{ top }}
        className={`fixed left-0 z-50 w-full transition-colors duration-300 ${
          scrolled
            ? "bg-cream text-[var(--slate)] shadow-[0_1px_0_rgba(0,0,0,0.08)]"
            : "header--overlay bg-transparent"
        }`}
      >
        {children}
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-cream text-[var(--slate)] shadow-[0_1px_0_rgba(0,0,0,0.08)]">
      {children}
    </header>
  );
}
