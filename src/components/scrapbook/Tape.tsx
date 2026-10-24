type TapeProps = {
  className?: string;
  tone?: "sage" | "terracotta";
  /** Degrees; tape is usually a little crooked. */
  angle?: number;
};

/** A strip of semi-transparent masking tape with torn ends. */
export function Tape({ className = "", tone = "sage", angle = -3 }: TapeProps) {
  const color = tone === "sage" ? "bg-sage/60" : "bg-terracotta/45";
  return (
    <span
      aria-hidden="true"
      className={`tape pointer-events-none absolute z-10 block h-6 w-24 opacity-90 ${color} ${className}`}
      style={{ rotate: `${angle}deg` }}
    />
  );
}
