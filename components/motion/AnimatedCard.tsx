"use client";

/**
 * AnimatedCard
 *
 * A lightweight Framer Motion wrapper for scroll-triggered card entrance animations.
 * Uses `whileInView` so each card fires only as it enters the viewport, preventing
 * a flash of all cards animating at once on initial load.
 *
 * Usage:
 * ```tsx
 * <div className="grid ...">
 *   {businesses.map((b, i) => (
 *     <AnimatedCard key={b.id} index={i}>
 *       <BusinessCard ... />
 *     </AnimatedCard>
 *   ))}
 * </div>
 * ```
 *
 * The `index` prop drives a stagger delay — card 0 animates first, card 1 slightly
 * after, etc. Cap the delay so items far down the grid don't wait too long.
 */

import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode }          from "react";

// ─── Variants ─────────────────────────────────────────────────────────────────

const cardVariants = {
  hidden: {
    opacity:   0,
    y:         28,
    scale:     0.97,
    filter:    "blur(2px)",
  },
  visible: (index: number) => ({
    opacity:   1,
    y:         0,
    scale:     1,
    filter:    "blur(0px)",
    transition: {
      duration: 0.55,
      // Cap stagger at ~0.35s so a long grid doesn't feel broken
      delay:    Math.min(index * 0.07, 0.35),
      ease:     [0.22, 1, 0.36, 1] as const, // "premium" cubic-bezier from design tokens
    },
  }),
};

// ─── AnimatedCard ─────────────────────────────────────────────────────────────

interface AnimatedCardProps {
  children:   ReactNode;
  /** Position in the grid — drives the stagger delay */
  index?:     number;
  className?: string;
}

export function AnimatedCard({
  children,
  index = 0,
  className,
}: AnimatedCardProps) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px 0px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── AnimatedCardGrid ─────────────────────────────────────────────────────────
// Wraps a list of items in AnimatedCard with automatic index assignment.
// Use this as a drop-in replacement for a plain grid wrapper.

interface AnimatedCardGridProps {
  children:      ReactNode[];
  gridClassName?: string;
  /** Unique key — change it to trigger exit + re-enter animations (e.g. on filter change) */
  filterKey?:   string;
}

export function AnimatedCardGrid({
  children,
  gridClassName = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
  filterKey     = "default",
}: AnimatedCardGridProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={filterKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.15 } }}
        exit={{ opacity: 0,    transition: { duration: 0.12 } }}
        className={gridClassName}
      >
        {children.map((child, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{
              opacity: 1,
              y:       0,
              scale:   1,
              transition: {
                delay:    Math.min(i * 0.06, 0.3),
                duration: 0.45,
                ease:     [0.22, 1, 0.36, 1],
              },
            }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

export default AnimatedCard;
