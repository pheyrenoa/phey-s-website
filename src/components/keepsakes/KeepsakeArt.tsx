import type { Keepsake } from "@/lib/types";

// Little inline-SVG drawings of each keepsake type, so the drawer looks
// finished before real photos exist. Palette colors only.
const C = {
  paper: "#faf7f0",
  sage: "#a3aa91",
  forest: "#455646",
  terracotta: "#b9785c",
  brown: "#806d59",
  ink: "#37342f",
};

const art: Record<Keepsake["kind"], React.ReactNode> = {
  wrapper: (
    <>
      <path d="M14 30 4 24l2 10-2 10 10-6z" fill={C.terracotta} opacity="0.75" />
      <path d="M86 30l10-6-2 10 2 10-10-6z" fill={C.terracotta} opacity="0.75" />
      <rect x="14" y="26" width="72" height="28" rx="2" fill={C.terracotta} />
      <rect x="30" y="31" width="40" height="18" fill={C.paper} opacity="0.9" />
      <path d="M36 40h28M40 45h20" stroke={C.forest} strokeWidth="2" strokeLinecap="round" />
      <path d="M22 30l4 20M74 30l4 20" stroke={C.paper} strokeWidth="1" opacity="0.4" />
    </>
  ),
  ticket: (
    <>
      <path
        d="M10 22h80v12a6 6 0 0 0 0 12v12H10V46a6 6 0 0 0 0-12z"
        fill={C.paper}
        stroke={C.brown}
        strokeWidth="1.5"
      />
      <path d="M68 24v32" stroke={C.brown} strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M18 32h40M18 40h30M18 48h36" stroke={C.forest} strokeWidth="2" strokeLinecap="round" />
      <text x="79" y="44" fontSize="9" fill={C.terracotta} textAnchor="middle" transform="rotate(-90 79 40)" fontFamily="sans-serif">ADMIT</text>
    </>
  ),
  map: (
    <>
      <path d="M10 20l26-6 28 6 26-6v48l-26 6-28-6-26 6z" fill={C.paper} stroke={C.brown} strokeWidth="1.5" />
      <path d="M36 14v48M64 20v48" stroke={C.brown} strokeWidth="1" opacity="0.6" />
      <path d="M16 50c10-14 22-4 30-16s22-6 38-14" stroke={C.terracotta} strokeWidth="2" strokeDasharray="4 3" fill="none" />
      <circle cx="26" cy="32" r="5" fill={C.sage} />
      <circle cx="72" cy="46" r="6" fill={C.sage} />
      <path d="M80 18l-3 6h6z" fill={C.forest} />
    </>
  ),
  note: (
    <>
      <path d="M22 12h52l6 6v52H22z" fill={C.paper} stroke={C.brown} strokeWidth="1.5" transform="rotate(-4 50 40)" />
      <path d="M30 26h36M30 34h40M30 42h30M30 50h34" stroke={C.forest} strokeWidth="1.6" strokeLinecap="round" transform="rotate(-4 50 40)" opacity="0.8" />
      <path d="M58 58c4-4 10-2 8 3s-8 3-8-3" stroke={C.terracotta} strokeWidth="1.8" fill="none" transform="rotate(-4 50 40)" />
    </>
  ),
  sticker: (
    <>
      <path d="M50 10l9 18 20 3-15 14 4 20-18-10-18 10 4-20-15-14 20-3z" fill={C.sage} stroke={C.paper} strokeWidth="4" strokeLinejoin="round" />
      <circle cx="44" cy="38" r="2.4" fill={C.ink} />
      <circle cx="56" cy="38" r="2.4" fill={C.ink} />
      <path d="M44 46c3 3 9 3 12 0" stroke={C.ink} strokeWidth="2" strokeLinecap="round" fill="none" />
    </>
  ),
  postcard: (
    <>
      <rect x="8" y="16" width="84" height="50" fill={C.paper} stroke={C.brown} strokeWidth="1.5" />
      <path d="M52 22v38" stroke={C.brown} strokeWidth="1" />
      <rect x="74" y="21" width="13" height="15" fill={C.terracotta} opacity="0.8" />
      <path d="M58 44h28M58 52h24M14 26h32M14 34h28M14 42h30" stroke={C.forest} strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
    </>
  ),
  stone: (
    <>
      <path d="M18 52c-6-14 6-30 26-32 22-2 40 8 40 24 0 14-18 20-36 20-16 0-26-4-30-12z" fill={C.sage} />
      <path d="M30 34c8-6 22-8 32-4" stroke={C.paper} strokeWidth="2" strokeLinecap="round" opacity="0.6" fill="none" />
      <path d="M26 54c14 4 34 4 50-4" stroke={C.forest} strokeWidth="1.4" opacity="0.4" fill="none" />
    </>
  ),
  other: (
    <>
      <rect x="22" y="22" width="56" height="40" fill={C.paper} stroke={C.brown} strokeWidth="1.5" />
      <path d="M50 22v40M22 42h56" stroke={C.terracotta} strokeWidth="3" />
    </>
  ),
};

export function KeepsakeArt({ kind, className = "" }: { kind: Keepsake["kind"]; className?: string }) {
  return (
    <svg viewBox="0 0 100 80" className={className} aria-hidden="true" focusable="false">
      {art[kind]}
    </svg>
  );
}
