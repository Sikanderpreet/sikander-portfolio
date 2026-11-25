"use client";

import { useState } from "react";
import { m, useMotionValueEvent, useScroll } from "framer-motion";
import { Download } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/data";
import { cn } from "@/lib/utils";
import { EASE } from "@/components/motion";

/** Wordmark: name + a prompt whose tomato cursor blinks. */
export function Logo() {
  return (
    <a href="#top" className="group flex items-center gap-1.5 text-lg font-black tracking-tight" aria-label="Back to top">
      <span>{SITE.shortName}</span>
      <span className="font-mono text-base font-bold">&gt;</span>
      <span className="cursor-blink inline-block h-4 w-3 rounded-[3px] bg-tomato transition-transform duration-200 group-hover:-translate-y-1 group-hover:rotate-[-18deg]" />
    </a>
  );
}

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  // Only re-renders when the 12px threshold is crossed, not on every scroll.
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  return (
    <m.header
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      className={cn(
        "sticky top-0 z-50 border-b-[3px] bg-paper transition-colors duration-200",
        scrolled ? "border-ink" : "border-transparent"
      )}
    >
      <nav className="container flex h-[68px] items-center justify-between">
        <Logo />
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-lg px-3 py-2 font-bold text-ink/80 transition-colors hover:bg-sunflower hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href={SITE.resume} download className="btn bg-sunflower px-4 py-2 text-sm shadow-hard-sm">
          <Download className="h-4 w-4" strokeWidth={3} />
          Resume
        </a>
      </nav>
    </m.header>
  );
}
