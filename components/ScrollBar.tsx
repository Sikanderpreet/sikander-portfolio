"use client";

import { m, useScroll } from "framer-motion";

/** Thin tomato reading-progress bar. Driven by the scroll position directly. */
export function ScrollBar() {
  const { scrollYProgress } = useScroll();
  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-tomato"
    />
  );
}
