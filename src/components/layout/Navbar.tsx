"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { rotationFor } from "@/lib/rotation";
import { useActiveSection } from "./ActiveSectionProvider";

/** Sticky row of paper index tabs. Scrolls sideways on small screens. */
export function Navbar() {
  const { active } = useActiveSection();
  const rowRef = useRef<HTMLUListElement>(null);

  // Keep the active tab visible in the mobile row without moving the page.
  useEffect(() => {
    const row = rowRef.current;
    const tab = row?.querySelector<HTMLElement>(`[data-section="${active}"]`);
    if (!row || !tab || row.scrollWidth <= row.clientWidth) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    row.scrollTo({
      left: tab.offsetLeft - (row.clientWidth - tab.offsetWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [active]);

  return (
    <header className="sticky top-0 z-50 h-14 border-b border-brown/25 bg-paper/95 backdrop-blur-[2px] print:hidden">
      <nav aria-label="Scrapbook pages" className="mx-auto flex h-full max-w-6xl items-end px-2 sm:px-6">
        <a
          href="#who"
          className="mb-3 mr-4 hidden shrink-0 font-hand text-2xl leading-none text-forest lg:block"
        >
          Phey&apos;s scrapbook
        </a>
        <ul
          ref={rowRef}
          className="no-scrollbar flex h-full flex-1 items-end gap-1.5 overflow-x-auto overflow-y-hidden whitespace-nowrap px-1 sm:gap-3 lg:justify-end"
        >
          {site.sections.map((s, i) => {
            const isActive = active === s.id;
            const rot = rotationFor(`nav-${s.id}`, 0.5, 1.5);
            return (
              <li key={s.id} data-section={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative block border border-b-0 px-3 pb-2 pt-2.5 text-[0.82rem] font-medium tracking-wide transition-[translate,background-color,color] duration-200 sm:px-4 sm:text-sm ${
                    isActive
                      ? "translate-y-0 border-forest bg-forest text-paper-light shadow-paper"
                      : "translate-y-1 border-brown/30 bg-paper-light text-ink hover:translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--sage)_30%,var(--paper-light))]"
                  }`}
                  style={{ rotate: `${rot}deg` }}
                >
                  <span
                    aria-hidden="true"
                    className={`mr-1.5 font-hand text-base ${isActive ? "text-paper-light" : "text-brown"}`}
                  >
                    {i + 1}
                  </span>
                  {s.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
