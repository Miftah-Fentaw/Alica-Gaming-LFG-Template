import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";

const display = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const body = Rajdhani({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = "https://alica.et";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ALICA | Ethiopian Gaming Hub — LFG Squad Up",
    template: "%s | ALICA Ethiopian Gaming",
  },
  description:
    "ALICA is Ethiopia's gaming home. Squad up, LFG with players across Addis Ababa and beyond, join tournaments, and represent the next generation of Ethiopian esports.",
  keywords: [
    "ALICA",
    "Ethiopian gaming",
    "Ethiopia esports",
    "LFG Ethiopia",
    "Addis Ababa gamers",
    "Ethiopian gamers",
    "gaming community Ethiopia",
    "find squad Ethiopia",
    "PC gaming Ethiopia",
    "mobile gaming Ethiopia",
    "tournaments Addis Ababa",
  ],
  authors: [{ name: "ALICA Ethiopian Gaming" }],
  creator: "ALICA",
  publisher: "ALICA",
  category: "gaming",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_ET",
    url: siteUrl,
    siteName: "ALICA — Ethiopian Gaming",
    title: "ALICA | Ethiopian Gaming Hub — LFG Squad Up",
    description:
      "Squad up with Ethiopia's gamers. ALICA is the LFG hub for tournaments, crews, and the next generation of play from Addis to the world.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ALICA | Ethiopian Gaming — LFG",
    description:
      "Ethiopia's gaming hub. Find your squad, join tournaments, and LFG with ALICA.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ALICA",
  alternateName: ["ALICA Ethiopian Gaming", "ALICA LFG"],
  url: siteUrl,
  description:
    "Ethiopian gaming community and LFG hub for squads, tournaments, and esports.",
  areaServed: {
    "@type": "Country",
    name: "Ethiopia",
  },
  slogan: "Ethiopian Gaming · LFG",
  knowsAbout: [
    "Ethiopian gaming",
    "esports",
    "LFG",
    "multiplayer gaming",
    "Addis Ababa gaming community",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
