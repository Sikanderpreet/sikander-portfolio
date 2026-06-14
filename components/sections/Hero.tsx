"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download, Sparkles, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components/visuals/Particles";
import { GradientBlobs } from "@/components/visuals/GradientBlobs";
import { GridBackdrop } from "@/components/visuals/GridBackdrop";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useLenis } from "@/hooks/useLenis";
import { HERO_BADGES, SITE } from "@/lib/data";
import { cn } from "@/lib/utils";

const headline = "Hi, I'm Sikanderpreet Singh";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.2 } },
};
const word = {
  hidden: { opacity: 0, y: 40, rotateX: -40 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const { nx, ny } = useMousePosition();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Multi-layer parallax on scroll.
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yBlobs = useTransform(scrollYProgress, [0, 1], [0, 260]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  const scrollToWork = () => {
    const el = document.querySelector("#work");
    if (!el) return;
    if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -40 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-24"
    >
      {/* Background layers */}
      <GridBackdrop />
      <motion.div style={{ y: yBlobs }} className="absolute inset-0">
        <GradientBlobs />
      </motion.div>
      <Particles density={1} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <motion.div
        style={{ y: yContent, opacity, scale }}
        className="container relative z-10 flex flex-col items-center text-center"
      >
        {/* Availability pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="eyebrow">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Available for backend roles
          </span>
        </motion.div>

        {/* Animated headline with mouse parallax */}
        <motion.h1
          variants={container}
          initial="hidden"
          animate="visible"
          style={{
            transform: `translate3d(${nx * -12}px, ${ny * -12}px, 0)`,
          }}
          className="perspective-1000 max-w-5xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          {headline.split(" ").map((w, i) => (
            <motion.span
              key={i}
              variants={word}
              className={cn(
                "mr-[0.25em] inline-block",
                i >= 2 && "text-gradient"
              )}
            >
              {w}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-6 max-w-2xl text-balance text-base text-muted-foreground sm:text-xl"
        >
          {SITE.heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="mt-3 flex items-center gap-2 text-sm text-muted-foreground"
        >
          <MapPin className="h-4 w-4 text-primary" />
          {SITE.location}
          <span className="mx-1 h-1 w-1 rounded-full bg-muted-foreground/50" />
          {SITE.experience} of experience
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button size="lg" onClick={scrollToWork}>
            <Sparkles className="h-4 w-4" />
            Explore My Work
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href={SITE.resume} download>
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </Button>
        </motion.div>

        {/* Floating tech badges */}
        <div className="mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-3">
          {HERO_BADGES.map((badge, i) => (
            <motion.div
              key={badge.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.06, duration: 0.5 }}
              style={{
                transform: `translate3d(${nx * (i % 3 === 0 ? -16 : i % 3 === 1 ? 10 : -6)}px, ${
                  ny * (i % 2 === 0 ? -10 : 8)
                }px, 0)`,
              }}
            >
              <div
                className={cn(
                  "group relative flex items-center gap-2 rounded-full border border-border/70 bg-secondary/40 px-4 py-2 text-sm font-medium backdrop-blur-md transition-all hover:-translate-y-1 hover:border-primary/40",
                  "animate-float"
                )}
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                <span
                  className={cn(
                    "absolute inset-0 -z-10 rounded-full bg-gradient-to-br opacity-0 blur-md transition-opacity group-hover:opacity-100",
                    badge.glow
                  )}
                />
                <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                {badge.name}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        onClick={scrollToWork}
        aria-label="Scroll down"
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted-foreground"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.button>
    </section>
  );
}
