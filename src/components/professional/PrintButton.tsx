"use client";

export function PrintButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex min-h-11 items-center gap-2 border border-ink/40 px-4 text-sm font-semibold text-ink hover:border-forest hover:text-forest"
    >
      {children}
    </button>
  );
}
