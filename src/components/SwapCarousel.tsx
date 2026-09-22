"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type SwapCarouselProps<T> = {
  items: T[];
  getKey: (item: T, index: number) => string;
  renderItem: (item: T, state: { active: boolean; index: number }) => ReactNode;
  /** Auto-advance interval (ms). Set 0 to disable. */
  autoMs?: number;
  className?: string;
  cardClassName?: string;
  showDots?: boolean;
  ariaLabel?: string;
  onIndexChange?: (index: number) => void;
};

function scrollTrackToIndex(
  track: HTMLDivElement,
  i: number,
  smooth: boolean,
) {
  const card = track.children[i] as HTMLElement | undefined;
  if (!card) return;
  const left = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
  track.scrollTo({
    left: Math.max(0, left),
    behavior: smooth ? "smooth" : "auto",
  });
}

export default function SwapCarousel<T>({
  items,
  getKey,
  renderItem,
  autoMs = 5500,
  className = "",
  cardClassName = "w-[72vw] max-w-[240px] sm:w-[200px] md:w-[210px]",
  showDots = true,
  ariaLabel = "Carousel",
  onIndexChange,
}: SwapCarouselProps<T>) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const count = items.length;

  const setActive = useCallback(
    (i: number, smooth: boolean) => {
      if (!count) return;
      const next = ((i % count) + count) % count;
      if (next === indexRef.current && !smooth) return;
      indexRef.current = next;
      setIndex(next);
      onIndexChange?.(next);
      const track = trackRef.current;
      if (track) scrollTrackToIndex(track, next, smooth);
    },
    [count, onIndexChange],
  );

  const goTo = useCallback(
    (next: number) => setActive(next, true),
    [setActive],
  );

  // Only auto-swap when this carousel is visible
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2, rootMargin: "40px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!autoMs || paused || !inView || count < 2) return;
    const id = setInterval(() => {
      setActive(indexRef.current + 1, false);
    }, autoMs);
    return () => clearInterval(id);
  }, [autoMs, paused, inView, count, setActive]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const center = track.scrollLeft + track.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        const kids = track.children;
        for (let i = 0; i < kids.length; i++) {
          const el = kids[i] as HTMLElement;
          const mid = el.offsetLeft + el.offsetWidth / 2;
          const dist = Math.abs(mid - center);
          if (dist < bestDist) {
            bestDist = dist;
            best = i;
          }
        }
        if (best !== indexRef.current) {
          indexRef.current = best;
          setIndex(best);
          onIndexChange?.(best);
        }
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [onIndexChange]);

  if (!count) return null;

  return (
    <div
      ref={rootRef}
      className={`swap-carousel relative ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div className="hidden md:flex absolute inset-y-0 left-0 right-0 z-20 pointer-events-none items-center justify-between px-0">
        <button
          type="button"
          className="pointer-events-auto social-dot !w-10 !h-10 bg-[rgba(4,12,24,0.85)]"
          aria-label="Previous"
          onClick={() => goTo(indexRef.current - 1)}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.4 7.4L14 6l-6 6 6 6 1.4-1.4L10.8 12z" />
          </svg>
        </button>
        <button
          type="button"
          className="pointer-events-auto social-dot !w-10 !h-10 bg-[rgba(4,12,24,0.85)]"
          aria-label="Next"
          onClick={() => goTo(indexRef.current + 1)}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.6 7.4L11 6l6 6-6 6-1.4-1.4L14.2 12z" />
          </svg>
        </button>
      </div>

      <div
        ref={trackRef}
        className="swap-track flex gap-4 md:gap-5 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide px-[12vw] sm:px-10 md:px-14 py-3"
      >
        {items.map((item, i) => {
          const active = i === index;
          const near = Math.abs(i - index) <= 1 || (index === 0 && i === count - 1) || (index === count - 1 && i === 0);
          return (
            <div
              key={getKey(item, i)}
              className={`swap-slide snap-center shrink-0 ${cardClassName} ${
                active
                  ? "scale-105 z-10 opacity-100"
                  : near
                    ? "scale-95 opacity-80"
                    : "scale-90 opacity-50"
              }`}
              style={{
                transition: inView
                  ? "transform 0.25s ease, opacity 0.25s ease"
                  : "none",
              }}
              onClick={() => goTo(i)}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-current={active ? "true" : undefined}
            >
              {/* Always render — carousel pauses when off-screen */}
              {renderItem(item, { active, index: i })}
            </div>
          );
        })}
      </div>

      {showDots && (
        <div className="mt-5 flex justify-center items-center gap-1.5 flex-wrap px-4">
          {items.map((item, i) => (
            <button
              key={getKey(item, i)}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              className={`progress-seg !w-6 md:!w-8 !h-[2px] ${i === index ? "active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
