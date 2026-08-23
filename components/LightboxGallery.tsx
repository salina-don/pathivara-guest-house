"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages, type GalleryImage } from "@/lib/content";

const categories = [
  { id: "all",        label: "All" },
  { id: "exterior",   label: "Exterior" },
  { id: "rooms",      label: "Rooms" },
  { id: "food",       label: "Food & Drink" },
  { id: "activities", label: "Activities" },
] as const;

type CategoryId = (typeof categories)[number]["id"];

export default function LightboxGallery() {
  const [category, setCategory] = useState<CategoryId>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered: GalleryImage[] =
    category === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === category);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (lightboxIndex === null) return;
      setLightboxIndex((prev) =>
        prev === null ? null : (prev + dir + filtered.length) % filtered.length
      );
    },
    [lightboxIndex, filtered.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, navigate]);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  return (
    <>
      {/* Filter tabs */}
      <div
        className="flex flex-wrap gap-2 justify-center mb-10"
        role="tablist"
        aria-label="Filter gallery by category"
      >
        {categories.map(({ id, label }) => (
          <button
            key={id}
            role="tab"
            aria-selected={category === id}
            onClick={() => { setCategory(id); setLightboxIndex(null); }}
            className={`rounded-full px-5 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
              category === id
                ? "bg-brand-600 text-white shadow"
                : "bg-white text-stone-600 ring-1 ring-stone-200 hover:bg-stone-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {filtered.map((img, i) => (
          <button
            key={img.src}
            onClick={() => openLightbox(i)}
            aria-label={`Open photo: ${img.alt}`}
            className="group relative block w-full overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={900}
              height={600}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full h-auto object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-90"
            />
            <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition duration-300 rounded-xl" aria-hidden="true" />
          </button>
        ))}
      </div>

      {/* Lightbox modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/90 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={filtered[lightboxIndex].alt}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            aria-label="Close photo"
            className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Prev */}
          <button
            onClick={() => navigate(-1)}
            aria-label="Previous photo"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          {/* Image */}
          <div className="relative mx-16 max-h-[85vh] max-w-5xl w-full">
            <Image
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].alt}
              width={1200}
              height={800}
              className="max-h-[85vh] w-auto mx-auto object-contain rounded-lg"
              priority
            />
            <p className="mt-3 text-center text-sm text-white/70">
              {filtered[lightboxIndex].alt}
            </p>
            <p className="text-center text-xs text-white/40 mt-1">
              {lightboxIndex + 1} / {filtered.length}
            </p>
          </div>

          {/* Next */}
          <button
            onClick={() => navigate(1)}
            aria-label="Next photo"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronRight className="h-7 w-7" />
          </button>

          {/* Backdrop click to close */}
          <div
            className="absolute inset-0 -z-10"
            onClick={closeLightbox}
            aria-hidden="true"
          />
        </div>
      )}
    </>
  );
}
