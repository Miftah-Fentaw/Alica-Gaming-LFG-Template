import type { Metadata, Viewport } from "next";
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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://alica-lfg.vercel.app";

const siteName = "ALICA — Ethiopian Gaming LFG Template";
const titleDefault = "ALICA | Ethiopian Gaming Hub — LFG Squad Up";
const description =
  "Free Next.js gaming landing page template by Miftah Fentaw. ALICA is an Ethiopian gaming / LFG hub demo — squad up, tournaments, game cards, and cyberpunk HUD UI. MIT licensed.";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#05060a" },
    { media: "(prefers-color-scheme: light)", color: "#00c8f0" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: titleDefault,
    template: "%s | ALICA Ethiopian Gaming",
  },
  description,
  applicationName: "ALICA Gaming LFG Template",
  keywords: [
    "ALICA",
    "Ethiopian gaming",
    "Ethiopia esports",
    "LFG Ethiopia",
    "Addis Ababa gamers",
    "gaming landing page template",
    "Next.js gaming template",
    "Miftah Fentaw",
    "cyberpunk UI",
    "esports website template",
    "tournament landing page",
    "LFG Discord community",
    "PC gaming Ethiopia",
    "mobile gaming Ethiopia",
  ],
  authors: [{ name: "Miftah Fentaw", url: "https://github.com/miftah" }],
  creator: "Miftah Fentaw",
  publisher: "Miftah Fentaw",
  category: "gaming",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_ET",
    url: siteUrl,
    siteName,
    title: titleDefault,
    description,
    images: [
      {
        url: "/previeww.png",
        width: 1850,
        height: 986,
        alt: "ALICA Ethiopian Gaming LFG Template preview — cyberpunk gaming landing page",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description:
      "Ethiopian gaming LFG landing page template by Miftah Fentaw. Squads, tournaments, game details, MIT license.",
    images: ["/previeww.png"],
    creator: "@miftah",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "license": "MIT",
    "copyright": "Miftah Fentaw",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#person` },
      image: `${siteUrl}/previeww.png`,
    },
    {
      "@type": "SoftwareApplication",
      name: "ALICA Gaming LFG Template",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      license: "https://opensource.org/licenses/MIT",
      author: { "@id": `${siteUrl}/#person` },
      screenshot: `${siteUrl}/previeww.png`,
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Miftah Fentaw",
      url: siteUrl,
    },
    {
      "@type": "Organization",
      name: "ALICA",
      alternateName: ["ALICA Ethiopian Gaming", "ALICA LFG"],
      url: siteUrl,
      description:
        "Ethiopian gaming community and LFG hub template for squads, tournaments, and esports landing pages.",
      logo: `${siteUrl}/icon-512.png`,
      image: `${siteUrl}/previeww.png`,
      areaServed: { "@type": "Country", name: "Ethiopia" },
      slogan: "Ethiopian Gaming · LFG",
      founder: { "@id": `${siteUrl}/#person` },
    },
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
