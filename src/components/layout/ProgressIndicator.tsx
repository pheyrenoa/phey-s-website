"use client";

import { site } from "@/content/site";
import { useActiveSection } from "./ActiveSectionProvider";

/** Four little dots on a bookmark ribbon, one per page. */
export function ProgressIndicator() {
  const { active } = useActiveSection();
  const index = site.sections.findIndex((s) => s.id === active);
  return (
    <div
      className="flex items-center gap-2"
      role="img"
      aria-label={`Reading page ${index + 1} of ${site.sections.length}`}
    >
      {site.sections.map((s, i) => (
        <span
          key={s.id}
          className={`block h-2.5 w-2.5 rotate-45 border border-forest transition-colors duration-200 ${
            i === index ? "bg-forest" : i < index ? "bg-sage" : "bg-transparent"
          }`}
        />
      ))}
    </div>
  );
}
