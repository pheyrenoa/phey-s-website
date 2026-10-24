"use client";

import { useRef } from "react";
import type { ViewMode } from "./useViewMode";

const options: { value: ViewMode; label: string; hint: string }[] = [
  { value: "personal", label: "Personal View", hint: "the scrapbook version" },
  { value: "recruiter", label: "Recruiter Mode", hint: "just the résumé" },
];

type Props = { mode: ViewMode; onChange: (mode: ViewMode) => void };

/** Two-position paper switch. Arrow keys move between options (radiogroup). */
export function RecruiterModeToggle({ mode, onChange }: Props) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    let next = index;
    if (e.key === "Home") next = 0;
    else if (e.key === "End") next = options.length - 1;
    else next = (index + (e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 1) + options.length) % options.length;
    onChange(options[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label="How to view this page"
      className="inline-flex border border-brown/40 bg-paper-light p-1 shadow-paper"
    >
      {options.map((opt, i) => {
        const checked = mode === opt.value;
        return (
          <button
            key={opt.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            aria-label={opt.label}
            tabIndex={checked ? 0 : -1}
            onClick={() => onChange(opt.value)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`flex min-h-12 flex-col items-start px-4 py-1.5 text-left transition-colors duration-200 sm:px-5 ${
              checked ? "bg-forest text-paper-light shadow-paper" : "text-ink hover:bg-paper"
            }`}
          >
            <span className="text-sm font-semibold tracking-wide">{opt.label}</span>
            <span className={`font-hand text-lg leading-none ${checked ? "text-paper-light" : "text-brown"}`}>
              {opt.hint}
            </span>
          </button>
        );
      })}
    </div>
  );
}
