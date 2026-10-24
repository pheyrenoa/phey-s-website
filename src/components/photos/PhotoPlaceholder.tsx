import { Doodle } from "@/components/scrapbook/Doodle";

type PhotoPlaceholderProps = {
  hint: string;
  /** Larger type for the lightbox. */
  size?: "sm" | "md" | "lg";
};

/**
 * Stands in for a photo that hasn't been added yet. Fills its parent (the
 * parent sets the aspect ratio) so layouts look intentional, not broken.
 */
export function PhotoPlaceholder({ hint, size = "md" }: PhotoPlaceholderProps) {
  const text = { sm: "text-base", md: "text-lg", lg: "text-3xl" }[size];
  const icon = { sm: "h-7 w-7", md: "h-9 w-9", lg: "h-16 w-16" }[size];
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-1.5 overflow-hidden bg-[color-mix(in_srgb,var(--sage)_30%,var(--paper-light))] p-3 text-center">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-multiply [background-image:var(--grain)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-2 border border-dashed border-brown/40"
      />
      <Doodle name="camera" tone="forest" className={`${icon} opacity-70`} />
      <span className={`relative font-hand leading-tight text-ink ${text}`}>{hint}</span>
      <span className="relative font-sans text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-forest">
        add photo here
      </span>
    </div>
  );
}
