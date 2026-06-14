"use client";

import { useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LenisContext } from "@/hooks/useLenis";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Provides app-wide smooth scrolling via Lenis and keeps GSAP ScrollTrigger
 * perfectly in sync with Lenis' virtual scroll position. Respects the user's
 * reduced-motion preference by disabling smoothing entirely.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduceMotion = usePrefersReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (reduceMotion) return;

    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      wheelMultiplier: 1,
    });

    setLenis(instance);

    // Drive Lenis from GSAP's ticker so both share one RAF loop.
    instance.on("scroll", ScrollTrigger.update);
    const onTick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      instance.destroy();
      setLenis(null);
    };
  }, [reduceMotion]);

  // Refresh ScrollTrigger once on mount so pinned measurements are correct.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
