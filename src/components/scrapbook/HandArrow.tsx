"use client";

import { motion, useReducedMotion } from "framer-motion";

const shapes = {
  // Curvy arrow pointing down-left
  curl: {
    viewBox: "0 0 120 90",
    body: "M110 8c-30 4-58 18-66 44-3 10 4 18 12 12 8-6 0-20-12-18-14 2-24 14-30 26",
    head: "M8 66l6 8 9-6",
  },
  // Gentle swoop pointing right
  swoop: {
    viewBox: "0 0 140 60",
    body: "M6 44c24-30 70-40 118-20",
    head: "M112 14l13 10-14 8",
  },
  // Straight-ish arrow pointing down
  down: {
    viewBox: "0 0 50 100",
    body: "M28 6c-6 24 4 50-4 84",
    head: "M14 78l10 14 12-12",
  },
} as const;

type HandArrowProps = {
  shape?: keyof typeof shapes;
  className?: string;
};

/** Hand-drawn arrow that draws itself on first view (static if reduced motion). */
export function HandArrow({ shape = "swoop", className = "h-12 w-24" }: HandArrowProps) {
  const reduce = useReducedMotion();
  const s = shapes[shape];
  // Same initial markup either way; reduced motion just draws instantly.
  const draw = {
    initial: { pathLength: 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true },
  };
  return (
    <svg
      viewBox={s.viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`pointer-events-none text-terracotta ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <motion.path d={s.body} {...draw}
        transition={reduce ? { duration: 0 } : { duration: 0.7, ease: "easeInOut" }}
      />
      <motion.path
        d={s.head}
        {...draw}
        transition={reduce ? { duration: 0 } : { duration: 0.2, delay: 0.65 }}
      />
    </svg>
  );
}
