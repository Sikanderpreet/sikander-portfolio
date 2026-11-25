"use client";

import { m } from "framer-motion";
import { Check, Clock } from "lucide-react";
import { PRINCIPLES, type PrincipleDemo } from "@/lib/data";
import { DemoFrame, SectionTitle, fadeUp, stagger } from "@/components/motion";

type Style = React.CSSProperties & Record<`--${string}`, string>;
const anim = (name: string, extra: Style = {}): Style => ({ animationName: name, ...extra });

export function HowIWork() {
  return (
    <section id="how-i-work" className="container pb-20 lg:pb-28">
      <SectionTitle eyebrow="How I work" before="Four rules I" mark="build by" />
      <m.ol
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger(0.08)}
        className="grid gap-6 md:grid-cols-2 lg:gap-8"
      >
        {PRINCIPLES.map((p, i) => (
          <m.li key={p.title} variants={fadeUp} className="card flex flex-col overflow-hidden">
            <DemoFrame label={`Animation: ${p.label}`} className="h-[160px] border-b-[3px] border-ink bg-paper">
              <Mini kind={p.demo} />
            </DemoFrame>
            <div className="flex flex-1 flex-col p-6">
              <span className="font-mono text-sm font-bold text-grey">rule {i + 1}</span>
              <h3 className="mt-1 text-2xl font-black leading-tight tracking-tight">{p.title}</h3>
              <p className="mt-3 font-medium leading-relaxed text-ink/80">{p.proof}</p>
            </div>
          </m.li>
        ))}
      </m.ol>
    </section>
  );
}

/** Shared 300x150 stage, centred in the strip. */
function Stage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="relative h-[120px] w-[300px] shrink-0 font-semibold md:scale-110 xl:scale-[1.2]">{children}</div>
    </div>
  );
}

function Mini({ kind }: { kind: PrincipleDemo }) {
  switch (kind) {
    /* Phone keeps getting answers while the server behind it is swapped. */
    case "no-break":
      return (
        <Stage>
          <div className="absolute left-0 top-[14px] flex h-[92px] w-[56px] flex-col items-center justify-center rounded-xl border-[3px] border-ink bg-cream">
            <span className="text-[10px] font-extrabold leading-tight">driver</span>
            <span className="text-[10px] font-extrabold leading-tight">app</span>
            <span className="mt-1.5 h-1.5 w-5 rounded-full bg-ink" />
          </div>
          <div className="absolute left-[64px] top-[58px] h-[3px] w-[110px] bg-ink" />
          {/* request out, answer back, forever */}
          <span className="lp absolute left-[62px] top-[45px] h-3 w-3 rounded-full border-2 border-ink bg-tomato" style={anim("hop", { "--hop": "104px", "--dur": "1.6s" })} />
          <span
            className="lp absolute left-[166px] top-[63px] h-3 w-3 rounded-full border-2 border-ink bg-sunflower"
            style={anim("hop", { "--hop": "-104px", "--dur": "1.6s", animationDelay: "0.8s" })}
          />
          <div className="absolute left-[178px] top-[22px] h-[76px] w-[122px] rounded-xl border-[3px] border-ink bg-cream">
            <span className="lp absolute inset-0 grid place-items-center text-center text-sm font-extrabold opacity-0" style={anim("swap-a", { "--dur": "7s" })}>
              API v1
              <br />
              <span className="font-mono text-[11px] text-grey">Express</span>
            </span>
            <span className="lp absolute inset-0 grid place-items-center text-center text-sm font-extrabold" style={anim("swap-b", { "--dur": "7s" })}>
              API v2
              <br />
              <span className="font-mono text-[11px] text-grey">NestJS</span>
            </span>
          </div>
          <span className="absolute left-[90px] top-[80px] rounded-md border-2 border-ink bg-sunflower px-1.5 font-mono text-[11px] font-bold">
            200 OK
          </span>
        </Stage>
      );

    /* Two drivers press Accept at once; exactly one wins. */
    case "same-click":
      return (
        <Stage>
          <div
            className="lp absolute left-[106px] top-[38px] grid h-[44px] w-[88px] place-items-center rounded-xl border-[3px] border-ink bg-sunflower font-extrabold"
            style={anim("press", { "--dur": "4.5s" })}
          >
            Accept
          </div>
          {/* left driver: wins */}
          <div className="lp absolute left-[38px] top-[46px]" style={anim("cursor-l", { "--dur": "4.5s" })}>
            <div className="grid h-[34px] w-[60px] place-items-center rounded-lg border-[3px] border-ink bg-cream text-[11px] font-extrabold">
              Driver A
            </div>
            <span className="lp absolute -left-3 -top-4 grid h-7 w-7 place-items-center rounded-full border-[3px] border-ink bg-sunflower" style={anim("b-check", { "--dur": "4.5s" })}>
              <Check className="h-4 w-4" strokeWidth={4} />
            </span>
          </div>
          {/* right driver: too late */}
          <div className="lp absolute left-[202px] top-[46px]" style={anim("cursor-r", { "--dur": "4.5s" })}>
            <div className="grid h-[34px] w-[60px] place-items-center rounded-lg border-[3px] border-ink bg-cream text-[11px] font-extrabold">
              Driver B
            </div>
            <span
              className="lp absolute -right-4 -top-4 rotate-[-8deg] rounded-md border-[3px] border-tomato bg-cream px-1.5 font-mono text-[11px] font-bold text-tomato"
              style={anim("taken", { "--dur": "4.5s" })}
            >
              TAKEN
            </span>
          </div>
        </Stage>
      );

    /* Scheduled: yes. Actually ran: no -> yes after the fix. */
    case "really-ran":
      return (
        <Stage>
          <div className="absolute left-0 top-[8px] flex h-[46px] w-[300px] items-center gap-3 rounded-xl border-[3px] border-ink bg-cream px-3">
            <Clock className="lp h-6 w-6" strokeWidth={2.5} style={anim("spin", { "--dur": "3s", animationTimingFunction: "linear" })} />
            <span className="font-extrabold">Scheduled</span>
            <span className="whitespace-nowrap font-mono text-[11px] text-grey">nightly, 02:00</span>
            <span className="ml-auto grid h-6 w-6 place-items-center rounded-full border-2 border-ink bg-sunflower">
              <Check className="h-3.5 w-3.5" strokeWidth={4} />
            </span>
          </div>
          <div className="absolute left-0 top-[66px] flex h-[46px] w-[300px] items-center gap-3 rounded-xl border-[3px] border-ink bg-cream px-3">
            <span className="font-extrabold">Actually ran?</span>
            <span className="relative ml-auto h-7 w-[132px]">
              <span
                className="lp absolute inset-0 grid place-items-center rounded-md border-2 border-tomato font-mono text-xs font-bold text-tomato opacity-0"
                style={anim("swap-a", { "--dur": "6s" })}
              >
                0 runs, ever
              </span>
              <span className="lp absolute inset-0 grid place-items-center rounded-md border-2 border-ink bg-sunflower font-mono text-xs font-bold" style={anim("swap-b", { "--dur": "6s" })}>
                ran 02:00 ✓
              </span>
            </span>
          </div>
        </Stage>
      );

    /* A plain diagram draws itself; "?" becomes "got it". */
    case "explain":
      return (
        <Stage>
          {[
            { t: "request", x: 0 },
            { t: "API", x: 112 },
            { t: "database", x: 200 },
          ].map((b) => (
            <span
              key={b.t}
              className="absolute top-[56px] grid h-[40px] place-items-center rounded-lg border-[3px] border-ink bg-cream px-2 text-xs font-extrabold"
              style={{ left: b.x, width: b.t === "API" ? 56 : b.t === "request" ? 76 : 100 }}
            >
              {b.t}
            </span>
          ))}
          <svg className="absolute inset-0" width="300" height="120" aria-hidden="true">
            {["M80 76 L106 76", "M172 76 L194 76"].map((d, i) => (
              <path
                key={d}
                d={d}
                pathLength={1}
                stroke="#ff5b35"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="1"
                className="lp"
                style={anim("draw", { "--dur": "5s", animationDelay: `${i * 0.5}s` })}
              />
            ))}
          </svg>
          <span className="absolute left-[96px] top-[2px] h-[38px] w-[108px]">
            <span className="lp absolute inset-0 grid place-items-center rounded-xl border-[3px] border-ink bg-cream text-xl font-black opacity-0" style={anim("swap-a", { "--dur": "5s" })}>
              ?
            </span>
            <span className="lp absolute inset-0 grid place-items-center rounded-xl border-[3px] border-ink bg-sunflower text-sm font-extrabold" style={anim("swap-b", { "--dur": "5s" })}>
              got it!
            </span>
          </span>
        </Stage>
      );
  }
}
