/** An inline-SVG paper clip; position it with className. */
export function PaperClip({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 64"
      className={`pointer-events-none absolute z-10 h-16 w-6 text-brown ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M8 18v30a5 5 0 0 0 10 0V12a8 8 0 0 0-16 0v38a10 10 0 0 0 20 0V22" />
    </svg>
  );
}
