"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";

export interface Slide {
  /** Image address. Use a file in /public (for example "/slides/birthday.jpg") or a full URL. */
  src: string;
  /** Short label shown on the photo. */
  label: string;
  /** Describes the photo for screen readers. */
  alt: string;
  /** Where the label links to. */
  href: string;
}

interface HeroSlideshowProps {
  slides: Slide[];
  /** Milliseconds each photo stays on screen. */
  interval?: number;
}

const SWIPE_DISTANCE = 40;

/**
 * Photo slideshow with fade and slow zoom, arrows, progress dots, swipe, and
 * keyboard support. It pauses on hover, on focus, and when the tab is hidden,
 * and it does not auto-advance for visitors who prefer reduced motion.
 */
export function HeroSlideshow({ slides, interval = 5000 }: HeroSlideshowProps) {
  const [failed, setFailed] = useState<string[]>([]);
  const visibleSlides = slides.filter((slide) => !failed.includes(slide.src));
  const count = visibleSlides.length;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const touchStartX = useRef<number | null>(null);

  const current = count > 0 ? index % count : 0;

  const goTo = useCallback((next: number) => setIndex(count > 0 ? (next + count) % count : 0), [count]);
  const next = useCallback(() => goTo(current + 1), [goTo, current]);
  const previous = useCallback(() => goTo(current - 1), [goTo, current]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAutoPlay(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const running = autoPlay && !paused && count > 1;

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(next, interval);
    return () => window.clearTimeout(timer);
  }, [running, next, interval, current]);

  if (count === 0) {
    return <div className="h-full w-full bg-gradient-to-br from-blush via-sand to-mist" />;
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Gift ideas by occasion"
      tabIndex={0}
      className="group/slides relative h-full w-full overflow-hidden bg-sand focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-coral/60"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") next();
        if (event.key === "ArrowLeft") previous();
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const start = touchStartX.current;
        const end = event.changedTouches[0]?.clientX;
        touchStartX.current = null;
        if (start === null || end === undefined) return;
        if (end - start > SWIPE_DISTANCE) previous();
        if (start - end > SWIPE_DISTANCE) next();
      }}
    >
      {visibleSlides.map((slide, slideIndex) => {
        const active = slideIndex === current;

        return (
          <div
            key={slide.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${slideIndex + 1} of ${count}: ${slide.label}`}
            aria-hidden={!active}
            className={clsx(
              "absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none",
              active ? "opacity-100" : "pointer-events-none opacity-0"
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.src}
              alt={slide.alt}
              loading={slideIndex === 0 ? "eager" : "lazy"}
              decoding="async"
              onError={() => setFailed((list) => (list.includes(slide.src) ? list : [...list, slide.src]))}
              className={clsx(
                "h-full w-full object-cover motion-safe:transition-transform motion-safe:ease-linear",
                active ? "motion-safe:scale-110 motion-safe:duration-[7000ms]" : "scale-100 duration-0"
              )}
            />
          </div>
        );
      })}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
        <Link
          href={visibleSlides[current].href}
          className="group/label inline-flex min-h-11 min-w-0 items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-ink shadow-md hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-coral"
        >
          <span aria-live={running ? "off" : "polite"} className="truncate">{visibleSlides[current].label}</span>
          <span aria-hidden="true" className="text-coral transition-transform group-hover/label:translate-x-0.5">
            &rarr;
          </span>
        </Link>

        {count > 1 ? (
          <div className="flex shrink-0 items-center gap-2 rounded-full bg-black/35 px-3 py-2.5 backdrop-blur-sm">
            {visibleSlides.map((slide, slideIndex) => {
              const active = slideIndex === current;

              return (
                <button
                  key={slide.src}
                  type="button"
                  aria-label={`Show ${slide.label}`}
                  aria-current={active}
                  onClick={() => goTo(slideIndex)}
                  className={clsx(
                    "relative h-1.5 rounded-full transition-all duration-300 before:absolute before:-inset-x-1 before:-inset-y-4 before:content-[''] focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
                    active ? "w-7 bg-white/40" : "w-1.5 bg-white/60 hover:bg-white"
                  )}
                >
                  {active ? (
                    <span
                      key={`${current}-${running}`}
                      className={clsx("absolute inset-y-0 left-0 rounded-full bg-white", running ? "slide-progress" : "w-full")}
                      style={running ? { animationDuration: `${interval}ms` } : undefined}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      {count > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={previous}
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 shadow-md transition-opacity hover:bg-white focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral group-hover/slides:opacity-100 [@media(hover:none)]:opacity-100"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={next}
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 shadow-md transition-opacity hover:bg-white focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral group-hover/slides:opacity-100 [@media(hover:none)]:opacity-100"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      ) : null}
    </div>
  );
}
