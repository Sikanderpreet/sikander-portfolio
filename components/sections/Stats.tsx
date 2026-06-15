"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/visuals/AnimatedCounter";
import { RevealGroup, revealChild } from "@/components/visuals/Reveal";
import { STATS } from "@/lib/data";

export function Stats() {
  return (
    <section className="relative py-20">
      <div className="container">
        <div className="gradient-border overflow-hidden rounded-3xl">
          <div className="relative bg-card/40 p-8 sm:p-12">
            <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 mask-radial-faded" />
            <RevealGroup className="relative grid grid-cols-2 gap-8 lg:grid-cols-4">
              {STATS.map((stat) => (
                <motion.div
                  key={stat.caption}
                  variants={revealChild}
                  className="text-center"
                >
                  <div className="text-4xl font-bold tracking-tight text-gradient sm:text-5xl">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      label={stat.label}
                    />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {stat.caption}
                  </p>
                </motion.div>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
