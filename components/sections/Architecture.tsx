"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ARCHITECTURE } from "@/lib/data";

export function Architecture() {
  return (
    <section id="architecture" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,hsl(var(--brand-cyan)/0.08),transparent_60%)]" />

      <div className="container">
        <SectionHeading
          eyebrow="Architecture"
          title={
            <>
              How a request{" "}
              <span className="text-gradient">flows through the system</span>
            </>
          }
          description="A representative request lifecycle — from edge to data and back — built for clear separation of concerns and graceful scale."
        />

        <div className="mx-auto mt-16 flex max-w-xl flex-col items-stretch">
          {ARCHITECTURE.map((node, i) => {
            const Icon = node.icon;
            return (
              <Fragment key={node.label}>
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative"
                >
                  <div className="glass relative flex items-center gap-4 overflow-hidden rounded-2xl p-5 transition-colors duration-300 hover:border-primary/40">
                    {/* shimmer sweep */}
                    <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{node.label}</h3>
                      <p className="text-sm text-muted-foreground">
                        {node.description}
                      </p>
                    </div>
                    <span className="ml-auto font-mono text-xs text-muted-foreground/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </motion.div>

                {i < ARCHITECTURE.length - 1 && (
                  <div className="relative mx-auto flex h-12 w-px items-center justify-center">
                    {/* glowing connector */}
                    <motion.span
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05 + 0.1 }}
                      className="absolute h-full w-px origin-top bg-gradient-to-b from-primary/70 to-primary/20"
                    />
                    {/* travelling pulse */}
                    <motion.span
                      className="absolute h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_2px_hsl(var(--brand-emerald)/0.9)]"
                      animate={{ y: [-18, 18], opacity: [0, 1, 0] }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut",
                      }}
                    />
                    <ChevronDown className="relative z-10 h-4 w-4 text-primary/60" />
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
