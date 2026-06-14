"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, animate } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  /** Non-numeric headline (e.g. "Node.js"); shown verbatim, skips counting. */
  label?: string;
  duration?: number;
  className?: string;
}

/**
 * Counts up from 0 to `value` when scrolled into view. If a `label` is given,
 * renders it statically instead (for non-numeric stats like "Node.js").
 */
export function AnimatedCounter({
  value,
  suffix = "",
  label,
  duration = 2,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useMotionValue(0);

  useEffect(() => {
    if (!inView || label) return;
    const controls = animate(count, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.textContent = `${Math.round(latest)}${suffix}`;
        }
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix, duration, label, count]);

  if (label) {
    return (
      <span ref={ref} className={className}>
        {label}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
