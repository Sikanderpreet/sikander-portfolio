"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { EXPERIENCE } from "@/lib/data";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Experience"
          title={
            <>
              A track record of <span className="text-gradient">shipping</span>
            </>
          }
          description="From the classroom to production systems — a path defined by curiosity and a bias toward building things that last."
        />

        <div ref={ref} className="relative mx-auto mt-16 max-w-3xl">
          {/* Static rail */}
          <div className="absolute left-4 top-2 h-full w-px bg-border/60 sm:left-1/2" />
          {/* Animated progress line */}
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-4 top-2 h-full w-px origin-top bg-gradient-to-b from-emerald via-cyan to-violet sm:left-1/2"
          />

          <div className="flex flex-col gap-12">
            {EXPERIENCE.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={item.company}
                  className={`relative pl-12 sm:w-1/2 sm:pl-0 ${
                    isLeft
                      ? "sm:self-start sm:pr-12 sm:text-right"
                      : "sm:self-end sm:pl-12"
                  }`}
                >
                  {/* Node */}
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className={`absolute top-1.5 left-0 grid h-8 w-8 place-items-center rounded-full bg-card ring-2 ring-primary/40 sm:left-auto ${
                      isLeft ? "sm:-right-4" : "sm:-left-4"
                    }`}
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_12px_2px_hsl(var(--brand-emerald)/0.8)]" />
                  </motion.span>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="gradient-border rounded-2xl p-6 text-left"
                  >
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
                      <Briefcase className="h-3.5 w-3.5" />
                      {item.period}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold">{item.role}</h3>
                    <p className="text-sm text-muted-foreground">{item.company}</p>

                    <ul className="mt-4 space-y-2">
                      {item.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
