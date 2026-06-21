"use client";

import { usePathname } from "next/navigation";
import { type PropsWithChildren } from "react";

/**
 * HeaderChrome
 * Positions and themes the <header>. On the homepage (which leads with the
 * full-bleed hero) the header overlays the hero transparently with white text;
 * everywhere else it stays a normal in-flow solid bar. Matches the mockup's
 * absolute (scrolls-away) header rather than a sticky one.
 */
export default function HeaderChrome({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const overlay = pathname === "/";

  return (
    <header
      className={
        overlay
          ? "header--overlay absolute top-0 left-0 z-50 w-full bg-transparent"
          : "relative z-50 text-[var(--slate)]"
      }
    >
      {children}
    </header>
  );
}
