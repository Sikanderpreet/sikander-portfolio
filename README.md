# Sikanderpreet Singh — Portfolio

A premium, cinematic personal portfolio for a backend engineer. Built to feel like an award-winning site: parallax depth, glassmorphism, particle fields, sticky storytelling and micro-interactions everywhere — while staying fast, accessible and SEO-friendly.

## Tech Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** with a custom dark, accent-driven design system
- **Framer Motion** for declarative animation & scroll effects
- **Lenis** smooth scrolling, synced with **GSAP ScrollTrigger**
- **shadcn/ui** primitives (Button, Card, Badge)
- **Lucide** icons

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

> Requires Node 18.18+ (Node 20+ recommended).

## Project Structure

```
app/                 # App Router entry, layout, metadata, SEO (sitemap/robots/icon)
  layout.tsx         # fonts, metadata, JSON-LD, providers, nav/footer
  page.tsx           # composes sections (below-the-fold are dynamically imported)
  globals.css        # design tokens + component utilities
components/
  sections/          # Hero, About, TechStack, Experience, Work, Architecture, Stats, Contact
  visuals/           # Particles, GradientBlobs, TiltCard, AnimatedCounter, Reveal, ...
  providers/         # SmoothScroll (Lenis + GSAP sync)
  ui/                # shadcn primitives
  Navbar.tsx, Footer.tsx, SectionHeading.tsx
hooks/               # useMousePosition, useMediaQuery, useLenis
lib/                 # data.ts (all content), utils.ts
types/               # shared TypeScript types
public/              # resume.pdf + static assets
```

## Customizing

- **Content** lives in [`lib/data.ts`](lib/data.ts) — identity, nav, badges, stack, experience, case studies, architecture and stats. Edit there; the UI follows.
- **Theme tokens** (colors, radius, brand accents) live as CSS variables in [`app/globals.css`](app/globals.css) and are mapped in [`tailwind.config.ts`](tailwind.config.ts).
- **Resume**: replace [`public/resume.pdf`](public/resume.pdf) with the real file.
- **Domain**: update `SITE.url` in `lib/data.ts` for correct canonical/OG/sitemap URLs.

## Performance & Accessibility

- Below-the-fold sections are code-split via `next/dynamic`.
- The particle canvas caps DPR + particle count and pauses under `prefers-reduced-motion`.
- All animations respect reduced-motion; Lenis is disabled in that mode.
- Semantic landmarks, focus-visible rings, `aria-*` labels and keyboard-navigable controls throughout.

## License

Personal project — content © Sikanderpreet Singh.
