"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { heroSlides, siteConfig } from "@/lib/content";

export default function HeroCarousel() {
  const [current,  setCurrent]  = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setCurrent((index + heroSlides.length) % heroSlides.length);
  }, []);

  const prev = () => goTo(current - 1);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(next, 5500);
    return () => clearInterval(id);
  }, [next, isPaused]);

  return (
    <section
      className="relative h-screen min-h-[640px] max-h-[960px] overflow-hidden"
      aria-label={`Featured photos of ${siteConfig.name}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {heroSlides.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== current}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
            quality={90}
          />
        </div>
      ))}

      {/* Layered overlay — heavier on left for legibility, lighter on right for image beauty */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/15" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" aria-hidden="true" />

      {/* Slide counter — top right */}
      <div
        className="absolute top-[88px] right-6 sm:right-10 font-sans text-white/40 text-xs tracking-[0.2em] tabular-nums select-none"
        aria-live="polite"
        aria-atomic="true"
      >
        {String(current + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
      </div>

      {/* Vertical dot indicators — right edge */}
      <div
        className="absolute right-5 sm:right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
        role="tablist"
        aria-label="Slide indicators"
      >
        {heroSlides.map((slide, i) => (
          <button
            key={slide.src}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}: ${slide.headline}`}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
              i === current
                ? "h-8 w-1.5 bg-brand-400"
                : "h-1.5 w-1.5 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Text content — left-aligned, editorial */}
      <div className="absolute inset-0 flex flex-col justify-end px-6 pb-28 sm:px-12 sm:pb-32 lg:px-20 lg:pb-36">
        <div className="max-w-2xl">
          {/* Location label */}
          <p className="eyebrow-light mb-5 font-sans">
            {siteConfig.location.city} · {siteConfig.location.country}
          </p>

          {/* Slide headlines */}
          {heroSlides.map((slide, i) => (
            <div
              key={slide.headline}
              className={`transition-all duration-700 ${
                i === current
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6 absolute pointer-events-none"
              }`}
              aria-hidden={i !== current}
            >
              {i === current && (
                <>
                  <h1 className="font-serif text-5xl font-bold italic text-white sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight drop-shadow-2xl text-balance">
                    {slide.headline}
                  </h1>
                  <p className="mt-5 text-white/65 text-lg sm:text-xl font-light leading-relaxed max-w-lg">
                    {slide.subtext}
                  </p>
                </>
              )}
            </div>
          ))}

          {/* CTAs */}
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-brand-500 hover:bg-brand-600 text-white px-8 py-3.5 text-sm font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent shadow-lg"
            >
              Enquire & Book
            </Link>
            <Link
              href="/rooms"
              className="inline-flex items-center justify-center border border-white/40 text-white/85 hover:border-white hover:text-white px-8 py-3.5 text-sm font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white backdrop-blur-sm hover:bg-white/5"
            >
              Explore Rooms
            </Link>
          </div>
        </div>
      </div>

      {/* Arrow controls — bottom left, above the CTAs */}
      <div className="absolute bottom-10 right-12 sm:right-16 flex gap-2">
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="flex h-10 w-10 items-center justify-center border border-white/25 text-white/60 backdrop-blur-sm transition hover:border-white/50 hover:text-white hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="flex h-10 w-10 items-center justify-center border border-white/25 text-white/60 backdrop-blur-sm transition hover:border-white/50 hover:text-white hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Scroll cue — bottom center */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1.5 text-white/30 select-none pointer-events-none">
        <span className="font-sans text-[9px] uppercase tracking-[0.25em]">Scroll</span>
        <ChevronDown className="h-3.5 w-3.5 animate-bounce-slow" />
      </div>
    </section>
  );
}
