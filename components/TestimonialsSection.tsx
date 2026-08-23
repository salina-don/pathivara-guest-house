"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/lib/content";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="relative overflow-hidden py-24 sm:py-32" style={{ backgroundColor: "#082620" }}>
      {/* Decorative large open-quote — background texture */}
      <span
        className="absolute -top-4 left-6 select-none pointer-events-none font-serif text-[20rem] leading-none text-white/[0.04]"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <div className="relative mx-auto max-w-3xl px-5 sm:px-8 text-center">
        <p className="eyebrow-light font-sans mb-3">Guest Stories</p>
        <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
          What our guests say
        </h2>

        <div className="relative mt-14">
          <blockquote key={current} className="animate-fade-in">
            {/* Stars */}
            <div
              className="flex justify-center gap-1 mb-8"
              aria-label={`Rated ${t.rating} out of 5`}
            >
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-brand-400 text-brand-400"
                  aria-hidden="true"
                />
              ))}
            </div>

            <p className="font-serif text-xl italic leading-relaxed text-white/80 sm:text-2xl sm:leading-relaxed">
              &ldquo;{t.text}&rdquo;
            </p>

            <footer className="mt-10 space-y-1.5">
              <p className="font-semibold text-white">{t.name}</p>
              <p className="text-sm text-white/40">{t.location}</p>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-brand-400">{t.stayType}</p>
            </footer>
          </blockquote>

          {/* Navigation */}
          <div className="mt-12 flex items-center justify-center gap-5">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/50 transition hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex gap-1.5" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Testimonial ${i + 1}`}
                  onClick={() => setCurrent(i)}
                  className={`h-[3px] rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
                    i === current
                      ? "w-8 bg-brand-400"
                      : "w-4 bg-white/20 hover:bg-white/35"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/50 transition hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
