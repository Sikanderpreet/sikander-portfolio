"use client";

import { m, type Variants } from "framer-motion";
import { CORE_SKILLS, INTEGRATIONS, PROJECT_SKILLS } from "@/lib/data";
import { SectionTitle, fadeUp, stagger } from "@/components/motion";

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 520, damping: 24 } },
};

export function Skills() {
  return (
    <section id="skills" className="container py-20 lg:py-28">
      <SectionTitle eyebrow="Skills" before="What I" mark="work with" />

      <div className="grid gap-8 lg:grid-cols-2">
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger(0.05)}
          className="card bg-sunflower p-7"
        >
          <m.h3 variants={fadeUp} className="text-2xl font-black">
            Strongest in
          </m.h3>
          <m.p variants={fadeUp} className="mt-1 font-semibold text-ink/75">
            What I use every day and can explain in depth.
          </m.p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {CORE_SKILLS.map((s) => (
              <m.li key={s} variants={pop} className="chip bg-cream px-5 py-2 text-lg shadow-hard-sm">
                {s}
              </m.li>
            ))}
          </ul>
        </m.div>

        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger(0.04)}
          className="card p-7"
        >
          <m.h3 variants={fadeUp} className="text-2xl font-black">
            Also used in project work
          </m.h3>
          <m.p variants={fadeUp} className="mt-1 font-semibold text-ink/75">
            Real projects I worked on used these.
          </m.p>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {PROJECT_SKILLS.map((s) => (
              <m.li key={s} variants={pop} className="chip bg-sand px-3.5 py-1 text-sm">
                {s}
              </m.li>
            ))}
          </ul>
          <m.p variants={fadeUp} className="eyebrow mt-7 text-xs">
            Integrations in project work
          </m.p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {INTEGRATIONS.map((s) => (
              <m.li key={s} variants={pop} className="rounded-md border-2 border-ink bg-paper px-2 py-0.5 font-mono text-xs font-bold">
                {s}
              </m.li>
            ))}
          </ul>
        </m.div>
      </div>
    </section>
  );
}
