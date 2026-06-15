import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { SITE } from "@/lib/data";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/visuals/ScrollProgress";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// A grotesk display face for headlines gives the type a distinct, editorial
// voice that sets it apart from the default system/Inter look.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.title}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.tagline,
  keywords: [
    "Sikanderpreet Singh",
    "Backend Developer",
    "Node.js Engineer",
    "Express.js",
    "PostgreSQL",
    "AWS",
    "Azure",
    "OpenAI",
    "Scalable APIs",
    "Cloud Infrastructure",
    "Faridabad",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    title: `${SITE.name} — ${SITE.title}`,
    description: SITE.tagline,
    siteName: `${SITE.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.title}`,
    description: SITE.tagline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: SITE.url },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  jobTitle: SITE.title,
  email: `mailto:${SITE.email}`,
  url: SITE.url,
  address: { "@type": "PostalAddress", addressLocality: SITE.location },
  sameAs: [SITE.linkedin, SITE.github],
  knowsAbout: [
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "AWS",
    "Azure",
    "OpenAI",
    "Backend Architecture",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable} dark`}
    >
      <body className="bg-background text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
