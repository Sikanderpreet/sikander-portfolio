"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowDown, Download, Sparkles, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components/visuals/Particles";
import { GradientBlobs } from "@/components/visuals/GradientBlobs";
import { GridBackdrop } from "@/components/visuals/GridBackdrop";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useLenis } from "@/hooks/useLenis";
import { HERO_BADGES, SITE } from "@/lib/data";
import { cn } from "@/lib/utils";

// Headline rendered as two lines; the last word carries the gradient accent.
const headlineLine1 = ["Backends", "built"];
const headlineLine2 = ["to"];

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

// Lines rendered inside the terminal card — a fake health check, on-theme for
// a backend engineer.
const TERMINAL_LINES: { text: string; tone?: "prompt" | "key" | "ok" | "dim" }[] =
  [
    { text: "~ $ curl -s api.sikander.dev/health", tone: "prompt" },
    { text: "{" },
    { text: '  "status":   "ok",', tone: "ok" },
    { text: '  "uptime":   "99.98%",', tone: "key" },
    { text: '  "p99":      "42ms",', tone: "key" },
    { text: '  "services": ["api", "queue", "cache"]', tone: "dim" },
    { text: "}" },
  ];

/**
 * A floating tech badge with its own mouse-parallax depth. Kept as a child
 * component so each badge can derive its transform from the shared motion
 * values without re-rendering the whole hero on pointer move.
 */
function FloatingBadge({
  badge,
  i,
  nx,
  ny,
}: {
  badge: (typeof HERO_BADGES)[number];
  i: number;
  nx: MotionValue<number>;
  ny: MotionValue<number>;
}) {
  const x = useTransform(nx, (v) => v * (i % 3 === 0 ? -16 : i % 3 === 1 ? 10 : -6));
  const y = useTransform(ny, (v) => v * (i % 2 === 0 ? -10 : 8));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 + i * 0.06, duration: 0.5 }}
      style={{ x, y }}
    >
      <div
        className={cn(
          "group relative flex items-center gap-2 rounded-full border border-border/70 bg-secondary/40 px-4 py-2 font-mono text-sm font-medium tracking-tight backdrop-blur-md transition-all hover:-translate-y-1 hover:border-primary/40",
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
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const { nx, ny } = useMousePosition();

  // Mouse-parallax offsets for the headline (motion values → no re-renders).
  const headlineX = useTransform(nx, (v) => v * -12);
  const headlineY = useTransform(ny, (v) => v * -12);

  // The terminal card leans toward the pointer for depth.
  const cardX = useTransform(nx, (v) => v * 18);
  const cardY = useTransform(ny, (v) => v * 18);
  const cardRotX = useTransform(ny, (v) => v * -4);
  const cardRotY = useTransform(nx, (v) => v * 4);
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
        className="container relative z-10 flex flex-col"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left column — editorial copy */}
          <div className="flex flex-col items-start text-left">
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
              style={{ x: headlineX, y: headlineY }}
              className="perspective-1000 max-w-xl text-balance text-4xl font-semibold leading-[1.04] tracking-tight sm:text-5xl md:text-6xl"
            >
              <span className="block">
                {headlineLine1.map((w, i) => (
                  <motion.span key={i} variants={word} className="mr-[0.25em] inline-block">
                    {w}
                  </motion.span>
                ))}
              </span>
              <span className="block">
                {headlineLine2.map((w, i) => (
                  <motion.span key={i} variants={word} className="mr-[0.25em] inline-block">
                    {w}
                  </motion.span>
                ))}
                <motion.span variants={word} className="inline-block text-gradient">
                  last.
                </motion.span>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="mt-6 max-w-lg text-balance text-base text-muted-foreground sm:text-lg"
            >
              {SITE.name} — backend developer specializing in
              high-performance APIs, AI systems, and cloud-native
              infrastructure.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.7 }}
              className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"
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
              className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
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
          </div>

          {/* Right column — animated terminal card with mouse-parallax depth */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              x: cardX,
              y: cardY,
              rotateX: cardRotX,
              rotateY: cardRotY,
              transformPerspective: 1000,
            }}
            className="perspective-1000 relative mx-auto w-full max-w-md"
          >
            <div className="gradient-border animate-float rounded-2xl">
              <div className="overflow-hidden rounded-2xl">
                {/* Window chrome */}
                <div className="flex items-center gap-2 border-b border-border/60 bg-secondary/40 px-4 py-3 backdrop-blur-md">
                  <span className="h-3 w-3 rounded-full bg-rose/80" />
                  <span className="h-3 w-3 rounded-full bg-amber/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald/80" />
                  <span className="ml-3 font-mono text-xs text-muted-foreground">
                    api • node.js
                  </span>
                </div>

                {/* Body */}
                <div className="space-y-1.5 bg-card/60 p-5 font-mono text-sm backdrop-blur-md">
                  {TERMINAL_LINES.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.12, duration: 0.4 }}
                      className={cn(
                        "whitespace-pre",
                        line.tone === "prompt" && "text-foreground",
                        line.tone === "ok" && "text-emerald",
                        line.tone === "key" && "text-cyan",
                        line.tone === "dim" && "text-muted-foreground",
                        !line.tone && "text-muted-foreground/70"
                      )}
                    >
                      {line.text}
                    </motion.div>
                  ))}
                  <motion.span
                    aria-hidden="true"
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 1.1, repeat: Infinity }}
                    className="mt-1 inline-block h-4 w-2 bg-primary/80 align-middle"
                  />
                </div>
              </div>
            </div>

            {/* Soft glow behind the card */}
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-[radial-gradient(circle,hsl(var(--brand-emerald)/0.14),transparent_70%)] blur-2xl" />
          </motion.div>
        </div>

        {/* Floating tech badges */}
        <div className="mt-14 flex max-w-3xl flex-wrap items-center gap-3">
          {HERO_BADGES.map((badge, i) => (
            <FloatingBadge key={badge.name} badge={badge} i={i} nx={nx} ny={ny} />
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
