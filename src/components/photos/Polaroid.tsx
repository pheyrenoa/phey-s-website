"use client";

import { getPhoto } from "@/content/photos";
import { rotationFor } from "@/lib/rotation";
import { Tape } from "@/components/scrapbook/Tape";
import { PhotoFrame } from "./PhotoFrame";
import { useLightbox } from "./LightboxProvider";

type PolaroidProps = {
  photoId: string;
  className?: string;
  /** Overrides the caption from photos.ts. */
  caption?: string;
  /** Extra handwritten line shown in the lightbox. */
  annotation?: string;
  tape?: "sage" | "terracotta" | "none";
  sizes?: string;
  size?: "sm" | "md";
};

/**
 * A Polaroid frame (thick bottom margin, deterministic tilt). Clicking or
 * pressing Enter/Space opens the lightbox.
 */
export function Polaroid({
  photoId,
  className = "",
  caption,
  annotation,
  tape = "sage",
  sizes,
  size = "md",
}: PolaroidProps) {
  const { open } = useLightbox();
  const photo = getPhoto(photoId);
  const rot = rotationFor(photoId);
  const text = caption ?? photo.caption;
  const label = photo.src ? photo.alt : `Placeholder: ${photo.placeholderHint}`;

  return (
    <figure
      className={`tape-hover relative ${className}`}
      style={{ "--rot": `${rot}deg` } as React.CSSProperties}
    >
      {tape !== "none" && (
        <Tape tone={tape} className="-top-3 left-1/2 -ml-12" angle={-rot * 1.4} />
      )}
      <button
        type="button"
        onClick={(e) => open(photoId, e.currentTarget, annotation)}
        aria-label={`Open photo: ${text ?? label}`}
        className={`tilt tilt-hover block w-full cursor-zoom-in bg-paper-light text-left shadow-paper ${
          size === "sm" ? "p-2 pb-8" : "p-2.5 pb-12 sm:p-3 sm:pb-14"
        }`}
      >
        <PhotoFrame
          photoId={photoId}
          sizes={sizes}
          placeholderSize={size === "sm" ? "sm" : "md"}
        />
        {text && (
          <figcaption
            className={`absolute inset-x-2 text-center font-hand leading-none text-ink ${
              size === "sm" ? "bottom-1.5 text-lg" : "bottom-3 text-xl sm:bottom-4 sm:text-2xl"
            }`}
          >
            {text}
          </figcaption>
        )}
      </button>
    </figure>
  );
}
