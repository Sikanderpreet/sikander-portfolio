import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";

/**
 * Below-the-fold sections are dynamically imported so the heavier animation
 * code is split into separate chunks and streamed in as the user scrolls.
 * SSR stays enabled (default) to keep the content crawlable and SEO-friendly.
 */
const sectionFallback = (
  <div className="container py-32">
    <div className="mx-auto h-64 max-w-3xl animate-pulse rounded-3xl bg-card/40" />
  </div>
);

const About = dynamic(
  () => import("@/components/sections/About").then((m) => m.About),
  { loading: () => sectionFallback }
);
const TechStack = dynamic(
  () => import("@/components/sections/TechStack").then((m) => m.TechStack),
  { loading: () => sectionFallback }
);
const Experience = dynamic(
  () => import("@/components/sections/Experience").then((m) => m.Experience),
  { loading: () => sectionFallback }
);
const Work = dynamic(
  () => import("@/components/sections/Work").then((m) => m.Work),
  { loading: () => sectionFallback }
);
const Architecture = dynamic(
  () => import("@/components/sections/Architecture").then((m) => m.Architecture),
  { loading: () => sectionFallback }
);
const Stats = dynamic(
  () => import("@/components/sections/Stats").then((m) => m.Stats),
  { loading: () => sectionFallback }
);
const Contact = dynamic(
  () => import("@/components/sections/Contact").then((m) => m.Contact),
  { loading: () => sectionFallback }
);

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <TechStack />
      <Experience />
      <Work />
      <Architecture />
      <Stats />
      <Contact />
    </>
  );
}
