"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { siteConfig } from "@/lib/content";

const navLinks = [
  { href: "/",         label: "Home" },
  { href: "/rooms",    label: "Rooms" },
  { href: "/location", label: "Location" },
];

export default function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => { setIsOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-50 bg-mountain-800 shadow-md">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="flex h-14 items-center justify-between">

            {/* Name */}
            <Link href="/" className="font-serif text-base font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded">
              {siteConfig.name}
            </Link>

            {/* Desktop nav */}
            <nav className="hidden sm:flex items-center gap-5" aria-label="Main navigation">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm transition-colors focus-visible:outline-none focus-visible:underline ${
                    isActive(href) ? "text-brand-300 font-semibold" : "text-white/70 hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              ))}
              <a
                href={siteConfig.contact.phones[0].tel}
                className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-4 py-1.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                Call to Book
              </a>
            </nav>

            {/* Mobile hamburger */}
            <button
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsOpen((v) => !v)}
              className="sm:hidden p-2 text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 sm:hidden transition-opacity duration-200 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} aria-hidden="true" />
        <div className={`absolute top-14 left-0 right-0 bg-mountain-800 shadow-xl transition-transform duration-200 ${isOpen ? "translate-y-0" : "-translate-y-2"}`}>
          <ul className="px-4 py-3 space-y-0.5">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block px-3 py-2.5 text-sm rounded transition-colors ${
                    isActive(href) ? "text-brand-300 font-semibold" : "text-white/70 hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-4 pb-4 space-y-2">
            {siteConfig.contact.phones.map((p) => (
              <a
                key={p.tel}
                href={p.tel}
                className="flex items-center justify-center gap-2 w-full bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-4 py-2.5 transition"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {p.display}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
