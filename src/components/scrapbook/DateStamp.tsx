type DateStampProps = {
  /** null renders a visible TODO. */
  date: string | null;
  location?: string | null;
  className?: string;
  angle?: number;
};

/** Rubber-stamp style date and location label. */
export function DateStamp({ date, location, className = "", angle = -4 }: DateStampProps) {
  return (
    <span
      className={`inline-flex flex-col items-center border-2 border-double border-forest/70 px-2.5 py-1 font-sans text-[0.68rem] font-semibold uppercase leading-tight tracking-[0.14em] text-forest ${className}`}
      style={{ rotate: `${angle}deg` }}
    >
      <span>{date ?? "TODO: add date"}</span>
      {location !== undefined && (
        <span className="font-normal normal-case tracking-[0.06em]">
          {location ?? "TODO: add location"}
        </span>
      )}
    </span>
  );
}
