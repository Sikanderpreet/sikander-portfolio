"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe media query hook. Returns `false` until mounted to avoid hydration
 * mismatches, then reflects the live match state.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** Convenience hook: true when the user prefers reduced motion. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** Convenience hook: true on mobile-width viewports (< 768px). */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 767px)");
}
