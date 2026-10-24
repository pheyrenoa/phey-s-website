"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { PhotoLightbox } from "./PhotoLightbox";

type LightboxState = { photoId: string; annotation?: string } | null;

type LightboxApi = {
  open: (photoId: string, trigger: HTMLElement, annotation?: string) => void;
};

const LightboxContext = createContext<LightboxApi | null>(null);

export function useLightbox(): LightboxApi {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error("useLightbox must be used inside <LightboxProvider>");
  return ctx;
}

/** Holds the single lightbox for the page and restores focus on close. */
export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<LightboxState>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback<LightboxApi["open"]>((photoId, trigger, annotation) => {
    triggerRef.current = trigger;
    setState({ photoId, annotation });
  }, []);

  const close = useCallback(() => {
    setState(null);
    // Wait a frame so the dialog is gone before focus moves back.
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      <PhotoLightbox state={state} onClose={close} />
    </LightboxContext.Provider>
  );
}
