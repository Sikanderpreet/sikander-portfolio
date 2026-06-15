"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail, Github, ArrowUpRight, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components/visuals/Particles";
import { GradientBlobs } from "@/components/visuals/GradientBlobs";
import { Reveal } from "@/components/visuals/Reveal";
import { SITE } from "@/lib/data";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section
      id="contact"
      className="relative flex min-h-[90svh] items-center overflow-hidden py-24"
    >
      <GradientBlobs />
      <Particles density={0.7} interactive />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

      <div className="container relative z-10 flex flex-col items-center text-center">
        <Reveal>
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
            Get in touch
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            Let&apos;s Build Something{" "}
            <span className="text-gradient">Amazing.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
            Have a backend challenge, an AI idea, or a system that needs to
            scale? I&apos;d love to hear about it.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
                LinkedIn
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={`mailto:${SITE.email}`}>
                <Mail className="h-4 w-4" />
                Email
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={SITE.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                GitHub
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <button
            onClick={copyEmail}
            className="group mt-8 inline-flex items-center gap-2 rounded-full border border-border/70 bg-secondary/30 px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/40 hover:text-foreground"
          >
            {copied ? (
              <Check className="h-4 w-4 text-primary" />
            ) : (
              <Copy className="h-4 w-4 transition-transform group-hover:scale-110" />
            )}
            {copied ? "Copied!" : SITE.email}
          </button>
        </Reveal>
      </div>
    </section>
  );
}
