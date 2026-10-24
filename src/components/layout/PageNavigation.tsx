"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import type { SectionId } from "@/lib/types";
import { useActiveSection } from "./ActiveSectionProvider";
import { ProgressIndicator } from "./ProgressIndicator";

/** Album-style footer for each page: previous / page number / next. */
export function PageNavigation({ id }: { id: SectionId }) {
  const { turnTo } = useActiveSection();
  const index = site.sections.findIndex((s) => s.id === id);
  const prev = site.sections[index - 1];
  const next = site.sections[index + 1];
  const total = site.sections.length;

  const link =
    "group inline-flex min-h-11 items-center gap-2 border border-brown/30 bg-paper-light px-3 py-2 text-sm text-ink shadow-paper transition-colors hover:border-forest hover:text-forest sm:px-4";

  return (
    <nav
      aria-label={`Page ${index + 1} navigation`}
      className="mt-16 grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-t border-dashed border-brown/40 pt-6 print:hidden"
    >
      <div>
        {prev && (
          <a href={`#${prev.id}`} onClick={() => turnTo(prev.id, -1)} className={link}>
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
            <span className="sr-only">Previous page: </span>
            <span className="hidden sm:inline">{prev.label}</span>
            <span className="sm:hidden" aria-hidden="true">Prev</span>
          </a>
        )}
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <p className="font-hand text-2xl leading-none text-ink">
          page {index + 1} of {total}
        </p>
        <ProgressIndicator />
      </div>
      <div className="flex justify-end">
        {next ? (
          <a href={`#${next.id}`} onClick={() => turnTo(next.id, 1)} className={link}>
            <span className="sr-only">Next page: </span>
            <span className="hidden sm:inline">{next.label}</span>
            <span className="sm:hidden" aria-hidden="true">Next</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        ) : (
          <a href="#who" onClick={() => turnTo("who", -1)} className={link}>
            <span className="font-hand text-lg leading-none">
              <span className="hidden sm:inline">the end · </span>back to page 1
            </span>
          </a>
        )}
      </div>
    </nav>
  );
}
