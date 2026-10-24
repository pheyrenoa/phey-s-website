import type { DoodleName } from "@/lib/types";

type DoodleProps = {
  name: DoodleName;
  className?: string;
  /** Stroke color token; defaults to brown. */
  tone?: "brown" | "terracotta" | "forest" | "ink";
};

const toneClass = {
  brown: "text-brown",
  terracotta: "text-terracotta",
  forest: "text-forest",
  ink: "text-ink",
} as const;

// Hand-drawn style line icons. Always decorative.
const paths: Record<DoodleName, React.ReactNode> = {
  "dance-shoe": (
    <>
      <path d="M8 34c6-1 12-4 17-9 3-3 7-4 10-1 2 2 2 6-1 8l-6 4c-2 1-2 3 0 3h12c3 0 4 3 2 5H10c-3 0-4-3-3-5z" />
      <path d="M25 25c-3-6-2-13 3-17M33 22c1-6 5-10 10-11" />
      <path d="M34 44v5" />
    </>
  ),
  whisk: (
    <>
      <path d="M24 30 13 50M14 50l4 2" />
      <path d="M25 30c-8-6-10-18-4-23 6-4 14 2 14 11 0 6-5 10-10 12z" />
      <path d="M26 29c-2-7 0-16 4-20M25 30c3-6 9-11 10-12" />
    </>
  ),
  mountain: (
    <>
      <path d="M4 48 20 20l8 12 6-8 14 24z" />
      <path d="M16 27l4 3 3-3M40 12a4 4 0 1 0 0.1 0" />
    </>
  ),
  pan: (
    <>
      <ellipse cx="22" cy="30" rx="16" ry="9" />
      <path d="M37 28h12c2 0 2 4 0 4H37" />
      <path d="M16 16c0-3 3-3 3-6M23 17c0-3 3-3 3-6" />
    </>
  ),
  compass: (
    <>
      <circle cx="26" cy="28" r="18" />
      <path d="m20 34 4-10 8-4-4 10z" />
      <path d="M26 8v4M26 44v4M6 28h4M42 28h4" />
    </>
  ),
  scissors: (
    <>
      <circle cx="14" cy="40" r="6" />
      <circle cx="30" cy="44" r="6" />
      <path d="M18 36 40 8M26 39 36 12" />
    </>
  ),
  camera: (
    <>
      <path d="M6 18h10l4-6h12l4 6h10v26H6z" />
      <circle cx="26" cy="31" r="8" />
      <path d="M39 22h3" />
    </>
  ),
  pencil: (
    <>
      <path d="M10 44 38 16l6 6-28 28-8 2z" />
      <path d="m34 20 6 6M10 44l6 6" />
    </>
  ),
  heart: (
    <path d="M26 44C14 35 7 28 8 19c1-7 10-10 15-4l3 3 3-3c5-6 14-3 15 4 1 9-6 16-18 25z" />
  ),
  star: <path d="m26 6 6 13 14 2-10 10 2 14-12-7-12 7 2-14L6 21l14-2z" />,
  sparkle: (
    <>
      <path d="M26 6c2 12 6 16 18 18-12 2-16 6-18 18-2-12-6-16-18-18 12-2 16-6 18-18z" />
      <path d="M44 6v6M41 9h6" />
    </>
  ),
  plane: (
    <>
      <path d="m6 28 40-16-10 32-9-10-8 8 1-12z" />
      <path d="m27 34 19-22" />
    </>
  ),
  book: (
    <>
      <path d="M26 14c-6-4-14-4-20-2v30c6-2 14-2 20 2 6-4 14-4 20-2V12c-6-2-14-2-20 2z" />
      <path d="M26 14v30" />
    </>
  ),
};

export function Doodle({ name, className = "h-10 w-10", tone = "brown" }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 52 56"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${toneClass[tone]} ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
