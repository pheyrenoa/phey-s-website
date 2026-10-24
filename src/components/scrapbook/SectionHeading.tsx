type SectionHeadingProps = {
  id: string;
  title: string;
  kicker?: string;
  intro?: string;
  align?: "left" | "center";
};

/** The h2 for a scrapbook page with a handwritten kicker above it. */
export function SectionHeading({ id, title, kicker, intro, align = "left" }: SectionHeadingProps) {
  const center = align === "center";
  return (
    <div className={`mb-10 md:mb-14 ${center ? "text-center" : ""}`}>
      {kicker && (
        <p className="font-hand text-[1.7rem] leading-none text-terracotta" aria-hidden="true">
          {kicker}
        </p>
      )}
      <h2
        id={id}
        className="font-serif text-5xl leading-[0.95] tracking-tight text-forest sm:text-6xl md:text-7xl"
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 max-w-[60ch] text-lg text-ink ${center ? "mx-auto" : ""}`}>{intro}</p>
      )}
    </div>
  );
}
