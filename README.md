<p align="center">
  <img src="public/previeww.png" alt="ALICA Ethiopian Gaming LFG Template preview" width="100%" />
</p>

<h1 align="center">ALICA - Ethiopian Gaming LFG Template</h1>

<p align="center">
  <strong>Cyberpunk gaming landing page</strong> for Ethiopian LFG / esports communities.<br />
  Built with <a href="https://nextjs.org">Next.js</a> · Tailwind CSS · MIT License
</p>

<p align="center">
  <a href="#features">Features</a> ·
  <a href="#demo--preview">Preview</a> ·
  <a href="#getting-started">Getting started</a> ·
  <a href="#seo--social">SEO</a> ·
  <a href="#customize">Customize</a> ·
  <a href="#license">License</a>
</p>

<p align="center">
  <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-00c8f0?style=flat-square" />
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" />
  <img alt="React" src="https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=black" />
  <img alt="Author" src="https://img.shields.io/badge/author-Miftah%20Fentaw-2de0ff?style=flat-square" />
</p>

---

## Demo / Preview

The hero shot above is [`public/previeww.png`](public/previeww.png) — use it for GitHub social preview, Open Graph, and marketing.

**Live site:** [https://alica-lfg.vercel.app](https://alica-lfg.vercel.app)

| Asset | Path | Use |
| --- | --- | --- |
| Full preview | `public/previeww.png` | README, OG, Twitter card |
| Favicon | `src/app/favicon.ico` + `public/favicon.ico` | Browser tab |
| Apple touch | `public/apple-touch-icon.png` | iOS home screen |
| PWA / large icon | `public/icon-512.png` | Manifest / install |

---

## What this template is

**ALICA** is a ready-to-fork **gaming community landing page** themed around Ethiopian LFG (“looking for group”) culture:

- Full-bleed **Cloudinary / remote video** background  
- **Glitch / HUD** accents without tanking performance  
- **Swap carousels** — swipe on mobile, auto-swap + arrows on tablet/desktop (cards only, not the page)  
- Sections: Hero · About · Gameplay (with generated game details) · LFG posts · Tournaments · Team · Footer  
- Solid **SEO defaults**: titles, descriptions, keywords, Open Graph, Twitter, JSON-LD, robots, sitemap, web manifest  

Created and maintained by **[Miftah Fentaw](https://github.com/miftah)** · released under the **MIT License**.

---

## Features

- **Brand-first hero** — ALICA + Ethiopian Gaming · LFG  
- **Responsive** layouts for phone, tablet, and desktop  
- **Game detail panel** under the gameplay carousel (genre, modes, vibe, blurb)  
- **10 dummy LFG posts** + **10 tournaments** with remote Unsplash imagery  
- **Local game art** from `public/assets/games/`  
- **Orbitron + Rajdhani** Google fonts  
- **Clip-path** cyber buttons and cards  
- **Accessible** reduced-motion fallbacks for heavy animations  
- **MIT** — use commercially, modify, ship as your own brand  

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| UI | React 19 + Tailwind CSS 4 |
| Language | TypeScript |
| Images | `next/image` (local + `images.unsplash.com`) |
| Video | Cloudinary URL (configurable) |
| SEO | `metadata`, `viewport`, `robots.ts`, `sitemap.ts`, JSON-LD |

---

## Getting started

### Requirements

- Node.js **20+** recommended  
- npm / pnpm / yarn / bun  

### Install & run

```bash
git clone https://github.com/miftah/Alica-Gaming-LFG-Template.git
cd Alica-Gaming-LFG-Template
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

```bash
npm run dev      # local development
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint
```

---

## Project structure

```text
public/
  previeww.png          # Social / README preview
  favicon.ico
  apple-touch-icon.png
  icon-32.png
  icon-512.png
  site.webmanifest
  assets/
    games/              # Local game posters
    hero.mp4            # Optional local hero video
src/
  app/
    layout.tsx          # SEO metadata + fonts + JSON-LD
    page.tsx            # Landing page
    globals.css         # Design tokens & effects
    robots.ts
    sitemap.ts
    favicon.ico
  components/
    SwapCarousel.tsx    # Mobile scroll + desktop auto-swap
LICENSE                 # MIT — Miftah Fentaw
README.md
```

---

## SEO & social

Configured in `src/app/layout.tsx` and supporting routes:

| Capability | Where |
| --- | --- |
| Document title + template | `metadata.title` |
| Meta description & keywords | `metadata.description` / `keywords` |
| Canonical URL | `metadata.alternates.canonical` |
| Open Graph (+ preview image) | `metadata.openGraph` → `/previeww.png` |
| Twitter large card | `metadata.twitter` → `/previeww.png` |
| Favicons / Apple icon | `metadata.icons` + generated PNGs |
| Theme color | `viewport.themeColor` |
| JSON-LD (WebSite, Person, SoftwareApplication, Organization) | inline in `layout.tsx` |
| `robots.txt` | `src/app/robots.ts` |
| `sitemap.xml` | `src/app/sitemap.ts` |
| PWA-ish manifest | `public/site.webmanifest` |

### Set your production URL

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://alica-lfg.vercel.app
```

Used by `metadataBase`, Open Graph absolute URLs, robots, and sitemap.

### Suggested GitHub repo settings

1. **Social preview image** → upload `public/previeww.png`  
2. **Description** → `ALICA — Ethiopian Gaming LFG landing page template (Next.js) by Miftah Fentaw`  
3. **Topics** → `nextjs`, `gaming`, `lfg`, `ethiopia`, `esports`, `template`, `mit`  

---

## Customize

### Branding & copy

Edit `src/app/page.tsx`:

- Nav labels, hero headline, about text  
- `GAMES` (title, blurb, genre, mode, platform, vibe, art)  
- `LFG_POSTS` / `TOURNAMENTS` dummy feeds  
- `TEAM` members  

### SEO title & description

Edit `src/app/layout.tsx` constants:

- `titleDefault`  
- `description`  
- `siteName`  
- `authors` / `creator` (default: **Miftah Fentaw**)  

### Hero video

```ts
const HERO_VIDEO =
  "https://res.cloudinary.com/.../hero_do0ktb.mp4";
```

Or point to `/assets/hero.mp4` for a local file.

### Colors & motion

CSS variables and effects live in `src/app/globals.css` (`--cyan`, glitch helpers, carousel styles).

### Images

Allow remote hosts in `next.config.ts` under `images.remotePatterns` (Unsplash is already allowed).

---

## Deployment

### Vercel

1. Import the repo  
2. Set `NEXT_PUBLIC_SITE_URL=https://alica-lfg.vercel.app` (already the project default)  
3. Deploy to **https://alica-lfg.vercel.app**  

### Other hosts

Any Node host that supports `next build` + `next start`, or static export if you adapt the app for it.

---

## Performance notes

- Carousels **auto-swap only while in view** and scroll **inside the track** (not the page)  
- Heavy HUD overlays (noise / scanlines) are disabled by default for smoother FPS  
- Prefer compressed video and CDN delivery for the hero background  

---

## Author

**Miftah Fentaw**  
Template: *ALICA — Ethiopian Gaming LFG Template*  
License: MIT (see [`LICENSE`](LICENSE))

If you ship a fork, a star or attribution credit is appreciated but **not required** under MIT.

---

## License

```text
MIT License
Copyright (c) 2026 Miftah Fentaw
```

You may use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of this software, provided the copyright notice and permission notice are included. See the full text in [`LICENSE`](LICENSE).

---

<p align="center">
  Made for Ethiopian gamers · LFG from Addis to the world · by <strong>Miftah Fentaw</strong>
</p>
