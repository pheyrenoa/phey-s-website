import { ArrowDownRight } from "lucide-react";
import { Polaroid } from "@/components/photos/Polaroid";
import { PaperClip } from "@/components/scrapbook/PaperClip";
import { Tape } from "@/components/scrapbook/Tape";
import { rotationFor } from "@/lib/rotation";
import type { Chapter } from "@/lib/types";

type ChapterCardProps = {
  chapter: Chapter;
  /** Alternates the look so the spread doesn't feel like a card grid. */
  variant: "notebook" | "index" | "sticky" | "ticket";
};

const surface = {
  notebook: "paper-card ruled",
  index: "paper-card grid-paper",
  sticky: "bg-[color-mix(in_srgb,var(--sage)_32%,var(--paper-light))] shadow-paper",
  ticket: "paper-card border-l-4 border-dashed border-l-terracotta/60",
} as const;

/** A "current chapter" diary entry with a clipped Polaroid. */
export function ChapterCard({ chapter, variant }: ChapterCardProps) {
  const rot = rotationFor(`chapter-${chapter.id}`, 0.4, 1.4);
  return (
    <article
      className={`tilt relative flex h-full flex-col gap-5 p-5 pt-7 sm:flex-row sm:p-6 sm:pt-8 ${surface[variant]}`}
      style={{ "--rot": `${rot}deg` } as React.CSSProperties}
      aria-labelledby={`chapter-${chapter.id}`}
    >
      {variant === "notebook" ? (
        <PaperClip className="-top-5 right-10" />
      ) : (
        <Tape className="-top-3 left-8" tone={variant === "ticket" ? "terracotta" : "sage"} angle={-4} />
      )}
      <div className="min-w-0 flex-1">
        {chapter.tag && (
          <p className="font-hand text-2xl leading-none text-terracotta" aria-hidden="true">
            {chapter.tag}
          </p>
        )}
        <h3 id={`chapter-${chapter.id}`} className="mt-1 font-serif text-3xl leading-tight text-forest">
          {chapter.title}
        </h3>
        <ul className="mt-3 space-y-2 text-[0.98rem] leading-6 text-ink">
          {chapter.items.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true" className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rotate-45 bg-forest/70" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {chapter.link && (
          <a
            href={chapter.link.href}
            className="mt-4 inline-flex min-h-11 items-center gap-1.5 border-b-2 border-terracotta/70 font-hand text-2xl leading-none text-forest hover:border-forest"
          >
            {chapter.link.label}
            <ArrowDownRight className="h-5 w-5" aria-hidden="true" />
          </a>
        )}
      </div>
      {chapter.photoId && (
        <div className="w-40 shrink-0 self-center sm:w-36 sm:self-start">
          <Polaroid photoId={chapter.photoId} size="sm" tape="none" sizes="160px" />
        </div>
      )}
    </article>
  );
}
