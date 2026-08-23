import type { Metadata } from "next";
import { Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: `Contact — ${siteConfig.name}`,
};

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      <div style={{ backgroundColor: "#082620" }} className="py-10 px-4 text-center">
        <h1 className="font-serif text-3xl font-bold text-white">Contact</h1>
        <p className="mt-1 text-stone-400 text-sm">Call us to book or ask any questions</p>
      </div>

      <div className="mx-auto max-w-sm px-4 py-12 text-center space-y-6">
        <p className="text-stone-600 text-sm">
          We don&rsquo;t take online bookings. Just give us a call — we&rsquo;ll check availability and sort out your room.
        </p>

        <div className="space-y-2 w-full">
          {siteConfig.contact.phones.map((p) => (
            <a
              key={p.tel}
              href={p.tel}
              className="flex items-center justify-center gap-3 bg-brand-500 hover:bg-brand-600 text-white font-bold px-8 py-3.5 text-base transition w-full"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              {p.display}
            </a>
          ))}
        </div>

        <div className="text-sm text-stone-500 space-y-1 pt-2">
          <p className="flex items-center justify-center gap-1.5">
            <MapPin className="h-4 w-4 shrink-0 text-mountain-500" aria-hidden="true" />
            {siteConfig.location.address}, {siteConfig.location.city}
          </p>
          <p className="text-xs text-stone-400">{siteConfig.location.landmark}</p>
          <p className="text-xs text-stone-400 pt-1">
            Check-in: {siteConfig.contact.checkIn} · Check-out: {siteConfig.contact.checkOut}
          </p>
        </div>
      </div>
    </div>
  );
}
