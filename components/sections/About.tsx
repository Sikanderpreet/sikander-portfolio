"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedCounter } from "@/components/visuals/AnimatedCounter";
import { Reveal } from "@/components/visuals/Reveal";
import { ABOUT_CARDS, ABOUT_STATS } from "@/lib/data";

function AboutCard({
  card,
  index,
  total,
  progress,
}: {
  card: (typeof ABOUT_CARDS)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Each card occupies a slice of the scroll range and is revealed in turn.
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(
    progress,
    [start - 0.12, start, end - 0.05, end + 0.08],
    [0.25, 1, 1, 0.25]
  );
  const y = useTransform(progress, [start - 0.1, start], [40, 0]);
  const scale = useTransform(progress, [start - 0.1, start, end], [0.96, 1, 0.98]);
  const Icon = card.icon;

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="gradient-border flex items-start gap-5 rounded-2xl p-6 sm:p-8"
    >
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/20">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h3 className="text-lg font-semibold sm:text-xl">{card.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {card.body}
        </p>
      </div>
    </motion.div>
  );
}

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="About Me"
          title={
            <>
              Engineering systems that{" "}
              <span className="text-gradient">scale with intent</span>
            </>
          }
          description="I turn complex backend requirements into clean, reliable systems — from multi-tenant SaaS to AI-powered services running in the cloud."
        />

        <div ref={ref} className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Sticky narrative column */}
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <div className="glass rounded-3xl p-8">
                <p className="text-sm uppercase tracking-[0.25em] text-primary">
                  The story so far
                </p>
                <p className="mt-4 text-xl font-medium leading-relaxed text-foreground/90 sm:text-2xl">
                  Over the last few years I&apos;ve focused on the parts of
                  software users never see — but always feel: the APIs, the data
                  models, the queues and the infrastructure that keep products
                  fast, secure and resilient.
                </p>
                <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border/60 pt-8">
                  {ABOUT_STATS.map((stat) => (
                    <div key={stat.caption} className="text-center">
                      <div className="text-2xl font-semibold text-gradient sm:text-3xl">
                        <AnimatedCounter
                          value={stat.value}
                          suffix={stat.suffix}
                          label={stat.label}
                        />
                      </div>
                      <p className="mt-1 text-[11px] leading-tight text-muted-foreground sm:text-xs">
                        {stat.caption}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Scroll-revealed cards */}
          <div className="flex flex-col gap-5">
            {ABOUT_CARDS.map((card, i) => (
              <AboutCard
                key={card.title}
                card={card}
                index={i}
                total={ABOUT_CARDS.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
