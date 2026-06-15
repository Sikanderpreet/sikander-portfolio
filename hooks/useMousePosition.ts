"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";

interface MousePosition {
  /** Spring-smoothed, center-normalized -1..1 coordinates as motion values. */
  nx: MotionValue<number>;
  ny: MotionValue<number>;
}

/**
 * Tracks the pointer and exposes spring-smoothed, center-normalized coordinates
 * as framer-motion `MotionValue`s. These drive parallax depth without ever
 * calling `setState`, so consuming components never re-render on mouse move —
 * the transforms are applied directly on the compositor.
 */
export function useMousePosition(): MousePosition {
  const nxRaw = useMotionValue(0);
  const nyRaw = useMotionValue(0);

  const spring = { stiffness: 90, damping: 22, mass: 0.4 };
  const nx = useSpring(nxRaw, spring);
  const ny = useSpring(nyRaw, spring);

  useEffect(() => {
    let frame = 0;
    const handle = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window;
        nxRaw.set((e.clientX / innerWidth) * 2 - 1);
        nyRaw.set((e.clientY / innerHeight) * 2 - 1);
      });
    };

    window.addEventListener("mousemove", handle, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handle);
      cancelAnimationFrame(frame);
    };
  }, [nxRaw, nyRaw]);

  return { nx, ny };
}
