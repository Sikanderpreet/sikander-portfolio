"use client";

import { m, type Variants } from "framer-motion";
import { ArrowDown, Check, Download } from "lucide-react";
import { FACTS, JOB_STAGES, SITE } from "@/lib/data";
import { DemoFrame, EASE, fadeUp, stagger } from "@/components/motion";

const word: Variants = {
  hidden: { opacity: 0, y: "0.55em" },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
};

const sticker: Variants = {
  hidden: { opacity: 0, scale: 0.85, rotate: 0 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotate: i % 2 === 0 ? -2 : 1.5,
    transition: { type: "spring", stiffness: 420, damping: 22 },
  }),
};

const LINE_1 = ["I", "build", "the", "APIs"];

export function Hero() {
  return (
    <section id="top" className="container pb-16 pt-10 lg:pb-24 lg:pt-16">
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Copy */}
        <m.div initial="hidden" animate="show" variants={stagger(0.05)}>
          <m.p variants={fadeUp} className="chip bg-cream font-mono text-xs uppercase tracking-wider sm:text-sm">
            <span className="h-2.5 w-2.5 rotate-[-18deg] rounded-[2px] bg-tomato" />
            open to backend roles<span className="hidden sm:inline"> · {SITE.openTo.toLowerCase()}</span>
          </m.p>

          <h1 className="mt-7 text-[2.7rem] font-black leading-[0.98] tracking-tight sm:text-7xl lg:text-[4.1rem] xl:text-[4.4rem]">
            <span className="block">
              {LINE_1.map((w) => (
                <m.span key={w} variants={word} className="mr-[0.22em] inline-block">
                  {w}
                </m.span>
              ))}
            </span>
            <span className="block">
              <m.span variants={word} className="mr-[0.22em] inline-block">
                behind
              </m.span>
              <m.span variants={word} className="marker">
                <m.span
                  aria-hidden="true"
                  className="marker-bg"
                  variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.35, ease: EASE, delay: 0.2 } } }}
                />
                real apps.
              </m.span>
            </span>
          </h1>

          <m.p variants={fadeUp} className="mt-7 max-w-xl text-lg font-medium leading-relaxed text-ink/80 sm:text-xl">
            Hi, I&apos;m <strong className="font-extrabold text-ink">{SITE.name}</strong>, a Node.js backend developer
            with 4+ years of building production APIs for web and mobile apps, mostly for US clients.
          </m.p>

          <m.div variants={fadeUp} className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="#work" className="btn bg-ink text-paper">
              See my work
              <ArrowDown className="h-4 w-4" strokeWidth={3} />
            </a>
            <a href={SITE.resume} download className="btn bg-cream">
              <Download className="h-4 w-4" strokeWidth={3} />
              Download resume
            </a>
          </m.div>
        </m.div>

        {/* Motion graphic */}
        <m.div
          initial={{ opacity: 0, y: 30, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: 1.2 }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.15 }}
        >
          <JobFlow />
        </m.div>
      </div>

      {/* Fact stickers */}
      <m.ul
        initial="hidden"
        animate="show"
        variants={stagger(0.06, 0.45)}
        className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
      >
        {FACTS.map((f, i) => (
          <m.li key={f.big} custom={i} variants={sticker} className="card px-5 py-4">
            <p className="text-2xl font-black tracking-tight sm:text-3xl">{f.big}</p>
            <p className="mt-1 text-sm font-semibold leading-snug text-grey">{f.small}</p>
          </m.li>
        ))}
      </m.ul>
    </section>
  );
}

const ROW = 78; // px per stage row; the job marker moves by exactly this much

function JobFlow() {
  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b-[3px] border-ink bg-sand px-5 py-3">
        <p className="font-extrabold">A LoopDeco pickup, start to finish</p>
        <span className="font-mono text-xs font-bold text-grey">loop</span>
      </div>
      <DemoFrame label="Animation: a pickup job moving through estimate, driver assigned, collected and paid." className="px-5 py-5">
        <div className="relative">
          {/* rail */}
          <div className="absolute bottom-[39px] left-[47px] top-[39px] w-[3px] bg-ink" />
          {/* the job: the tomato cursor square from the brand */}
          <div
            className="lp absolute left-0 top-[27px] z-10"
            style={{ animationName: "job-move", "--dur": "7s", "--step": `${ROW}px` } as React.CSSProperties}
          >
            <div className="flex h-6 w-6 rotate-[-18deg] items-center justify-center rounded-[5px] border-[3px] border-ink bg-tomato" />
          </div>
          <ol>
            {JOB_STAGES.map((s, i) => (
              <li key={s.label} className="flex items-center gap-4 pl-[30px]" style={{ height: ROW }}>
                <span
                  className="lp relative z-[1] grid h-9 w-9 shrink-0 place-items-center rounded-full border-[3px] border-ink bg-sunflower"
                  style={{ animationName: `stage-${i + 1}`, "--dur": "7s" } as React.CSSProperties}
                >
                  <Check
                    className="lp h-4 w-4"
                    strokeWidth={4}
                    style={{ animationName: `tick-${i + 1}`, "--dur": "7s" } as React.CSSProperties}
                  />
                </span>
                <span>
                  <span className="block font-extrabold leading-tight">{s.label}</span>
                  <span className="block text-sm font-semibold leading-snug text-grey">{s.note}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </DemoFrame>
    </div>
  );
}
