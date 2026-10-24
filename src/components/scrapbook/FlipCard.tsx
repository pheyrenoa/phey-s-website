"use client";

import { motion, useReducedMotion } from "framer-motion";

type FlipCardProps = {
  flipped: boolean;
  /** Front face. Must contain the control that flips the card. */
  front: React.ReactNode;
  /** Back face. Must contain a control that flips it back. */
  back: React.ReactNode;
  className?: string;
};

/**
 * Two-sided card. The hidden face is `inert` so keyboard and screen-reader
 * users only ever reach the side that's showing. With reduced motion the
 * flip is an instant swap.
 */
export function FlipCard({ flipped, front, back, className = "" }: FlipCardProps) {
  const reduce = useReducedMotion();
  return (
    <div className={`flip-scene ${className}`}>
      <motion.div
        className="flip-inner relative grid h-full"
        initial={false}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={reduce ? { duration: 0 } : { duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="flip-face col-start-1 row-start-1" inert={flipped}>
          {front}
        </div>
        <div
          className="flip-face col-start-1 row-start-1 [transform:rotateY(180deg)]"
          inert={!flipped}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
}
