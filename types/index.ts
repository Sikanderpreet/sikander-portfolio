import type { LucideIcon } from "lucide-react";

/** Single floating tech badge shown in the hero. */
export interface TechBadge {
  name: string;
  /** Tailwind gradient classes used for the badge glow. */
  glow: string;
}

/** Animated metric used in About / Stats sections. */
export interface Stat {
  value: number;
  /** Suffix appended after the animated number, e.g. "+". */
  suffix?: string;
  /** A non-numeric headline value, e.g. "Node.js". Overrides `value`. */
  label?: string;
  caption: string;
}

/** A grouped collection of technologies for the tech-stack grid. */
export interface TechCategory {
  title: string;
  icon: LucideIcon;
  accent: string;
  items: string[];
}

/** One role in the professional-experience timeline. */
export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

/** A confidential, anonymized case study. */
export interface CaseStudy {
  index: string;
  title: string;
  summary: string;
  technologies: string[];
  focus: string[];
  accent: string;
}

/** A single node in the architecture flow diagram. */
export interface ArchNode {
  label: string;
  description: string;
  icon: LucideIcon;
}

/** Navigation anchor link. */
export interface NavLink {
  label: string;
  href: string;
}
