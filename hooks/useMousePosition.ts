"use client";

import { useEffect, useState } from "react";

interface MousePosition {
  /** Raw pixel coordinates. */
  x: number;
  y: number;
  /** Normalized -1..1 coordinates relative to viewport center. */
  nx: number;
  ny: number;
}

/**
 * Tracks the pointer position and exposes both raw and center-normalized
 * coordinates. Used to drive parallax depth in the hero.
 */
export function useMousePosition(): MousePosition {
  const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0, nx: 0, ny: 0 });

  useEffect(() => {
    let frame = 0;
    const handle = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window;
        setPos({
          x: e.clientX,
          y: e.clientY,
          nx: (e.clientX / innerWidth) * 2 - 1,
          ny: (e.clientY / innerHeight) * 2 - 1,
        });
      });
    };

    window.addEventListener("mousemove", handle, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handle);
      cancelAnimationFrame(frame);
    };
  }, []);

  return pos;
}
