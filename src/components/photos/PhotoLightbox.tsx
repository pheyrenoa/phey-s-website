"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { getPhoto } from "@/content/photos";
import { PhotoFrame } from "./PhotoFrame";

type PhotoLightboxProps = {
  state: { photoId: string; annotation?: string } | null;
  onClose: () => void;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/** Modal photo viewer: Esc / close button / backdrop close; focus is trapped. */
export function PhotoLightbox({ state, onClose }: PhotoLightboxProps) {
  const reduce = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = state !== null;

  // Body scroll lock + initial focus
  useEffect(() => {
    if (!isOpen) return;
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [isOpen]);

  // Esc to close, Tab cycles inside the dialog
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const nodes = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !dialogRef.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !dialogRef.current.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const photo = state ? getPhoto(state.photoId) : null;
  const caption = photo?.caption ?? photo?.placeholderHint;
  const fast = reduce ? { duration: 0 } : { duration: 0.2 };

  return (
    <AnimatePresence>
      {state && photo && (
        <motion.div
          key="lightbox"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/75 p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={fast}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-caption"
            className="paper-card relative w-full max-w-[min(92vw,640px)] p-3 pb-5 sm:p-5 sm:pb-6"
            initial={{ scale: 0.96, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.98, y: 6 }}
            transition={fast}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close photo"
              className="absolute -right-3 -top-3 z-20 grid h-10 w-10 place-items-center rounded-full bg-forest text-paper-light shadow-paper hover:bg-ink"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="max-h-[70vh] overflow-hidden">
              <PhotoFrame
                photoId={photo.id}
                sizes="(max-width: 700px) 92vw, 640px"
                placeholderSize="lg"
                className="max-h-[70vh]"
              />
            </div>
            <p id="lightbox-caption" className="mt-4 text-center font-hand text-3xl text-ink">
              {caption}
            </p>
            {state.annotation && (
              <p className="mt-1 text-center font-hand text-2xl text-brown">{state.annotation}</p>
            )}
            {!photo.src && (
              <p className="mt-2 text-center text-xs uppercase tracking-[0.18em] text-brown">
                Photo coming soon
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
