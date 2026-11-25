import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Montserrat } from "next/font/google";
import { SITE, CORE_SKILLS } from "@/lib/data";
import { MotionProvider } from "@/components/MotionProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollBar } from "@/components/ScrollBar";
import "./globals.css";

// Montserrat is a variable font: one file covers every weight used.
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["500", "700"],
  display: "swap",
});

const title = `${SITE.name}, ${SITE.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: title, template: `%s · ${SITE.name}` },
  description: SITE.tagline,
  keywords: [SITE.name, "Backend Developer", "Node.js Developer", "Express.js", "REST APIs", "MySQL", "Faridabad", "Delhi NCR"],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    title,
    description: SITE.tagline,
    siteName: SITE.name,
  },
  twitter: { card: "summary_large_image", title, description: SITE.tagline },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE.url },
};

export const viewport: Viewport = {
  themeColor: "#f3eee4",
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
  knowsAbout: CORE_SKILLS,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${jetbrains.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <MotionProvider>
          <ScrollBar />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
