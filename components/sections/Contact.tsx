"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Check, Copy, Download, Github, Linkedin, Mail } from "lucide-react";
import { SITE } from "@/lib/data";
import { EASE, fadeUp, stagger } from "@/components/motion";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${SITE.email}`;
    }
  };

  return (
    <section id="contact" className="border-t-[3px] border-ink bg-sunflower py-20 lg:py-28">
      <m.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={stagger(0.07)}
        className="container text-center"
      >
        <m.p variants={fadeUp} className="eyebrow text-ink/70">
          Contact
        </m.p>
        <m.h2 variants={fadeUp} className="mt-3 text-5xl font-black tracking-tight sm:text-7xl">
          Let&apos;s talk.
        </m.h2>
        <m.p variants={fadeUp} className="mx-auto mt-5 max-w-xl text-lg font-semibold leading-relaxed">
          Looking for a Node.js backend role, remote or in Delhi NCR. Email is the fastest way to reach me.
        </m.p>

        <m.div variants={fadeUp} className="mx-auto mt-10 flex max-w-xl flex-col items-stretch gap-4 sm:flex-row sm:justify-center">
          <a href={`mailto:${SITE.email}`} className="btn bg-ink text-paper">
            <Mail className="h-5 w-5" strokeWidth={2.5} />
            Email me
          </a>
          <button type="button" onClick={copy} className="btn bg-cream font-mono text-sm">
            {copied ? (
              <m.span
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="flex items-center gap-2"
              >
                <Check className="h-4 w-4" strokeWidth={3} /> copied
              </m.span>
            ) : (
              <span className="flex items-center gap-2">
                <Copy className="h-4 w-4" strokeWidth={2.5} /> {SITE.email}
              </span>
            )}
          </button>
        </m.div>

        <m.ul variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-3">
          <li>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="btn bg-cream px-4 py-2 text-sm shadow-hard-sm">
              <Linkedin className="h-4 w-4" strokeWidth={2.5} /> LinkedIn
            </a>
          </li>
          <li>
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="btn bg-cream px-4 py-2 text-sm shadow-hard-sm">
              <Github className="h-4 w-4" strokeWidth={2.5} /> GitHub
            </a>
          </li>
          <li>
            <a href={SITE.resume} download className="btn bg-cream px-4 py-2 text-sm shadow-hard-sm">
              <Download className="h-4 w-4" strokeWidth={2.5} /> Resume (PDF)
            </a>
          </li>
        </m.ul>
      </m.div>
    </section>
  );
}
