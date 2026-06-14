"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Soft, slowly-drifting gradient blobs that sit behind content to create depth.
 * Purely decorative.
 */
export function GradientBlobs({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <motion.div
        className="absolute -left-32 top-0 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,hsl(var(--brand-emerald)/0.18),transparent_60%)] blur-3xl"
        animate={{ x: [0, 60, -20, 0], y: [0, 40, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-40 top-40 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,hsl(var(--brand-violet)/0.18),transparent_60%)] blur-3xl"
        animate={{ x: [0, -50, 30, 0], y: [0, -30, 40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,hsl(var(--brand-cyan)/0.14),transparent_60%)] blur-3xl"
        animate={{ x: [0, 40, -40, 0], y: [0, 20, -20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* A small, warm accent keeps the otherwise cool palette from feeling
          synthetic — a deliberate point of contrast. */}
      <motion.div
        className="absolute right-1/4 top-1/3 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,hsl(var(--brand-amber)/0.08),transparent_60%)] blur-3xl"
        animate={{ x: [0, -30, 20, 0], y: [0, 30, -10, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
