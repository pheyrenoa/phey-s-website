"use client";

import { useAnimate, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { PageNavigation } from "@/components/layout/PageNavigation";
import { useActiveSection } from "@/components/layout/ActiveSectionProvider";
import type { SectionId } from "@/lib/types";

type ScrapbookPageProps = {
  id: SectionId;
  /** id of the page's h2, for aria-labelledby */
  labelledBy: string;
  children: React.ReactNode;
  className?: string;
  /** Hidden when printing (everything except the résumé). */
  printHidden?: boolean;
};

/** One page of the album: a <section> plus prev/next controls. */
export function ScrapbookPage({
  id,
  labelledBy,
  children,
  className = "",
  printHidden = true,
}: ScrapbookPageProps) {
  const { turn } = useActiveSection();
  const reduce = useReducedMotion();
  const [scope, animate] = useAnimate<HTMLDivElement>();

  // Subtle page-turn when arriving here via prev/next (≤ 400ms).
  useEffect(() => {
    if (!turn || turn.id !== id || reduce || !scope.current) return;
    animate(
      scope.current,
      {
        transformPerspective: 1400,
        opacity: [0.35, 1],
        x: [turn.direction * 28, 0],
        rotateY: [turn.direction * -5, 0],
      },
      { duration: 0.38, ease: [0.25, 0.8, 0.3, 1] },
    );
  }, [turn, id, reduce, animate, scope]);

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative border-b border-brown/20 py-16 md:py-24 ${
        printHidden ? "print:hidden" : "print:border-0 print:py-0"
      } ${className}`}
    >
      <div
        ref={scope}
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 print:px-0"
      >
        {children}
        <PageNavigation id={id} />
      </div>
    </section>
  );
}
