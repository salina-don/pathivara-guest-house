import { Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/content";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#051C16" }} className="text-stone-400 py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-2">
        <p className="font-serif text-white text-base font-semibold">{siteConfig.name}</p>
        <p className="flex items-center justify-center gap-1.5 text-sm text-stone-400">
          <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {siteConfig.location.address}, {siteConfig.location.city} — {siteConfig.location.landmark}
        </p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          {siteConfig.contact.phones.map((p) => (
            <a
              key={p.tel}
              href={p.tel}
              className="inline-flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-300 transition"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {p.display}
            </a>
          ))}
        </div>
        <p className="text-xs text-stone-600 pt-2">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
