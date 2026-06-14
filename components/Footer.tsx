import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { SITE } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-card/30 backdrop-blur-sm">
      <div className="container flex flex-col items-center gap-6 py-12 text-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          {SITE.location}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-secondary/40 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${SITE.email}`}
            aria-label="Email"
            className="grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-secondary/40 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-secondary/40 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>

        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {SITE.name}. Crafted with Next.js, Framer
          Motion &amp; care.
        </p>
      </div>
    </footer>
  );
}
