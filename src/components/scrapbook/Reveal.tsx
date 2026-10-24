"use client";

import { motion, useReducedMotion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article";
};

/**
 * Small fade/slide-in the first time an element enters the viewport.
 * Markup is identical on server and client; reduced motion only changes
 * the timing (instant), which avoids hydration mismatches.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.35, ease: "easeOut", delay }}
    >
      {children}
    </Comp>
  );
}
