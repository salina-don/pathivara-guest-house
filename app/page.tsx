import type { Metadata } from "next";
import Link from "next/link";
import { Phone, MapPin, Wifi, Wind, Bath, Users, BookOpen } from "lucide-react";
import { siteConfig, rooms } from "@/lib/content";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <div className="bg-white">

      {/* ── Header ───────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#082620" }} className="py-10 sm:py-14 text-center px-4">
        {/* EPS callout — the main reason people come */}
        <div className="inline-flex items-center gap-2 bg-brand-500/20 border border-brand-400/40 text-brand-300 text-xs font-semibold px-4 py-1.5 mb-5 tracking-wide">
          <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
          2 minutes from EPS Exam Center
        </div>

        <h1 className="font-serif text-3xl font-bold text-white sm:text-4xl">
          {siteConfig.name}
        </h1>
        <p className="mt-2 text-stone-400 text-sm">Bhaisepati, Saibu, Lalitpur-25, Nepal</p>

        <div className="mt-7 flex flex-col sm:flex-row gap-2 justify-center">
          {siteConfig.contact.phones.map((p) => (
            <a
              key={p.tel}
              href={p.tel}
              className="inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-2.5 transition text-sm"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {p.display}
            </a>
          ))}
        </div>
        <p className="mt-2 text-xs text-stone-500">Call to check availability and book</p>
      </section>

      {/* ── Front building photo ─────────────────────────────── */}
      <div className="w-full h-56 sm:h-72 overflow-hidden">
        <img
          src="/front-building.jpg"
          alt="Pathivara Guest House building"
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* ── What we offer ────────────────────────────────────── */}
      <section className="bg-stone-50 py-8 border-b border-stone-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-stone-600">
            <li className="flex items-center gap-2">
              <Wifi className="h-4 w-4 text-mountain-500" aria-hidden="true" />
              Free WiFi
            </li>
            <li className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-mountain-500" aria-hidden="true" />
              Fan in every room
            </li>
            <li className="flex items-center gap-2">
              <Bath className="h-4 w-4 text-mountain-500" aria-hidden="true" />
              Shared bathroom available
            </li>
            <li className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-mountain-500" aria-hidden="true" />
              2 min from EPS Exam Center
            </li>
          </ul>
          <p className="mt-4 text-center text-xs text-stone-400">
            Restaurant downstairs (not run by us) · Drinking water provided · Check-in {siteConfig.contact.checkIn} · Check-out {siteConfig.contact.checkOut}
          </p>
        </div>
      </section>

      {/* ── EPS highlight ────────────────────────────────────── */}
      <section className="bg-brand-50 border-y border-brand-100 py-6 px-4">
        <div className="mx-auto max-w-4xl sm:px-2 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <BookOpen className="h-6 w-6 text-brand-600 shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
          <div>
            <p className="font-semibold text-stone-800 text-sm">Staying for the EPS exam?</p>
            <p className="text-stone-600 text-sm mt-0.5">
              The EPS Exam Center is just a 2-minute walk from here. Many of our guests come specifically for the test — we are one of the closest places to stay.
            </p>
          </div>
        </div>
      </section>

      {/* ── Rooms ────────────────────────────────────────────── */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-4xl sm:px-2">
          <h2 className="font-serif text-2xl font-bold text-stone-800 mb-1">Our Rooms</h2>
          <p className="text-sm text-stone-500 mb-8">5 rooms total · Call us to check availability</p>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="border border-stone-200 bg-white overflow-hidden"
              >
                <img
                  src={room.image}
                  alt={`${room.name} at Pathivara Guest House`}
                  className="h-44 w-full object-cover"
                />

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-lg font-semibold text-stone-800">{room.name}</h3>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-mountain-700 text-base leading-none">
                        NPR {room.pricePerNight.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-stone-400 mt-0.5">per night</p>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 text-xs bg-stone-100 text-stone-600 px-2 py-1">
                      <Users className="h-3 w-3" aria-hidden="true" />
                      {room.bedCount} {room.bedCount === 1 ? "bed" : "beds"}
                    </span>
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 ${
                      room.hasBathroom
                        ? "bg-mountain-50 text-mountain-700"
                        : "bg-stone-100 text-stone-600"
                    }`}>
                      <Bath className="h-3 w-3" aria-hidden="true" />
                      {room.hasBathroom ? "Attached bathroom" : "Shared bathroom"}
                    </span>
                    {room.note && (
                      <span className="text-xs text-stone-400 italic">{room.note}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing summary */}
          <div className="mt-8 border border-stone-200 bg-stone-50 p-5">
            <p className="font-semibold text-stone-700 text-sm mb-3">Pricing</p>
            <div className="space-y-1.5 text-sm text-stone-600">
              <div className="flex justify-between">
                <span>Rooms with attached bathroom (Room 23 &amp; 24)</span>
                <span className="font-semibold text-mountain-700">NPR 1,500 / night</span>
              </div>
              <div className="flex justify-between">
                <span>Rooms with shared bathroom (Room 22, 25 &amp; 26)</span>
                <span className="font-semibold text-mountain-700">NPR 1,000 / night</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Location ─────────────────────────────────────────── */}
      <section className="bg-stone-50 py-12 px-4 border-t border-stone-200">
        <div className="mx-auto max-w-4xl sm:px-2">
          <h2 className="font-serif text-2xl font-bold text-stone-800 mb-1">Where we are</h2>
          <p className="text-sm text-stone-500 mb-2">
            {siteConfig.location.address}, {siteConfig.location.city}, {siteConfig.location.country}
          </p>
          <p className="text-sm text-brand-600 font-medium mb-6">{siteConfig.location.landmark}</p>

          <div className="w-full h-64 sm:h-80 overflow-hidden border border-stone-200">
            <iframe
              src={siteConfig.location.mapEmbedSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Pathivara Guest House location on map"
            />
          </div>
        </div>
      </section>

      {/* ── Call to book ─────────────────────────────────────── */}
      <section style={{ backgroundColor: "#082620" }} className="py-10 px-4 text-center">
        <h2 className="font-serif text-xl font-bold text-white mb-2">Want to stay with us?</h2>
        <p className="text-stone-400 text-sm mb-5">Call us directly to check availability and confirm your room.</p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          {siteConfig.contact.phones.map((p) => (
            <a
              key={p.tel}
              href={p.tel}
              className="inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-2.5 transition text-sm"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {p.display}
            </a>
          ))}
        </div>
      </section>

    </div>
  );
}
