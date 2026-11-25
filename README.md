# sikanderpreet.vercel.app

My portfolio: the projects I've worked on as a Node.js backend developer, how I work, and my resume.

**Live:** https://sikanderpreet.vercel.app

## What's on it

- **Work:** LoopDeco, SideXSide, Boost!Plug and K9 Stays, each with a short looping animation of the real problem it solved
  (for example, a job that disappears for every other driver the moment one accepts it).
- **How I work:** four rules, each backed by something that happened on a real project.
- **Experience** timeline that draws itself as you scroll, **skills**, and **contact**.

## Built with

- Next.js 15 (App Router) and TypeScript, statically generated
- Tailwind CSS, in a flat paper-and-ink style (no gradients, glow or blur)
- Framer Motion with `LazyMotion` for entrances; the looping demos are plain CSS keyframes that pause when off screen
- Native scrolling, no scroll-jacking: about 135 kB of JavaScript on first load and a steady 60 fps while scrolling
- `next/og` for the link-preview image

## Editing

All text lives in `lib/data.ts`. The resume served by the site is `public/resume.pdf`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```
