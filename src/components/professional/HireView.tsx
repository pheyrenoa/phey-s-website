"use client";

import { useEffect } from "react";
import { RecruiterModeToggle } from "./RecruiterModeToggle";
import { useViewMode } from "./useViewMode";

type HireViewProps = {
  personal: React.ReactNode;
  recruiter: React.ReactNode;
};

/**
 * Switches between the two views. The résumé is always in the DOM so it
 * can be printed from either view; on screen only the chosen view shows.
 */
export function HireView({ personal, recruiter }: HireViewProps) {
  const [mode, setMode] = useViewMode();

  // A shared ?view=recruiter link with no #hash should land on the résumé.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("view") === "recruiter" && !window.location.hash) {
      document.getElementById("hire")?.scrollIntoView({ behavior: "instant" });
    }
  }, []);

  return (
    <>
      <div className="mb-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <RecruiterModeToggle mode={mode} onChange={setMode} />
        <p className="font-hand text-xl text-ink" aria-live="polite">
          {mode === "recruiter"
            ? "Clean and simple. Share this view with ?view=recruiter"
            : "Switch to Recruiter Mode for the plain résumé."}
        </p>
      </div>
      <div className={mode === "personal" ? "print:hidden" : "hidden"}>{personal}</div>
      <div className={mode === "recruiter" ? "" : "hidden print:block"}>{recruiter}</div>
    </>
  );
}
