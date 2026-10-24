"use client";

import { useCallback, useSyncExternalStore } from "react";

export type ViewMode = "personal" | "recruiter";

const PARAM = "view";
const STORAGE_KEY = "phey:view-mode";
const EVENT = "phey:view-mode";

function readStorage(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeStorage(mode: ViewMode) {
  try {
    window.localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // Private mode or blocked storage: the URL still carries the choice.
  }
}

/** The URL (?view=recruiter) wins; otherwise the last choice in storage. */
function getSnapshot(): ViewMode {
  const fromUrl = new URLSearchParams(window.location.search).get(PARAM);
  if (fromUrl === "recruiter" || fromUrl === "personal") return fromUrl;
  return readStorage() === "recruiter" ? "recruiter" : "personal";
}

function getServerSnapshot(): ViewMode {
  return "personal";
}

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

/** Personal View / Recruiter Mode, synced to `?view=` and localStorage. */
export function useViewMode(): [ViewMode, (mode: ViewMode) => void] {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setMode = useCallback((next: ViewMode) => {
    const url = new URL(window.location.href);
    if (next === "recruiter") url.searchParams.set(PARAM, "recruiter");
    else url.searchParams.delete(PARAM);
    window.history.replaceState(window.history.state, "", url);
    writeStorage(next);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return [mode, setMode];
}
