"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLenis } from "@/hooks/useLenis";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -80 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={cn(
          "flex w-full max-w-5xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 sm:px-6",
          scrolled
            ? "glass-strong shadow-[0_8px_40px_-12px_rgba(0,0,0,0.7)]"
            : "border border-transparent bg-transparent"
        )}
      >
        <button
          onClick={() => (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0 }))}
          className="group flex items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/25 transition-transform group-hover:scale-110">
            <Terminal className="h-4 w-4" />
          </span>
          <span className="hidden sm:inline">Sikanderpreet</span>
          <span className="text-primary">.dev</span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => go(link.href)}
              className="rounded-full px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="hidden md:inline-flex"
            onClick={() => go("#contact")}
          >
            Let&apos;s Talk
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-4 right-4 top-20 z-50 md:hidden"
          >
            <div className="glass-strong flex flex-col gap-1 rounded-2xl p-3">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => go(link.href)}
                  className="rounded-xl px-4 py-3 text-left text-sm text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
                >
                  {link.label}
                </button>
              ))}
              <Button className="mt-1" onClick={() => go("#contact")}>
                Let&apos;s Talk
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
