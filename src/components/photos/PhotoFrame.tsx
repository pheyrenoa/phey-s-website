import Image from "next/image";
import { getPhoto } from "@/content/photos";
import type { PhotoAspect } from "@/lib/types";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

export const aspectClass: Record<PhotoAspect, string> = {
  polaroid: "aspect-square",
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
};

type PhotoFrameProps = {
  photoId: string;
  /** Override the registry aspect (e.g. postcards are always landscape). */
  aspect?: PhotoAspect;
  /** `sizes` for next/image; describe how wide the slot renders. */
  sizes?: string;
  placeholderSize?: "sm" | "md" | "lg";
  className?: string;
};

/** The photo itself (or its placeholder) at the right aspect ratio. */
export function PhotoFrame({
  photoId,
  aspect,
  sizes = "(max-width: 768px) 90vw, 360px",
  placeholderSize = "md",
  className = "",
}: PhotoFrameProps) {
  const photo = getPhoto(photoId);
  return (
    <div className={`relative w-full overflow-hidden ${aspectClass[aspect ?? photo.aspect]} ${className}`}>
      {photo.src ? (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          placeholder="empty"
          className="object-cover"
        />
      ) : (
        <PhotoPlaceholder hint={photo.placeholderHint} size={placeholderSize} />
      )}
    </div>
  );
}
