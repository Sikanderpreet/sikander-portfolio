"use client";

import { useRef } from "react";
import { m, useInView, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/** One easing and short durations everywhere: snappy, never sluggish. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

export const stagger = (gap = 0.06, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

/** Fade + rise into view once, as soon as a sliver of it is visible. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "p";
}) {
  const C = m[as];
  return (
    <C
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </C>
  );
}

/** Section title with a sunflower marker that sweeps in behind one word. */
export function SectionTitle({
  eyebrow,
  before,
  mark,
  after,
  className,
}: {
  eyebrow: string;
  before?: string;
  mark: string;
  after?: string;
  className?: string;
}) {
  return (
    <m.div
      className={cn("mb-12", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      variants={stagger(0.08)}
    >
      <m.p variants={fadeUp} className="eyebrow">
        {eyebrow}
      </m.p>
      <m.h2 variants={fadeUp} className="mt-3 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
        {before && <>{before} </>}
        <span className="marker">
          <m.span
            aria-hidden="true"
            className="marker-bg"
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.35, ease: EASE, delay: 0.15 } } }}
          />
          {mark}
        </span>
        {after && <> {after}</>}
      </m.h2>
    </m.div>
  );
}

/**
 * Wrapper for a looping CSS demo. Sets data-play so loops pause off screen
 * (no wasted CPU while you read another section).
 */
export function DemoFrame({
  children,
  className,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2 });
  return (
    <div
      ref={ref}
      data-play={inView ? "true" : "false"}
      role="img"
      aria-label={label}
      className={cn("relative overflow-hidden", className)}
    >
      {children}
    </div>
  );
}
