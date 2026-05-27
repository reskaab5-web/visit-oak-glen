"use client";

/**
 * AnimatedHeroContent / AnimatedHeroItem
 *
 * Staggered blur-fade-slide entrance for hero text elements.
 * The container orchestrates timing; each child item reveals sequentially.
 *
 * Effect: blur(4px) + y:16px → blur(0) + y:0, children staggered 120ms apart.
 *
 * Usage — wrap the inner text content of any hero section:
 * ```tsx
 * // In SectionHero or any hero component:
 * <AnimatedHeroContent>
 *   <AnimatedHeroItem>
 *     <span className="eyebrow">Oak Glen, CA</span>
 *   </AnimatedHeroItem>
 *   <AnimatedHeroItem>
 *     <h1>Discover Apple Country</h1>
 *   </AnimatedHeroItem>
 *   <AnimatedHeroItem>
 *     <p>Subtitle text…</p>
 *   </AnimatedHeroItem>
 *   <AnimatedHeroItem>
 *     <SearchBar />
 *   </AnimatedHeroItem>
 * </AnimatedHeroContent>
 * ```
 *
 * The background image (rendered by the server) loads immediately;
 * only the text layer is animated, so LCP is not penalised.
 */

import { motion, useInView }          from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ReactNode }              from "react";

// ─── Container variants ────────────────────────────────────────────────────────

const containerVariants = {
  hidden:   { opacity: 0 },
  visible:  {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren:   0.1,  // slight delay so the bg image has started loading
    },
  },
};

// ─── Item variants ─────────────────────────────────────────────────────────────

const itemVariants = {
  hidden: {
    opacity: 0,
    y:       18,
    filter:  "blur(5px)",
  },
  visible: {
    opacity: 1,
    y:       0,
    filter:  "blur(0px)",
    transition: {
      duration: 0.65,
      ease:     [0.22, 1, 0.36, 1] as const,
    },
  },
};

// ─── AnimatedHeroContent ───────────────────────────────────────────────────────

interface HeroContentProps {
  children:   ReactNode;
  className?: string;
}

/**
 * The orchestrating container. Renders as a `motion.div` that controls
 * when its children begin animating.
 */
export function AnimatedHeroContent({ children, className }: HeroContentProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── AnimatedHeroItem ──────────────────────────────────────────────────────────

/**
 * Each discrete piece of hero content: eyebrow, title, subtitle, CTA row, search.
 * Renders as a `motion.div` driven by the parent container's stagger.
 */
export function AnimatedHeroItem({ children, className }: HeroContentProps) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

// ─── AnimatedSectionReveal ─────────────────────────────────────────────────────

/**
 * Scroll-triggered reveal for non-hero sections (Featured Categories, About banner, etc.)
 * Fires once as the section enters the viewport.
 *
 * Usage:
 * ```tsx
 * <AnimatedSectionReveal>
 *   <section className="py-section ...">
 *     ...
 *   </section>
 * </AnimatedSectionReveal>
 * ```
 */
export function AnimatedSectionReveal({ children, className }: HeroContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── AnimatedCounter ──────────────────────────────────────────────────────────

/**
 * Animates a number from 0 to `target` when it scrolls into view.
 * Used for the stats row in the About banner.
 *
 * Usage:
 * ```tsx
 * <AnimatedCounter target={312} suffix="+" />
 * ```
 */
interface AnimatedCounterProps {
  target:     number;
  prefix?:    string;
  suffix?:    string;
  duration?:  number; // ms
  className?: string;
}

export function AnimatedCounter({
  target,
  prefix   = "",
  suffix   = "",
  duration = 1200,
  className,
}: AnimatedCounterProps) {
  const [count, setCount]   = useState(0);
  const ref                 = useRef<HTMLSpanElement>(null);
  const isInView            = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed  = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(startValue + (target - startValue) * eased));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}
