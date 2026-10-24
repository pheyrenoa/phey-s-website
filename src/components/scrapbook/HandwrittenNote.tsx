import { rotationFor } from "@/lib/rotation";
import { Tape } from "./Tape";

type HandwrittenNoteProps = {
  id: string;
  children: React.ReactNode;
  color?: "paper" | "sage" | "terracotta";
  className?: string;
  /** "sticky" = square note with tape; "scrap" = torn paper strip. */
  variant?: "sticky" | "scrap";
};

const bg = {
  paper: "bg-paper-light",
  // Palette tints mixed into paper-light so text keeps AA contrast
  sage: "bg-[color-mix(in_srgb,var(--sage)_35%,var(--paper-light))]",
  terracotta: "bg-[color-mix(in_srgb,var(--terracotta)_22%,var(--paper-light))]",
} as const;

/** A sticky note or paper scrap with handwritten text. */
export function HandwrittenNote({
  id,
  children,
  color = "paper",
  className = "",
  variant = "sticky",
}: HandwrittenNoteProps) {
  const rot = rotationFor(id, 1, 3.5);
  return (
    <div
      className={`tilt relative font-hand text-ink shadow-paper ${bg[color]} ${
        variant === "sticky" ? "p-4 pt-5 text-[1.45rem] leading-7" : "px-4 py-2 text-xl"
      } ${className}`}
      style={{ "--rot": `${rot}deg` } as React.CSSProperties}
    >
      {variant === "sticky" && (
        <Tape className="-top-3 left-1/2 -translate-x-1/2" angle={rot * -1.5} />
      )}
      {children}
    </div>
  );
}
