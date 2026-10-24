"use client";

import { Expand, RotateCw } from "lucide-react";
import { useState } from "react";
import { PhotoFrame } from "@/components/photos/PhotoFrame";
import { Polaroid } from "@/components/photos/Polaroid";
import { useLightbox } from "@/components/photos/LightboxProvider";
import { DateStamp } from "@/components/scrapbook/DateStamp";
import { FlipCard } from "@/components/scrapbook/FlipCard";
import { rotationFor } from "@/lib/rotation";
import type { AdventureEntry as Entry } from "@/lib/types";

/**
 * An adventure as a postcard: the front is a photo, the back holds the
 * caption, date, and location. Extra photos sit beside it as Polaroids.
 */
export function AdventureEntry({ entry, index }: { entry: Entry; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const { open } = useLightbox();
  const [front, ...extras] = entry.photoIds;
  const rot = rotationFor(`postcard-${entry.id}`, 0.6, 2);
  const titleId = `adventure-${entry.id}`;
  const reverse = index % 2 === 1;

  return (
    <article
      aria-labelledby={titleId}
      className={`flex flex-col items-center gap-6 sm:flex-row sm:items-start ${reverse ? "sm:flex-row-reverse" : ""}`}
    >
      <div
        className="tilt w-full max-w-md flex-1"
        style={{ "--rot": `${rot}deg` } as React.CSSProperties}
      >
        <FlipCard
          flipped={flipped}
          front={
            <button
              type="button"
              onClick={() => setFlipped(true)}
              aria-label={`${entry.title}: turn the postcard over`}
              className="group block w-full bg-paper-light p-2.5 text-left shadow-paper"
            >
              <PhotoFrame photoId={front} aspect="landscape" sizes="(max-width: 640px) 90vw, 440px" />
              <span className="flex items-center justify-between gap-3 px-1 pt-2.5">
                <span id={titleId} className="font-serif text-xl leading-tight text-forest sm:text-2xl">
                  {entry.title}
                </span>
                <RotateCw className="h-4 w-4 shrink-0 text-brown transition-transform group-hover:rotate-45" aria-hidden="true" />
              </span>
            </button>
          }
          back={
            <div className="paper-card flex h-full flex-col p-4 sm:p-5">
              <div className="grid flex-1 grid-cols-[1fr_auto] gap-4">
                <div className="border-r border-brown/30 pr-4">
                  <p className="font-serif text-xl leading-tight text-forest">{entry.title}</p>
                  {entry.caption ? (
                    <p className="mt-2 font-hand text-2xl leading-7 text-ink">{entry.caption}</p>
                  ) : (
                    <p className="mt-2 font-hand text-xl leading-6 text-brown">TODO: add your caption</p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-3">
                  <span
                    aria-hidden="true"
                    className="grid h-14 w-12 place-items-center border-2 border-dotted border-terracotta/70 font-hand text-sm leading-none text-terracotta"
                  >
                    stamp
                  </span>
                  <DateStamp date={entry.date} location={entry.location} angle={-6} />
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setFlipped(false)}
                  className="inline-flex min-h-10 items-center gap-1.5 border border-brown/40 px-3 text-sm text-ink hover:border-forest hover:text-forest"
                >
                  <RotateCw className="h-4 w-4" aria-hidden="true" /> Turn back over
                </button>
                <button
                  type="button"
                  onClick={(e) => open(front, e.currentTarget)}
                  className="inline-flex min-h-10 items-center gap-1.5 border border-brown/40 px-3 text-sm text-ink hover:border-forest hover:text-forest"
                >
                  <Expand className="h-4 w-4" aria-hidden="true" /> View photo
                </button>
              </div>
            </div>
          }
        />
      </div>
      {extras.length > 0 && (
        <div className="flex w-full max-w-[13rem] gap-4 sm:mt-8 sm:w-44 sm:flex-col">
          {extras.map((id) => (
            <Polaroid key={id} photoId={id} size="sm" sizes="180px" />
          ))}
        </div>
      )}
    </article>
  );
}
