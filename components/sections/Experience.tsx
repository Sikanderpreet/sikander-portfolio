"use client";

import { useRef } from "react";
import { m, useScroll } from "framer-motion";
import { EXPERIENCE } from "@/lib/data";
import { EASE, SectionTitle } from "@/components/motion";
import { cn } from "@/lib/utils";

/**
 * The timeline line draws itself as you scroll (kept from the old site, on
 * request), and each role swings in from its side as it reaches the line.
 */
export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });

  return (
    <section id="experience" className="border-y-[3px] border-ink bg-sand/60 py-20 lg:py-28">
      <div className="container">
        <SectionTitle eyebrow="Experience" before="From the classroom to" mark="production" />

        <div ref={ref} className="relative mx-auto max-w-4xl">
          {/* rail + the part that fills as you scroll */}
          <div className="absolute bottom-0 left-[18px] top-0 w-[4px] rounded-full bg-ink/15 md:left-1/2 md:-ml-[2px]" />
          <m.div
            style={{ scaleY: scrollYProgress }}
            className="absolute bottom-0 left-[18px] top-0 w-[4px] origin-top rounded-full bg-tomato md:left-1/2 md:-ml-[2px]"
          />

          <ol className="flex flex-col gap-10 md:gap-14">
            {EXPERIENCE.map((job, i) => {
              const left = i % 2 === 0;
              return (
                <li
                  key={job.company}
                  className={cn("relative pl-14 md:w-1/2 md:pl-0", left ? "md:self-start md:pr-12" : "md:self-end md:pl-12")}
                >
                  {/* node */}
                  <m.span
                    initial={{ scale: 0, rotate: -40 }}
                    whileInView={{ scale: 1, rotate: -18 }}
                    viewport={{ once: true, margin: "-25% 0px" }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className={cn(
                      "absolute left-[6px] top-6 h-7 w-7 rounded-[6px] border-[3px] border-ink",
                      i === 0 ? "bg-tomato" : "bg-sunflower",
                      left ? "md:left-auto md:-right-[14px]" : "md:-left-[14px]"
                    )}
                  />
                  <m.div
                    initial={{ opacity: 0, x: left ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-20% 0px" }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="card p-6"
                  >
                    <p className="font-mono text-xs font-bold uppercase tracking-wider text-grey">{job.period}</p>
                    <h3 className="mt-2 text-2xl font-black leading-tight tracking-tight">{job.role}</h3>
                    <p className="mt-1 font-extrabold">
                      {job.company} <span className="font-semibold text-grey">· {job.where}</span>
                    </p>
                    <ul className="mt-4 space-y-2">
                      {job.points.map((pt) => (
                        <li key={pt} className="flex gap-2.5 text-[15px] font-medium leading-relaxed text-ink/80">
                          <span className="mt-2 h-2 w-2 shrink-0 rotate-[-18deg] rounded-[2px] bg-tomato" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </m.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
