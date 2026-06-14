"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { TiltCard } from "@/components/visuals/TiltCard";
import { RevealGroup, revealChild } from "@/components/visuals/Reveal";
import { TECH_CATEGORIES } from "@/lib/data";

export function TechStack() {
  return (
    <section id="stack" className="relative py-24 sm:py-32">
      {/* faint backdrop accent */}
      <div className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 mx-auto h-72 max-w-4xl rounded-full bg-[radial-gradient(ellipse,hsl(var(--brand-violet)/0.12),transparent_70%)] blur-3xl" />

      <div className="container">
        <SectionHeading
          eyebrow="Tech Stack"
          title={
            <>
              The tools behind the <span className="text-gradient">systems</span>
            </>
          }
          description="A pragmatic toolkit chosen for reliability, performance and developer velocity — spanning backend, data, cloud, AI and integrations."
        />

        <RevealGroup
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          {TECH_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div key={cat.title} variants={revealChild} className="group">
                <TiltCard className="h-full">
                  <div className="glass relative h-full overflow-hidden rounded-2xl p-6 transition-colors duration-300 group-hover:border-primary/30">
                    {/* glow blob per category */}
                    <div
                      className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-30 blur-2xl transition-opacity group-hover:opacity-60"
                      style={{ background: `hsl(${cat.accent} / 0.5)` }}
                    />
                    <div className="flex items-center gap-3">
                      <div
                        className="grid h-11 w-11 place-items-center rounded-xl ring-1 ring-inset"
                        style={{
                          background: `hsl(${cat.accent} / 0.12)`,
                          color: `hsl(${cat.accent})`,
                          borderColor: `hsl(${cat.accent} / 0.25)`,
                        }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-semibold">{cat.title}</h3>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {cat.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-lg border border-border/60 bg-secondary/40 px-3 py-1.5 text-sm text-foreground/80 transition-colors hover:border-primary/30 hover:text-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
