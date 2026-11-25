import { SITE } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t-[3px] border-ink bg-ink text-paper">
      <div className="container flex flex-col items-center justify-between gap-3 py-8 text-sm font-semibold sm:flex-row">
        <p>
          © {new Date().getFullYear()} {SITE.name} · {SITE.location}
        </p>
        <p className="font-mono text-paper/70">built with Next.js</p>
      </div>
    </footer>
  );
}
