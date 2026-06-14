import {
  Server,
  Database,
  Cloud,
  Brain,
  Radio,
  Plug,
  Wrench,
  ShieldCheck,
  GitBranch,
  Workflow,
  Boxes,
  Globe,
  type LucideIcon,
} from "lucide-react";
import type {
  TechBadge,
  TechCategory,
  ExperienceItem,
  CaseStudy,
  ArchNode,
  NavLink,
  Stat,
} from "@/types";

/** ----------------------------------------------------------------
 *  Identity / contact
 *  ---------------------------------------------------------------- */
export const SITE = {
  name: "Sikanderpreet Singh",
  title: "Backend Developer | Node.js Engineer",
  tagline:
    "Building scalable backend systems, AI-powered applications, and cloud-native services.",
  heroSubtitle:
    "Backend Developer specializing in scalable APIs, AI systems and cloud infrastructure.",
  location: "Faridabad, India",
  experience: "4+ Years",
  email: "sikanderpreetsingh01@gmail.com",
  linkedin: "https://linkedin.com/in/sikander-io",
  github: "https://github.com/sikander-io",
  resume: "/resume.pdf",
  url: "https://sikanderpreet.dev",
} as const;

/** ----------------------------------------------------------------
 *  Navigation
 *  ---------------------------------------------------------------- */
export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Architecture", href: "#architecture" },
  { label: "Contact", href: "#contact" },
];

/** ----------------------------------------------------------------
 *  Hero floating tech badges
 *  ---------------------------------------------------------------- */
export const HERO_BADGES: TechBadge[] = [
  { name: "Node.js", glow: "from-emerald-400/30 to-green-500/10" },
  { name: "Express.js", glow: "from-zinc-300/30 to-zinc-500/10" },
  { name: "PostgreSQL", glow: "from-sky-400/30 to-blue-500/10" },
  { name: "MySQL", glow: "from-orange-400/30 to-amber-500/10" },
  { name: "AWS", glow: "from-amber-400/30 to-orange-500/10" },
  { name: "Azure", glow: "from-blue-400/30 to-cyan-500/10" },
  { name: "OpenAI", glow: "from-teal-300/30 to-emerald-500/10" },
  { name: "RabbitMQ", glow: "from-orange-500/30 to-red-500/10" },
  { name: "Redis", glow: "from-red-400/30 to-rose-500/10" },
];

/** ----------------------------------------------------------------
 *  About — narrative cards + counters
 *  ---------------------------------------------------------------- */
export const ABOUT_CARDS: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: "4+ years building backends",
    body: "Designing and shipping production Node.js services that stay fast and predictable under real-world load.",
    icon: Server,
  },
  {
    title: "Multi-tenant SaaS systems",
    body: "Architecting tenant-isolated platforms with shared infrastructure, granular RBAC and per-tenant analytics.",
    icon: Boxes,
  },
  {
    title: "AI & vector search",
    body: "Integrating OpenAI and vector databases to power semantic matching, retrieval and intelligent automation.",
    icon: Brain,
  },
  {
    title: "Scalable APIs & cloud",
    body: "Crafting clean REST APIs and deploying resilient, observable services across AWS and Azure.",
    icon: Cloud,
  },
];

export const ABOUT_STATS: Stat[] = [
  { value: 4, suffix: "+", caption: "Years Experience" },
  { value: 10, suffix: "+", caption: "Third-Party Integrations" },
  { value: 0, label: "Multiple", caption: "Production Systems" },
];

/** ----------------------------------------------------------------
 *  Tech stack grid
 *  ---------------------------------------------------------------- */
export const TECH_CATEGORIES: TechCategory[] = [
  {
    title: "Backend",
    icon: Server,
    accent: "var(--brand-emerald)",
    items: ["Node.js", "Express.js"],
  },
  {
    title: "Databases",
    icon: Database,
    accent: "var(--brand-cyan)",
    items: ["PostgreSQL", "MySQL", "Redis", "Sequelize"],
  },
  {
    title: "Cloud",
    icon: Cloud,
    accent: "var(--brand-violet)",
    items: ["AWS", "Azure"],
  },
  {
    title: "AI",
    icon: Brain,
    accent: "var(--brand-emerald)",
    items: ["OpenAI", "Pinecone"],
  },
  {
    title: "Messaging",
    icon: Radio,
    accent: "var(--brand-cyan)",
    items: ["RabbitMQ", "Socket.io"],
  },
  {
    title: "Integrations",
    icon: Plug,
    accent: "var(--brand-violet)",
    items: ["Stripe", "Twilio", "Google APIs", "Meta APIs", "Zoom", "Firebase"],
  },
  {
    title: "Dev Tools",
    icon: Wrench,
    accent: "var(--brand-cyan)",
    items: ["Git", "Postman", "Jira", "ClickUp"],
  },
];

/** ----------------------------------------------------------------
 *  Professional experience timeline
 *  ---------------------------------------------------------------- */
export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Wegile",
    role: "Backend Developer",
    period: "2023 — Present",
    highlights: [
      "Architect scalable Node.js services for high-traffic platforms.",
      "Design clean, versioned REST APIs consumed across web & mobile.",
      "Implement JWT and role-based access control (RBAC) authentication.",
      "Build asynchronous pipelines with queues and background workers.",
      "Integrate payment and communication platforms end-to-end.",
      "Deploy and operate services across AWS and Azure.",
    ],
  },
  {
    company: "Edana Farms",
    role: "Web Solutions Executive",
    period: "2022 — 2023",
    highlights: [
      "Built e-commerce solutions from storefront to checkout.",
      "Integrated payment gateways and logistics providers.",
      "Developed internal productivity and operations systems.",
    ],
  },
  {
    company: "St. Soldier & Anand College",
    role: "Assistant Professor",
    period: "2020 — 2021",
    highlights: [
      "Mentored students in computer science fundamentals.",
      "Designed curriculum and hands-on programming labs.",
    ],
  },
];

/** ----------------------------------------------------------------
 *  Selected professional work — anonymized case studies
 *  ---------------------------------------------------------------- */
export const CASE_STUDIES: CaseStudy[] = [
  {
    index: "01",
    title: "AI-Powered Semantic Matching Platform",
    summary:
      "A multi-tenant platform that matches entities through meaning rather than keywords, backed by vector search and asynchronous analytics.",
    technologies: ["Node.js", "PostgreSQL", "OpenAI", "Pinecone", "RabbitMQ", "Azure"],
    focus: [
      "Semantic search powered by embeddings & vector retrieval",
      "Tenant-isolated multi-tenant architecture",
      "Background workers for heavy async processing",
      "Analytics pipelines feeding real-time insights",
    ],
    accent: "var(--brand-emerald)",
  },
  {
    index: "02",
    title: "Marketplace Platform",
    summary:
      "A two-sided marketplace with subscription billing, fine-grained permissions and location-aware discovery at its core.",
    technologies: ["Node.js", "MySQL", "Stripe", "AWS"],
    focus: [
      "Subscription & recurring billing systems",
      "Role-based access control across user tiers",
      "Geo-based search and ranking",
      "Resilient third-party service integrations",
    ],
    accent: "var(--brand-cyan)",
  },
];

/** ----------------------------------------------------------------
 *  Architecture showcase flow
 *  ---------------------------------------------------------------- */
export const ARCHITECTURE: ArchNode[] = [
  { label: "API Gateway", description: "Routing, rate-limiting & request shaping", icon: Globe },
  { label: "Authentication Layer", description: "JWT sessions, RBAC & policy checks", icon: ShieldCheck },
  { label: "Business Logic", description: "Domain services & orchestration", icon: Workflow },
  { label: "Queues", description: "RabbitMQ-driven async pipelines", icon: Radio },
  { label: "Database", description: "PostgreSQL / MySQL with Redis cache", icon: Database },
  { label: "External Integrations", description: "Stripe, OpenAI, Twilio & more", icon: Plug },
];

/** ----------------------------------------------------------------
 *  Headline stats band
 *  ---------------------------------------------------------------- */
export const STATS: Stat[] = [
  { value: 4, suffix: "+", caption: "Years Experience" },
  { value: 10, suffix: "+", caption: "External Integrations" },
  { value: 0, label: "Node.js", caption: "Backend Specialist" },
  { value: 0, label: "AI", caption: "Powered Systems" },
];

export { GitBranch };
