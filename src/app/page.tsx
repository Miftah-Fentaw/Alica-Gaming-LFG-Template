"use client";

import Image from "next/image";
import SwapCarousel from "@/components/SwapCarousel";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ElementType,
} from "react";

const HERO_VIDEO =
  "https://res.cloudinary.com/dcexct0ke/video/upload/v1790092966/hero_do0ktb.mp4";

const NAV = [
  { label: "GAMES", href: "#game" },
  { label: "TEAM", href: "#team" },
  { label: "COMMUNITY", href: "#about" },
  { label: "TOURNAMENTS", href: "#tournaments" },
  { label: "LFG", href: "#lfg" },
];

const GAMES = [
  {
    title: "GTA V",
    src: "/assets/games/gta.jpg",
    genre: "Open World · Action",
    mode: "Story · Freemode · Heists",
    platform: "PC · Console",
    blurb:
      "Los Santos chaos with Ethiopian crews running heists, races, and late-night freemode wars. Perfect for big-group LFG and voice-chat drama.",
    vibe: "Crew nights · High energy",
  },
  {
    title: "COD MWII",
    src: "/assets/games/cod.png",
    genre: "FPS · Tactical",
    mode: "Ranked · Pubs · Search",
    platform: "PC · Console",
    blurb:
      "Fast aim battles and sweaty ranked stacks. Addis lobbies love Search & Destroy and duo/trio ranked climbs with callouts in Amharic and English.",
    vibe: "Competitive · Mic required",
  },
  {
    title: "PUBG",
    src: "/assets/games/pubg.png",
    genre: "Battle Royale",
    mode: "Squad · Duo · Ranked",
    platform: "PC",
    blurb:
      "Drop hot, rotate smart, clutch the circle. Classic BR for Ethiopian squads who want IGL calls, sniper duels, and Conqueror grinds.",
    vibe: "Squad IGL · Clutch plays",
  },
  {
    title: "DELTA FORCE",
    src: "/assets/games/deltaforce.jpg",
    genre: "Mil-Sim · Extraction",
    mode: "Ops · Co-op · PVP",
    platform: "PC",
    blurb:
      "Tactical raids and extraction pressure. Great for crews that want gear fear, coordinated pushes, and longer session nights.",
    vibe: "Tactical · Teamplay",
  },
  {
    title: "LAST OF US",
    src: "/assets/games/lastofus.jpg",
    genre: "Story · Co-op",
    mode: "Campaign · Factions",
    platform: "Console · PC",
    blurb:
      "Story-first sessions and tense co-op runs. Ideal for chill Ethiopian pairs who want cinematic play with sharp gunfights.",
    vibe: "Co-op · Immersive",
  },
  {
    title: "CAR RUSH",
    src: "/assets/games/car.jpg",
    genre: "Racing · Arcade",
    mode: "Races · Custom lobbies",
    platform: "PC · Console",
    blurb:
      "High-speed lobby races and custom tracks. Easy drop-in fun for ALICA nights when the squad wants competition without a full ranked stack.",
    vibe: "Casual · Party race",
  },
  {
    title: "GTA ONLINE",
    src: "/assets/games/gta2.jpg",
    genre: "Multiplayer · Crime",
    mode: "Business · PVP · Events",
    platform: "PC · Console",
    blurb:
      "Always-online Grind and grief. Ethiopian crews run businesses, sell missions, and defend against randoms — LFG friendly every evening.",
    vibe: "Grind · Social PVP",
  },
  {
    title: "PUBG MOBILE",
    src: "/assets/games/pubg2.jpg",
    genre: "Mobile BR",
    mode: "Squad · Ranked · TDM",
    platform: "Mobile",
    blurb:
      "The most accessible BR across Ethiopia. Queue from anywhere, climb Ace ranks, and fill squads fast through ALICA Discord LFG.",
    vibe: "Anytime · Mobile first",
  },
];

const ABOUT_CARDS = [
  { src: "/assets/games/pubg.png", label: "FIND SQUAD", accent: true },
  { src: "/assets/games/cod.png", label: "RANKED LFG" },
  { src: "/assets/games/deltaforce.jpg", label: "JOIN NOW" },
  { src: "/assets/games/gta.jpg", label: "CREW UP" },
  { src: "/assets/games/lastofus.jpg", label: "CO-OP RUN" },
];

const TEAM = [
  {
    name: "Abebe Tadesse",
    role: "Founder · Addis",
    color: "#ff6b9d",
    avatar: "/assets/games/pubg.png",
  },
  {
    name: "Sara Mekonnen",
    role: "Community Lead",
    color: "#7dff6b",
    avatar: "/assets/games/cod.png",
  },
  {
    name: "Yonatan Bekele",
    role: "Esports Coach",
    color: "#ffe14a",
    avatar: "/assets/games/deltaforce.jpg",
  },
  {
    name: "Lidya Hailu",
    role: "Tournament Director",
    color: "#ff8a3d",
    avatar: "/assets/games/gta.jpg",
  },
  {
    name: "Dawit Alemu",
    role: "Content Lead",
    color: "#6bc5ff",
    avatar: "/assets/games/pubg2.jpg",
  },
  {
    name: "Hanna Girma",
    role: "Partnerships",
    color: "#c77dff",
    avatar: "/assets/games/gta2.jpg",
  },
];

const FLOAT = [
  "animate-card-float",
  "animate-card-float-delay",
  "animate-card-float-delay-2",
  "animate-card-float",
  "animate-card-float-delay",
];

const LFG_POSTS = [
  {
    player: "Kaleb_ET",
    game: "COD MWII",
    rank: "Diamond II",
    role: "Entry · Mic on",
    region: "Addis · EU",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=800&fit=crop",
  },
  {
    player: "SelamAim",
    game: "VALORANT",
    rank: "Ascendant",
    role: "Duelist",
    region: "Addis",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=800&fit=crop",
  },
  {
    player: "BoleSniper",
    game: "PUBG",
    rank: "Conqueror",
    role: "IGL · Squad",
    region: "Ethiopia",
    image:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&h=800&fit=crop",
  },
  {
    player: "MerkatoDrift",
    game: "GTA V",
    rank: "Crew LVL 80",
    role: "Heist lead",
    region: "Addis Online",
    image:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600&h=800&fit=crop",
  },
  {
    player: "LidyaFrag",
    game: "DELTA FORCE",
    rank: "Elite",
    role: "Support",
    region: "ET / ME",
    image:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=800&fit=crop",
  },
  {
    player: "AddisAce",
    game: "FC 25",
    rank: "Div 1",
    role: "1v1 / Club",
    region: "Addis",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=800&fit=crop",
  },
  {
    player: "HabeshaTank",
    game: "LAST OF US",
    rank: "Survivor+",
    role: "Co-op story",
    region: "Discord",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=800&fit=crop",
  },
  {
    player: "ShegerRush",
    game: "PUBG MOBILE",
    rank: "Ace Master",
    role: "Fragger",
    region: "Mobile ET",
    image:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&h=800&fit=crop",
  },
  {
    player: "NetsanetGG",
    game: "FORTNITE",
    rank: "Elite",
    role: "Trio fill",
    region: "Africa",
    image:
      "https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=600&h=800&fit=crop",
  },
  {
    player: "TewodrosX",
    game: "APEX",
    rank: "Predator",
    role: "Controller",
    region: "LFG NOW",
    image:
      "https://images.unsplash.com/photo-1616587894289-86480e533129?w=600&h=800&fit=crop",
  },
];

const TOURNAMENTS = [
  {
    title: "Addis Open Cup",
    game: "COD MWII",
    prize: "ETB 25,000",
    date: "Sep 28 · 6PM",
    entrants: "64 teams",
    status: "OPEN",
    image:
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&h=500&fit=crop",
  },
  {
    title: "Habesha Showdown",
    game: "PUBG",
    prize: "ETB 40,000",
    date: "Oct 4 · 3PM",
    entrants: "100 squads",
    status: "OPEN",
    image:
      "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800&h=500&fit=crop",
  },
  {
    title: "Sheger League S2",
    game: "VALORANT",
    prize: "ETB 60,000",
    date: "Oct 12 · 5PM",
    entrants: "32 teams",
    status: "QUALIFIERS",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop",
  },
  {
    title: "Bole Bracket",
    game: "FC 25",
    prize: "ETB 15,000",
    date: "Sep 30 · 7PM",
    entrants: "48 players",
    status: "OPEN",
    image:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=500&fit=crop",
  },
  {
    title: "Night Raid Invitational",
    game: "DELTA FORCE",
    prize: "ETB 30,000",
    date: "Oct 8 · 8PM",
    entrants: "24 squads",
    status: "INVITE",
    image:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=500&fit=crop",
  },
  {
    title: "GTA Crew Wars",
    game: "GTA ONLINE",
    prize: "ETB 20,000",
    date: "Oct 15 · 4PM",
    entrants: "16 crews",
    status: "OPEN",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=500&fit=crop",
  },
  {
    title: "Mobile Masters ET",
    game: "PUBG MOBILE",
    prize: "ETB 35,000",
    date: "Oct 19 · 2PM",
    entrants: "80 teams",
    status: "REG OPEN",
    image:
      "https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&h=500&fit=crop",
  },
  {
    title: "Campus Clash",
    game: "MULTI",
    prize: "Gear + Cash",
    date: "Nov 2 · All day",
    entrants: "Universities",
    status: "SOON",
    image:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=500&fit=crop",
  },
  {
    title: "Diaspora Cup",
    game: "COD / VAL",
    prize: "USD 1,500",
    date: "Nov 10 · Online",
    entrants: "Global ET",
    status: "OPEN",
    image:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=500&fit=crop",
  },
  {
    title: "ALICA Grand Finals",
    game: "CROSS-TITLE",
    prize: "ETB 100,000",
    date: "Dec 14 · Addis",
    entrants: "Champions only",
    status: "SEASON END",
    image:
      "https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&h=500&fit=crop",
  },
];

function ControllerIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M7.5 7.5C4.46 7.5 2 9.96 2 13s2.46 5.5 5.5 5.5h9c3.04 0 5.5-2.46 5.5-5.5S19.54 7.5 16.5 7.5h-9zm0 2h9c1.93 0 3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5h-9C5.57 16.5 4 14.93 4 13s1.57-3.5 3.5-3.5zM8 11v1.5H6.5V14H8v1.5h1.5V14H11v-1.5H9.5V11H8zm7.25.25a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm2.5 2.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
    </svg>
  );
}

function PlayIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.14v13.72L19 12 8 5.14z" />
    </svg>
  );
}

function GlitchText({
  text,
  as: Tag = "span",
  className = "",
  strong = false,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  strong?: boolean;
}) {
  return (
    <Tag
      className={`glitch ${strong ? "glitch-strong" : ""} ${className}`}
      data-text={text}
    >
      {text}
    </Tag>
  );
}

function Reveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  variant?: "up" | "left" | "right";
  delay?: 0 | 1 | 2 | 3 | 4;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const base =
    variant === "left"
      ? "reveal-left"
      : variant === "right"
        ? "reveal-right"
        : "reveal";
  const delayClass = delay ? `reveal-delay-${delay}` : "";

  return (
    <div
      ref={ref}
      className={`${base} ${delayClass} ${inView ? "in" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function SocialIcons() {
  const icons = [
    {
      label: "X",
      path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z",
    },
    {
      label: "LinkedIn",
      path: "M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.48h4.52V24H.24V8.48zM8.34 8.48h4.33v2.12h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.42 3.01 5.42 6.93V24h-4.52v-7.71c0-1.84-.03-4.2-2.56-4.2-2.56 0-2.95 2-2.95 4.07V24H8.34V8.48z",
    },
    {
      label: "WhatsApp",
      path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.01a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982 1-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884z",
    },
    {
      label: "Discord",
      path: "M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.891.076.076 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.548-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z",
    },
  ];

  return (
    <div className="flex items-center gap-2.5">
      {icons.map((icon) => (
        <a
          key={icon.label}
          href="#"
          aria-label={icon.label}
          className="social-dot"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d={icon.path} />
          </svg>
        </a>
      ))}
    </div>
  );
}

function SectionHeading({ children }: { children: string }) {
  return (
    <Reveal className="flex items-center justify-center gap-4 mb-10 md:mb-14">
      <div className="section-deco" aria-hidden>
        <span />
        <span />
      </div>
      <GlitchText
        text={children}
        as="h2"
        strong
        className="section-title text-2xl md:text-4xl text-white"
      />
      <div className="section-deco" aria-hidden>
        <span />
        <span />
      </div>
    </Reveal>
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [booted, setBooted] = useState(false);
  const [aboutIndex, setAboutIndex] = useState(0);
  const [gameDetailIndex, setGameDetailIndex] = useState(0);
  const activeGame = GAMES[gameDetailIndex] ?? GAMES[0];

  useEffect(() => {
    const t = requestAnimationFrame(() => setBooted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setAboutIndex((i) => (i + 1) % ABOUT_CARDS.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <video
          className="hero-video"
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/75" />
      </div>

      <header
        className={`absolute top-0 inset-x-0 z-50 transition-all duration-700 ${
          booted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 md:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
          <a
            href="#"
            className="flex items-center gap-2 text-cyan-bright shrink-0 animate-logo glitch-hover"
          >
            <ControllerIcon className="w-8 h-8" />
            <span className="font-display font-extrabold text-xl tracking-[0.18em]">
              ALICA
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
            {NAV.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                className={`nav-link font-display glitch-hover ${i === 0 ? "active" : ""}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#lfg"
              className="clip-btn btn-solid glow-cyan hidden sm:inline-flex items-center gap-2 h-10 px-5 text-sm"
            >
              <span className="grid place-items-center w-5 h-5 rounded-full bg-black/20">
                <PlayIcon className="w-3 h-3" />
              </span>
              LFG NOW
            </a>
            <button
              type="button"
              className="lg:hidden social-dot"
              aria-label="Menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                {mobileOpen ? (
                  <path d="M6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12 19 17.6 17.6 19 12 13.4 6.4 19 5 17.6 10.6 12 5 6.4z" />
                ) : (
                  <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden mx-4 mb-4 rounded-xl border border-cyan/40 bg-[rgba(6,10,20,0.95)] p-4 flex flex-col gap-3 animate-fade-up">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-link font-display py-2"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#lfg"
              className="clip-btn btn-solid glow-cyan inline-flex items-center justify-center gap-2 h-11 px-5 text-sm mt-1"
            >
              LFG NOW
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="play"
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      >
        <div className="relative z-10 mx-auto max-w-5xl px-4 pt-24 pb-28 text-center">
          <p className="font-display text-cyan-bright text-sm md:text-base tracking-[0.35em] mb-4 animate-fade-up glitch-hover">
            ETHIOPIAN GAMING
          </p>
          <GlitchText
            text="ALICA"
            as="h1"
            strong
            className="font-display font-black italic text-5xl sm:text-6xl md:text-8xl tracking-[0.06em] animate-hero-boot"
          />
          <p className="mt-3 font-display font-bold italic text-xl sm:text-2xl md:text-3xl tracking-[0.2em] text-white/95 animate-fade-up-delay">
            <GlitchText text="LFG · SQUAD UP" className="glitch-hover" />
          </p>
          <p className="mt-5 max-w-2xl mx-auto text-sm sm:text-base md:text-lg uppercase tracking-wide text-white/85 animate-fade-up-delay">
            Ethiopia&apos;s home for competitive play. Find your crew in Addis
            and beyond — drop in, queue ranked, represent.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4 animate-fade-up-delay-2">
            <a
              href="#lfg"
              className="clip-btn btn-solid glow-cyan inline-flex items-center gap-2 h-12 px-7 text-sm md:text-base"
            >
              <span className="grid place-items-center w-6 h-6 rounded-full bg-black/20">
                <PlayIcon className="w-3.5 h-3.5" />
              </span>
              LFG NOW
            </a>
            <a
              href="#game"
              className="clip-btn btn-outline inline-flex items-center gap-2 h-12 px-7 text-sm md:text-base"
            >
              EXPLORE GAMES
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 inset-x-0 z-10 px-4 md:px-10 flex items-end justify-between gap-4 animate-fade-up-delay-2">
          <div className="flex items-center gap-3">
            <span className="font-display text-xs tracking-[0.2em] text-white/90 glitch-hover">
              FOLLOW ALICA
            </span>
            <SocialIcons />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/40" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <Reveal variant="left">
            <p className="font-display text-sm tracking-[0.25em] text-cyan-bright mb-2 glitch-hover">
              ABOUT
            </p>
            <GlitchText
              text="ETHIOPIA LFG"
              as="h2"
              strong
              className="section-title text-3xl md:text-5xl text-white mb-6 block"
            />
            <p className="text-sm md:text-base leading-relaxed uppercase tracking-wide text-white/80 max-w-xl">
              ALICA is the Ethiopian gaming community built for squads that
              want more than solo queue. Connect with players across Addis
              Ababa and the diaspora, run tournaments, climb ranked ladders,
              and LFG every night — PC, console, and mobile.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#lfg"
                className="clip-btn btn-solid glow-cyan inline-flex items-center justify-center h-11 px-6 text-sm"
              >
                JOIN THE CREW
              </a>
              <a
                href="#tournaments"
                className="clip-btn btn-outline inline-flex items-center justify-center h-11 px-6 text-sm"
              >
                TOURNAMENTS
              </a>
            </div>
          </Reveal>

          {/* Mobile: scroll · Desktop: auto-swap stack */}
          <div className="w-full">
            <div className="md:hidden">
              <SwapCarousel
                items={ABOUT_CARDS}
                getKey={(c) => c.label}
                ariaLabel="Community highlights"
                cardClassName="w-[70vw] max-w-[220px]"
                renderItem={(card, { active }) => (
                  <div
                    className={`clip-card relative aspect-[3/4] overflow-hidden border border-cyan/70 bg-[#07101c]/80 ${
                      active ? "glow-cyan" : "glow-cyan-soft"
                    }`}
                  >
                    <Image
                      src={card.src}
                      alt={card.label}
                      fill
                      className="object-cover"
                      sizes="220px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-3 flex justify-between">
                      <span className="font-display text-xs tracking-wider">
                        {card.label}
                      </span>
                      <span className="text-cyan-bright">→</span>
                    </div>
                  </div>
                )}
              />
            </div>

            <Reveal
              variant="right"
              className="hidden md:block relative h-[480px] lg:h-[540px] w-full max-w-[560px] mx-auto lg:ml-auto"
            >
              {ABOUT_CARDS.map((card, i) => {
                const offset =
                  (i - aboutIndex + ABOUT_CARDS.length) % ABOUT_CARDS.length;
                if (offset > 2) return null;
                const positions = [
                  "z-30 left-[8%] top-[6%] w-[58%] rotate-[-2deg]",
                  "z-20 left-[34%] top-[10%] w-[52%] rotate-[3deg] opacity-95",
                  "z-10 left-[56%] top-[16%] w-[46%] rotate-[-1deg] opacity-75",
                ];
                return (
                  <button
                    key={card.label}
                    type="button"
                    onClick={() => setAboutIndex(i)}
                    className={`absolute aspect-[3/4] about-stack-card ${positions[offset]} ${FLOAT[offset]} ${
                      offset === 0 ? "animate-pulse-glow" : "glow-cyan-soft"
                    }`}
                  >
                    <div className="clip-card relative h-full overflow-hidden border border-cyan/70 bg-[#07101c]/80">
                      <Image
                        src={card.src}
                        alt={card.label}
                        fill
                        className="object-cover"
                        sizes="280px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/15" />
                      <div className="absolute bottom-0 inset-x-0 p-3 flex items-center justify-between bg-black/50">
                        <span className="font-display text-xs tracking-wider">
                          {card.label}
                        </span>
                        <span className="text-cyan-bright">→</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </Reveal>
          </div>
        </div>
      </section>

      {/* GAMEPLAY */}
      <section id="game" className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading>GAME PLAY</SectionHeading>
          <Reveal>
            <p className="text-center text-sm md:text-base uppercase tracking-wide text-white/75 max-w-2xl mx-auto -mt-6 mb-6">
              Tap a title to load its details — what Ethiopian crews play and why.
            </p>
          </Reveal>

          <SwapCarousel
            items={GAMES}
            getKey={(g) => g.title}
            ariaLabel="Games carousel"
            autoMs={5500}
            onIndexChange={setGameDetailIndex}
            cardClassName="w-[68vw] max-w-[220px] sm:w-[190px] md:w-[210px]"
            renderItem={(game, { active }) => (
              <div
                className={`game-card h-full ${active ? "active glow-cyan" : "glow-cyan-soft"}`}
              >
                <div className="clip-card relative aspect-[3/4] overflow-hidden border border-cyan/60 bg-[#07101c]/85 flex flex-col">
                  <div className="h-9 md:h-10 bg-cyan shrink-0 flex items-center px-3">
                    <span className="font-display text-[10px] md:text-xs font-bold tracking-wider text-[#041018] truncate">
                      {game.title}
                    </span>
                  </div>
                  <div className="relative flex-1 min-h-[220px]">
                    <Image
                      src={game.src}
                      alt={game.title}
                      fill
                      className="object-cover"
                      sizes="220px"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 inset-x-3">
                      <p className="text-[10px] uppercase tracking-wider text-cyan-bright">
                        {game.genre}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          />

          <div className="mt-8 mx-auto max-w-3xl info-card clip-card p-5 md:p-7 border border-cyan/40">
            <div className="flex flex-wrap items-end justify-between gap-3 mb-3">
              <div>
                <p className="font-display text-[11px] tracking-[0.25em] text-cyan-bright mb-1">
                  GAME DETAIL
                </p>
                <h3 className="font-display font-black italic text-2xl md:text-3xl text-white uppercase tracking-wide">
                  {activeGame.title}
                </h3>
              </div>
              <span className="clip-btn btn-outline text-[10px] px-3 py-1.5">
                {activeGame.platform}
              </span>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-white/85 uppercase tracking-wide">
              {activeGame.blurb}
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-wider">
              <span className="px-3 py-1.5 border border-cyan/35 text-cyan-bright/90 bg-black/30">
                {activeGame.mode}
              </span>
              <span className="px-3 py-1.5 border border-cyan/35 text-white/80 bg-black/30">
                {activeGame.vibe}
              </span>
              <span className="px-3 py-1.5 border border-cyan/35 text-white/80 bg-black/30">
                {activeGame.genre}
              </span>
            </div>
            <a
              href="#lfg"
              className="mt-5 clip-btn btn-solid glow-cyan inline-flex items-center justify-center h-10 px-5 text-xs"
            >
              LFG FOR {activeGame.title}
            </a>
          </div>
        </div>
      </section>

      {/* LFG — 10 posts */}
      <section
        id="lfg"
        className="relative py-16 md:py-24 overflow-hidden scroll-mt-20"
      >
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <Reveal className="text-center mb-4">
            <p className="font-display text-cyan-bright text-sm tracking-[0.3em] mb-3 glitch-hover">
              LOOKING FOR GROUP
            </p>
            <GlitchText
              text="READY TO LFG?"
              as="h2"
              strong
              className="section-title text-3xl md:text-5xl text-white mb-4 block"
            />
            <p className="text-sm md:text-base uppercase tracking-wide text-white/80 max-w-2xl mx-auto mb-2">
              10 live dummy posts — Ethiopian players looking for squads right
              now.
            </p>
          </Reveal>

          <SwapCarousel
            items={LFG_POSTS}
            getKey={(p) => p.player}
            ariaLabel="LFG posts"
            autoMs={6000}
            cardClassName="w-[78vw] max-w-[260px] sm:w-[230px] md:w-[250px]"
            renderItem={(post, { active }) => (
              <article
                className={`info-card clip-card overflow-hidden h-full ${active ? "active" : ""}`}
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={post.image}
                    alt={`${post.player} LFG for ${post.game}`}
                    fill
                    className="object-cover"
                    sizes="260px"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 clip-btn bg-cyan text-[#041018] text-[10px] font-bold px-2 py-1 tracking-wider">
                    LFG
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-4">
                    <h3 className="font-display font-bold italic text-base tracking-wide text-white uppercase">
                      {post.player}
                    </h3>
                    <p className="text-cyan-bright text-xs tracking-wider mt-1 uppercase">
                      {post.game} · {post.rank}
                    </p>
                    <p className="text-white/70 text-xs mt-1 uppercase tracking-wide">
                      {post.role} · {post.region}
                    </p>
                    <span className="mt-3 inline-flex clip-btn btn-solid text-[10px] px-3 py-1.5">
                      JOIN SQUAD
                    </span>
                  </div>
                </div>
              </article>
            )}
          />

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#"
              className="clip-btn btn-solid glow-cyan inline-flex items-center justify-center h-12 px-8 text-sm"
            >
              OPEN DISCORD
            </a>
            <a
              href="#tournaments"
              className="clip-btn btn-outline inline-flex items-center justify-center h-12 px-8 text-sm"
            >
              SEE EVENTS
            </a>
          </div>
        </div>
      </section>

      {/* TOURNAMENTS — 10 events */}
      <section
        id="tournaments"
        className="relative py-16 md:py-24 overflow-hidden scroll-mt-20"
      >
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading>TOURNAMENTS</SectionHeading>
          <Reveal>
            <p className="text-center text-sm md:text-base uppercase tracking-wide text-white/75 max-w-2xl mx-auto -mt-6 mb-6">
              10 upcoming cups across Addis and online — prize pools, brackets,
              and Ethiopian crews.
            </p>
          </Reveal>

          <SwapCarousel
            items={TOURNAMENTS}
            getKey={(t) => t.title}
            ariaLabel="Tournaments carousel"
            autoMs={6500}
            cardClassName="w-[85vw] max-w-[320px] sm:w-[280px] md:w-[300px]"
            renderItem={(event, { active }) => (
              <article
                className={`info-card overflow-hidden rounded-lg h-full ${active ? "active" : ""}`}
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={event.image}
                    alt={`${event.title} — ${event.game}`}
                    fill
                    className="object-cover"
                    sizes="320px"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 clip-btn bg-black/70 border border-cyan/50 text-cyan-bright text-[10px] font-bold px-2 py-1 tracking-wider">
                    {event.status}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold italic text-sm md:text-base tracking-wide text-white uppercase">
                    {event.title}
                  </h3>
                  <p className="text-cyan-bright text-xs tracking-wider mt-1 uppercase">
                    {event.game}
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] uppercase tracking-wide text-white/75">
                    <span>Prize · {event.prize}</span>
                    <span>{event.date}</span>
                    <span className="col-span-2">{event.entrants}</span>
                  </div>
                  <span className="mt-4 inline-flex clip-btn btn-outline text-[10px] px-3 py-1.5">
                    REGISTER
                  </span>
                </div>
              </article>
            )}
          />
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/40 to-black/70" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading>MEET OUR TEAM</SectionHeading>
          <Reveal>
            <p className="text-center text-sm uppercase tracking-wide text-white/70 max-w-xl mx-auto -mt-6 mb-6">
              The crew building Ethiopian gaming culture — one LFG at a time.
            </p>
          </Reveal>

          <SwapCarousel
            items={TEAM}
            getKey={(m) => m.name}
            ariaLabel="Team carousel"
            autoMs={6000}
            cardClassName="w-[70vw] max-w-[220px] sm:w-[200px] md:w-[210px]"
            renderItem={(member, { active }) => (
              <div
                className={`team-card w-full text-center px-3 py-6 md:py-8 h-full ${
                  active ? "active" : ""
                }`}
              >
                  <div
                    className="relative mx-auto w-24 h-24 md:w-28 md:h-28 rounded-full mb-4 overflow-hidden"
                    style={{
                      boxShadow: `0 0 0 4px ${member.color}, 0 0 24px rgba(0,0,0,0.45)`,
                    }}
                  >
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
                <h3 className="font-display font-bold italic text-sm md:text-base tracking-wide text-white uppercase glitch-hover">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs md:text-sm text-cyan-bright/90 tracking-wide uppercase">
                  {member.role}
                </p>
              </div>
            )}
          />
        </div>
      </section>

      <footer className="relative border-t border-cyan/20 bg-[rgba(4,8,16,0.88)]">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-5 flex flex-wrap items-center justify-between gap-4">
          <a
            href="#"
            className="flex items-center gap-2 text-cyan-bright animate-logo glitch-hover"
          >
            <ControllerIcon className="w-6 h-6" />
            <span className="font-display font-extrabold tracking-[0.18em]">
              ALICA
            </span>
          </a>
          <nav className="flex items-center gap-5 md:gap-8" aria-label="Footer">
            {[
              { label: "GAMES", href: "#game" },
              { label: "LFG", href: "#lfg" },
              { label: "CONTACT", href: "#" },
              { label: "COMMUNITY", href: "#about" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs md:text-sm tracking-[0.14em] text-white/80 hover:text-cyan-bright transition-all glitch-hover"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <SocialIcons />
        </div>
        <p className="text-center text-[11px] tracking-wider uppercase text-white/40 pb-4 px-4">
          ALICA — Ethiopian gaming hub · LFG from Addis to the world
        </p>
        <div className="h-2 bg-black" />
      </footer>
    </div>
  );
}
