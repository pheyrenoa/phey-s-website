"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { site } from "@/content/site";
import type { SectionId } from "@/lib/types";

type Turn = { id: SectionId; direction: 1 | -1; key: number } | null;

type ActiveSectionApi = {
  active: SectionId;
  /** Last prev/next "page turn", used for the turn animation. */
  turn: Turn;
  turnTo: (id: SectionId, direction: 1 | -1) => void;
};

const ActiveSectionContext = createContext<ActiveSectionApi | null>(null);

export function useActiveSection(): ActiveSectionApi {
  const ctx = useContext(ActiveSectionContext);
  if (!ctx) throw new Error("useActiveSection must be used inside <ActiveSectionProvider>");
  return ctx;
}

/**
 * Tracks which page of the album is in view. A section is "active" when it
 * crosses a thin band ~40% down the viewport, so the top nav and the
 * prev/next controls always agree.
 */
export function ActiveSectionProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<SectionId>(site.sections[0].id);
  const [turn, setTurn] = useState<Turn>(null);

  // Smooth in-page scrolling, enabled only once the initial jump is done.
  useEffect(() => {
    const id = requestAnimationFrame(() =>
      document.documentElement.setAttribute("data-smooth-scroll", ""),
    );
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const els = site.sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // Pick the last section (in page order) touching the band.
        const current = [...site.sections].reverse().find((s) => visible.has(s.id));
        if (current) setActive(current.id);
      },
      { rootMargin: "-40% 0px -59% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const turnTo = useCallback((id: SectionId, direction: 1 | -1) => {
    setTurn((t) => ({ id, direction, key: (t?.key ?? 0) + 1 }));
  }, []);

  return (
    <ActiveSectionContext.Provider value={{ active, turn, turnTo }}>
      {children}
    </ActiveSectionContext.Provider>
  );
}
