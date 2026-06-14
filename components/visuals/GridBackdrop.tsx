import { cn } from "@/lib/utils";

/** Decorative faded grid backdrop. */
export function GridBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 bg-grid-pattern bg-[size:56px_56px] mask-radial-faded opacity-60",
        className
      )}
    />
  );
}
