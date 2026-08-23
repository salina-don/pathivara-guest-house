import type { Metadata } from "next";
import { MapPin, Phone } from "lucide-react";

import { siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: `Location — ${siteConfig.name}`,
  description: `Find ${siteConfig.name} at ${siteConfig.location.address}, ${siteConfig.location.city}, Nepal.`,
};

export default function LocationPage() {
  return (
    <div className="bg-white min-h-screen">
      <div style={{ backgroundColor: "#082620" }} className="py-10 px-4 text-center">
        <h1 className="font-serif text-3xl font-bold text-white">Find Us</h1>
        <p className="mt-1 text-stone-400 text-sm">{siteConfig.location.landmark}</p>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 space-y-6">

        {/* Address card */}
        <div className="border border-stone-200 p-5 bg-stone-50">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-mountain-600 mt-0.5 shrink-0" aria-hidden="true" />
            <div className="space-y-0.5 text-stone-700">
              <p className="font-semibold">{siteConfig.name}</p>
              <p>{siteConfig.location.address}</p>
              <p>{siteConfig.location.city}, {siteConfig.location.country}</p>
              <p className="text-brand-600 font-medium text-sm mt-1">{siteConfig.location.landmark}</p>
            </div>
          </div>
        </div>

        {/* How to find us */}
        <div className="border border-stone-200 p-5">
          <h2 className="font-serif text-lg font-bold text-stone-800 mb-3">How to find us</h2>
          <ul className="space-y-2 text-sm text-stone-600 list-disc list-inside">
            <li>We are located in Bhaisepati, Saibu ward of Lalitpur-25</li>
            <li>Look for the Wai Wai factory — we are nearby</li>
            <li>The EPS Exam Center is a 2-minute walk from us</li>
            <li>If you are lost, call us and we will guide you</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {siteConfig.contact.phones.map((p) => (
              <a
                key={p.tel}
                href={p.tel}
                className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-4 py-2 transition"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {p.display}
              </a>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="w-full h-72 sm:h-96 overflow-hidden border border-stone-200">
          <iframe
            src={siteConfig.location.mapEmbedSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Pathivara Guest House on map"
          />
        </div>

      </div>
    </div>
  );
}
