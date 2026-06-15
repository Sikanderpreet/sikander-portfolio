"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Lock, Check } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { TiltCard } from "@/components/visuals/TiltCard";
import { RevealGroup, revealChild } from "@/components/visuals/Reveal";
import { CASE_STUDIES } from "@/lib/data";

export function Work() {
  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Selected Work"
          title={
            <>
              Case studies in <span className="text-gradient">production</span>
            </>
          }
          description="Real systems, anonymized to respect client confidentiality. The focus here is on architecture and outcomes — not logos."
        />

        <div className="mx-auto mt-6 flex max-w-2xl items-center justify-center gap-2 text-xs text-muted-foreground">
          <Lock className="h-3.5 w-3.5 text-primary/70" />
          Client names, screenshots &amp; proprietary details are intentionally
          withheld.
        </div>

        <RevealGroup
          className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2"
          stagger={0.12}
        >
          {CASE_STUDIES.map((study) => (
            <motion.div key={study.index} variants={revealChild} className="group">
              <TiltCard intensity={6} className="h-full">
                <article className="glass relative flex h-full flex-col overflow-hidden rounded-3xl p-8 transition-colors duration-300 group-hover:border-primary/30">
                  {/* accent glow */}
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
                    style={{ background: `hsl(${study.accent} / 0.6)` }}
                  />

                  <div className="flex items-start justify-between">
                    <span
                      className="text-5xl font-bold tracking-tight text-transparent"
                      style={{
                        WebkitTextStroke: `1px hsl(${study.accent} / 0.5)`,
                      }}
                    >
                      {study.index}
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-secondary/40 text-muted-foreground transition-all duration-300 group-hover:rotate-45 group-hover:border-primary/40 group-hover:text-primary">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-semibold leading-tight">
                    {study.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {study.summary}
                  </p>

                  <div className="mt-6">
                    <p className="text-xs font-medium uppercase tracking-wider text-primary/80">
                      Focus areas
                    </p>
                    <ul className="mt-3 space-y-2">
                      {study.focus.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-sm text-foreground/85"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-6">
                    <div className="flex flex-wrap gap-2 border-t border-border/60 pt-5">
                      {study.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-secondary/50 px-2.5 py-1 text-xs text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
