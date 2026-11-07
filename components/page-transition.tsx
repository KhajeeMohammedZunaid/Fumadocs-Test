"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Lightweight, hardware-accelerated page entrance transition using motion/react.
 * Provides a fluid fade + subtle vertical lift across all devices.
 * Respects user's prefers-reduced-motion OS preference.
 */
export function PageTransition({ children, className }: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0.15 : 0.22,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

