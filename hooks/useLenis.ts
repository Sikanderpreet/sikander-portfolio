"use client";

import { createContext, useContext } from "react";
import type Lenis from "lenis";

/**
 * Context exposing the shared Lenis instance created by <SmoothScroll>.
 * Components can read it to programmatically scroll (e.g. anchor links).
 */
export const LenisContext = createContext<Lenis | null>(null);

export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}
