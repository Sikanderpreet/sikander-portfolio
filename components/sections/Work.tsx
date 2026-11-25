"use client";

import { m } from "framer-motion";
import { PROJECTS, type Project } from "@/lib/data";
import { Demo } from "@/components/demos";
import { DemoFrame, EASE, SectionTitle, fadeUp, stagger } from "@/components/motion";
import { cn } from "@/lib/utils";

export function Work() {
  return (
    <section id="work" className="container pb-20 pt-6 lg:pb-28 lg:pt-10">
      <SectionTitle eyebrow="Work" before="Projects I've" mark="worked on" />
      <div className="flex flex-col gap-14 lg:gap-20">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} p={p} flip={i % 2 === 1} n={i + 1} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ p, flip, n }: { p: Project; flip: boolean; n: number }) {
  return (
    <m.article
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      variants={stagger(0.06)}
      className="card grid overflow-hidden lg:grid-cols-[1.25fr_1fr]"
    >
      {/* Text */}
      <div className={cn("p-6 sm:p-9", flip && "lg:order-2")}>
        <m.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg border-[3px] border-ink bg-ink font-mono font-bold text-paper">
            {String(n).padStart(2, "0")}
          </span>
          <h3 className="text-3xl font-black tracking-tight sm:text-4xl">{p.name}</h3>
        </m.div>
        <m.p variants={fadeUp} className="mt-3 font-bold text-grey">
          {p.kind}
        </m.p>
        <m.div variants={fadeUp} className="mt-4 flex flex-wrap gap-2 text-sm">
          <span className="chip bg-sunflower py-1 text-sm">{p.role}</span>
          <span className="chip bg-cream py-1 font-mono text-xs">{p.period}</span>
        </m.div>
        <m.p variants={fadeUp} className="mt-5 text-lg font-medium leading-relaxed text-ink/85">
          {p.summary}
        </m.p>

        <m.ul variants={stagger(0.05)} className="mt-7 grid gap-4 sm:grid-cols-2 sm:[&>li:last-child:nth-child(odd)]:col-span-2">
          {p.stories.map((s) => (
            <m.li key={s.title} variants={fadeUp} className="rounded-xl border-[3px] border-ink bg-paper p-4">
              <p className="flex items-start gap-2 font-extrabold leading-snug">
                <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rotate-[-18deg] rounded-[2px] bg-tomato" />
                {s.title}
              </p>
              <p className="mt-1.5 text-sm font-medium leading-relaxed text-ink/75">{s.body}</p>
            </m.li>
          ))}
        </m.ul>

        <m.div variants={fadeUp} className="mt-7">
          <p className="eyebrow text-xs">Project stack</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {p.stack.map((t) => (
              <li key={t} className="rounded-md border-2 border-ink bg-sand px-2 py-0.5 font-mono text-xs font-bold">
                {t}
              </li>
            ))}
          </ul>
        </m.div>
      </div>

      {/* Motion graphic */}
      <div
        className={cn(
          "flex flex-col justify-center gap-4 border-t-[3px] border-ink bg-paper p-6 sm:p-8 lg:border-t-0",
          flip ? "lg:order-1 lg:border-r-[3px]" : "lg:border-l-[3px]"
        )}
      >
        <m.div
          variants={{ hidden: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } } }}
        >
          <DemoFrame label={`Animation: ${p.demoCaption}`}>
            <Demo kind={p.demo} />
          </DemoFrame>
        </m.div>
        <m.p variants={fadeUp} className="text-center text-sm font-bold text-grey">
          {p.demoCaption}
        </m.p>
      </div>
    </m.article>
  );
}
