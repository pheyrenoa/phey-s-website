"use client";

import { Undo2 } from "lucide-react";
import { useState } from "react";
import { getPhoto } from "@/content/photos";
import { PhotoFrame } from "@/components/photos/PhotoFrame";
import { FlipCard } from "@/components/scrapbook/FlipCard";
import { rotationFor } from "@/lib/rotation";
import type { Keepsake } from "@/lib/types";
import { KeepsakeArt } from "./KeepsakeArt";

/** One object in the drawer. Click / Enter / Space flips it to its story. */
export function KeepsakeItem({ item }: { item: Keepsake }) {
  const [flipped, setFlipped] = useState(false);
  const rot = rotationFor(`keepsake-${item.id}`, 1, 5);
  const hasPhoto = item.photoId ? getPhoto(item.photoId).src !== null : false;

  return (
    <li className="h-full shadow-[inset_0_0_0_1px_rgb(128_109_89/0.35)]">
      <FlipCard
        flipped={flipped}
        className="h-full"
        front={
          <button
            type="button"
            onClick={() => setFlipped(true)}
            aria-label={`${item.label}${item.isPlaceholder ? " (sample)" : ""}: read its story`}
            className="group relative flex h-full min-h-[11.5rem] w-full flex-col items-center justify-center gap-2 p-3 text-center"
          >
            <span
              className="tilt tilt-hover block w-full max-w-[9rem]"
              style={{ "--rot": `${rot}deg` } as React.CSSProperties}
            >
              {hasPhoto && item.photoId ? (
                <span className="block bg-paper-light p-1.5 shadow-paper">
                  <PhotoFrame photoId={item.photoId} aspect="square" sizes="144px" placeholderSize="sm" />
                </span>
              ) : (
                <KeepsakeArt kind={item.kind} className="w-full drop-shadow-[0_3px_3px_rgb(55_52_47/0.2)]" />
              )}
            </span>
            <span className="font-hand text-xl leading-none text-ink">{item.label}</span>
            {item.isPlaceholder && (
              <span
                aria-hidden="true"
                className="absolute right-2 top-2 rotate-6 border border-terracotta px-1.5 py-0.5 font-sans text-[0.6rem] font-bold uppercase tracking-[0.2em] text-ink"
              >
                sample
              </span>
            )}
          </button>
        }
        back={
          <div className="paper-card ruled flex h-full min-h-[11.5rem] flex-col p-3.5 text-left">
            <p className="font-serif text-xl leading-tight text-forest">{item.label}</p>
            {item.caption && <p className="mt-1 text-sm leading-5 text-ink">{item.caption}</p>}
            {item.origin && (
              <p className="mt-1 text-sm leading-5 text-ink">
                <span className="font-semibold">From:</span> {item.origin}
              </p>
            )}
            <p className="mt-1.5 flex-1 font-hand text-xl leading-6 text-ink">
              {item.story ?? "Story coming soon."}
            </p>
            <button
              type="button"
              onClick={() => setFlipped(false)}
              className="mt-2 inline-flex min-h-9 items-center gap-1.5 self-start border border-brown/40 bg-paper-light px-2.5 text-xs text-ink hover:border-forest hover:text-forest"
            >
              <Undo2 className="h-3.5 w-3.5" aria-hidden="true" /> Put it back
            </button>
          </div>
        }
      />
    </li>
  );
}
