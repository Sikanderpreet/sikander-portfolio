"use client";

/**
 * Four tiny looping motion graphics, one per project. Each shows the real
 * problem that project solved. Pure CSS animations on a fixed 300x250 canvas
 * (keyframes live in globals.css); DemoFrame pauses them when off screen.
 */
import { Check, Cog } from "lucide-react";
import type { DemoKind } from "@/lib/data";
import { cn } from "@/lib/utils";

type Style = React.CSSProperties & Record<`--${string}`, string>;

const anim = (name: string, extra: Style = {}): Style => ({ animationName: name, ...extra });
const path = (d: string, name: string, extra: Style = {}): Style => ({
  offsetPath: `path('${d}')`,
  offsetRotate: "0deg",
  animationName: name,
  ...extra,
});

function Canvas({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[250px] items-center justify-center lg:h-[345px]">
      <div className="relative h-[250px] w-[300px] shrink-0 font-semibold lg:scale-[1.32]">{children}</div>
    </div>
  );
}

function Box({ className, children, style }: { className?: string; children: React.ReactNode; style?: Style }) {
  return (
    <div
      style={style}
      className={cn("absolute flex flex-col items-center justify-center rounded-xl border-[3px] border-ink bg-cream text-center", className)}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- LoopDeco */
function NoDoubleBooking() {
  const drivers = [
    { id: "A", x: 7 },
    { id: "B", x: 107 },
    { id: "C", x: 207 },
  ];
  const lines = ["M150 54 L50 150", "M150 54 L150 150", "M150 54 L250 150"];
  return (
    <Canvas>
      <svg className="absolute inset-0" width="300" height="250" aria-hidden="true">
        {lines.map((d) => (
          <path key={d} d={d} stroke="#16141a" strokeWidth="3" strokeDasharray="6 6" fill="none" />
        ))}
      </svg>
      {lines.map((d) => (
        <span key={d} className="lp absolute left-0 top-0 h-3.5 w-3.5 rounded-full border-[3px] border-ink bg-tomato" style={path(d, "offer-path")} />
      ))}
      <Box className="lp left-[60px] top-[8px] h-[46px] w-[180px] flex-row gap-2 bg-cream shadow-hard-sm" style={anim("ticket-in")}>
        <span className="h-3.5 w-3.5 rotate-[-18deg] rounded-[3px] bg-tomato" />
        <span className="font-extrabold">New pickup job</span>
      </Box>
      {drivers.map((d) => {
        const winner = d.id === "B";
        return (
          <div
            key={d.id}
            className={cn("absolute top-[150px] w-[86px]", !winner && "lp opacity-[0.45]")}
            style={{ left: d.x, ...(winner ? {} : anim("dim-driver")) }}
          >
            <div className="relative rounded-xl border-[3px] border-ink bg-cream px-2 pb-2 pt-2 text-center">
              <div className="mx-auto h-7 w-7 rounded-full border-[3px] border-ink bg-sand" />
              <p className="mt-1 text-xs font-extrabold">Driver {d.id}</p>
              <div
                className={cn("lp mt-1.5 rounded-md border-2 border-ink py-0.5 text-[11px] font-extrabold", winner ? "bg-sunflower" : "bg-cream")}
                style={winner ? anim("accept") : undefined}
              >
                Accept
              </div>
              {winner ? (
                <span className="lp absolute -right-3 -top-3 grid h-7 w-7 place-items-center rounded-full border-[3px] border-ink bg-sunflower" style={anim("b-check")}>
                  <Check className="h-4 w-4" strokeWidth={4} />
                </span>
              ) : (
                <span
                  className="lp absolute -top-4 left-[14px] rotate-[-8deg] rounded-md border-[3px] border-tomato bg-cream px-1.5 font-mono text-[11px] font-bold text-tomato"
                  style={anim("taken")}
                >
                  TAKEN
                </span>
              )}
            </div>
          </div>
        );
      })}
    </Canvas>
  );
}

/* ---------------------------------------------------------------- SideXSide */
function LiveTracking() {
  const route = "M28 118 C 90 10, 170 170, 272 40";
  const hops = ["driver", "api-1", "redis", "api-2", "rider"];
  return (
    <Canvas>
      <svg className="absolute inset-0" width="300" height="250" aria-hidden="true">
        <path d={route} stroke="#e7e1d5" strokeWidth="14" fill="none" strokeLinecap="round" />
        <path d={route} stroke="#16141a" strokeWidth="3" strokeDasharray="7 7" fill="none" />
      </svg>
      <span className="absolute left-[16px] top-[106px] h-6 w-6 rounded-full border-[3px] border-ink bg-cream" />
      <span className="absolute left-[2px] top-[134px] text-xs font-extrabold">driver</span>
      <span className="absolute left-[260px] top-[28px] h-6 w-6 rotate-45 rounded-[4px] border-[3px] border-ink bg-sunflower" />
      <span className="absolute left-[252px] top-[60px] text-xs font-extrabold">rider</span>
      <span className="lp absolute left-0 top-0" style={path(route, "drive", { "--dur": "6s" })}>
        <span className="relative block h-6 w-6 rotate-[-18deg] rounded-[5px] border-[3px] border-ink bg-tomato">
          <span className="lp absolute inset-0 rounded-[5px] border-[3px] border-tomato" style={anim("ping", { "--dur": "1.2s" })} />
        </span>
      </span>

      <div className="absolute left-0 top-[180px] flex w-[300px] items-center justify-between">
        {hops.map((h) => (
          <span key={h} className="rounded-md border-[3px] border-ink bg-cream px-1.5 py-1 font-mono text-[11px] font-bold">
            {h}
          </span>
        ))}
      </div>
      <div className="absolute left-[14px] top-[217px] h-[3px] w-[272px] bg-ink" />
      <span
        className="lp absolute left-[14px] top-[211px] h-[15px] w-[15px] rounded-full border-[3px] border-ink bg-tomato"
        style={anim("hop", { "--hop": "258px", "--dur": "3s" })}
      />
    </Canvas>
  );
}

/* ---------------------------------------------------------------- Boost!Plug */
function QueueWorkers() {
  return (
    <Canvas>
      {/* API answers immediately */}
      <Box className="left-0 top-[34px] h-[60px] w-[72px]">
        <span className="font-extrabold">API</span>
        <span className="font-mono text-[10px] text-grey">request in</span>
      </Box>
      <span
        className="lp absolute left-[8px] top-[4px] rounded-md border-[3px] border-ink bg-sunflower px-1.5 font-mono text-xs font-bold"
        style={anim("ok-flash")}
      >
        200 OK
      </span>

      {/* queue */}
      <Box className="left-[96px] top-[34px] h-[60px] w-[100px] flex-row gap-1.5 bg-sand">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-5 w-5 rounded-[4px] border-2 border-dashed border-ink/50" />
        ))}
      </Box>
      <span className="absolute left-[118px] top-[100px] font-mono text-[11px] font-bold">RabbitMQ</span>

      {/* worker */}
      <Box className="left-[222px] top-[34px] h-[60px] w-[78px]">
        <Cog className="lp h-7 w-7" strokeWidth={2.5} style={anim("spin", { "--dur": "2.4s", animationTimingFunction: "linear" })} />
        <span className="font-mono text-[10px] text-grey">worker</span>
      </Box>
      <span
        className="lp absolute left-[206px] top-[4px] whitespace-nowrap rounded-md border-[3px] border-tomato bg-cream px-1.5 font-mono text-xs font-bold text-tomato"
        style={anim("retry-tag")}
      >
        429 → retry
      </span>

      {/* jobs travelling API -> queue -> worker */}
      {[0, 0.35, 0.7].map((delay) => (
        <span
          key={delay}
          className="lp absolute left-[76px] top-[55px] h-[18px] w-[18px] rotate-[-18deg] rounded-[4px] border-[3px] border-ink bg-tomato"
          style={anim("to-worker", { "--to": "156px", animationDelay: `${delay}s` })}
        />
      ))}

      {/* search index filling up */}
      <p className="absolute left-0 top-[134px] font-mono text-[11px] font-bold">search index (Pinecone)</p>
      <div className="absolute left-0 top-[156px] grid w-[300px] grid-cols-10 gap-2">
        {Array.from({ length: 30 }, (_, i) => (
          <span
            key={i}
            className="lp mx-auto h-4 w-4 rounded-full border-2 border-ink bg-tomato"
            style={anim("dot-on", { animationDelay: `${(i % 10) * 0.05 + Math.floor(i / 10) * 0.12}s` })}
          />
        ))}
      </div>
    </Canvas>
  );
}

/* ---------------------------------------------------------------- K9 Stays */
function ThreePortals() {
  const portals = [
    { name: "Admin", role: "admin", y: 18 },
    { name: "Pet hotel", role: "business", y: 101 },
    { name: "Pet owner", role: "customer", y: 184 },
  ];
  return (
    <Canvas>
      <svg className="absolute inset-0" width="300" height="250" aria-hidden="true">
        {portals.map((p) => (
          <path key={p.name} d={`M118 ${p.y + 24} L176 125`} stroke="#16141a" strokeWidth="3" strokeDasharray="6 6" fill="none" />
        ))}
      </svg>
      {portals.map((p, i) => (
        <span
          key={p.name}
          className="lp absolute left-0 top-0 h-3.5 w-3.5 rounded-full border-[3px] border-ink bg-tomato"
          style={path(`M118 ${p.y + 24} L176 125`, "along", { animationDelay: `${i * 2}s` })}
        />
      ))}
      {portals.map((p) => (
        <Box key={p.name} className="left-0 h-[48px] w-[118px] items-start px-3" style={{ top: p.y } as Style}>
          <span className="text-sm font-extrabold leading-tight">{p.name}</span>
          <span className="font-mono text-[10px] font-bold text-grey">role: {p.role}</span>
        </Box>
      ))}
      <Box className="lp left-[176px] top-[92px] h-[66px] w-[124px] shadow-hard-sm" style={anim("api-hit", { "--dur": "2s" })}>
        <span className="font-extrabold">Express API</span>
        <span className="font-mono text-[10px] font-bold text-grey">checks the role</span>
      </Box>
    </Canvas>
  );
}

export function Demo({ kind }: { kind: DemoKind }) {
  switch (kind) {
    case "no-double-booking":
      return <NoDoubleBooking />;
    case "live-tracking":
      return <LiveTracking />;
    case "queue-workers":
      return <QueueWorkers />;
    case "three-portals":
      return <ThreePortals />;
  }
}
