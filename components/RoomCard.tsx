import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, BedDouble, Maximize2, Check } from "lucide-react";
import type { Room } from "@/lib/content";

type Props = {
  room: Room;
  featured?: boolean;
};

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export default function RoomCard({ room, featured = false }: Props) {
  return (
    <article
      className={`group flex flex-col overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-mountain-900/20 ${
        featured ? "ring-1 ring-brand-300" : ""
      }`}
    >
      {/* Image with price + badge overlay */}
      <div className="relative h-60 w-full overflow-hidden sm:h-64">
        <Image
          src={room.image}
          alt={`${room.name} at Pathivara Guest House`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />

        {/* Highlight badge */}
        {room.highlight && (
          <div className="absolute top-0 left-0 bg-brand-500 px-3.5 py-1.5 text-[10px] font-bold text-white tracking-[0.15em] uppercase shadow">
            {room.highlight}
          </div>
        )}

        {/* Price — bottom-right overlay */}
        <div className="absolute bottom-0 right-0 bg-mountain-800/92 px-4 py-3 text-right backdrop-blur-sm">
          <p className="font-serif text-xl font-bold text-white leading-none">
            {formatPrice(room.pricePerNight, room.currency)}
          </p>
          <p className="mt-0.5 font-sans text-[9px] text-white/50 uppercase tracking-[0.18em]">per night</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="eyebrow mb-1.5">
          {room.type === "single" ? "Single Room" : room.type === "double" ? "Double Room" : "Suite"}
        </p>
        <h3 className="font-serif text-xl font-semibold leading-snug" style={{ color: "#1C1610" }}>
          {room.name}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-stone-500">{room.shortDesc}</p>

        {/* Quick stats */}
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-stone-400">
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" aria-hidden="true" />
            {room.capacity} {room.capacity === 1 ? "guest" : "guests"}
          </span>
          <span className="flex items-center gap-1.5">
            <BedDouble className="h-3.5 w-3.5" aria-hidden="true" />
            {room.beds}
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
            {room.size}
          </span>
        </div>

        {/* Top amenities */}
        <ul className="mt-4 grid grid-cols-2 gap-1.5 border-t border-stone-100 pt-4">
          {room.amenities.slice(0, 4).map((amenity) => (
            <li key={amenity} className="flex items-center gap-1.5 text-xs text-stone-500">
              <Check className="h-3.5 w-3.5 shrink-0 text-brand-500" aria-hidden="true" />
              {amenity}
            </li>
          ))}
        </ul>

        {/* CTA — full width, mountain green, arrow animates on hover */}
        <div className="mt-5">
          <Link
            href={`/contact?room=${encodeURIComponent(room.name)}`}
            className="group/btn flex items-center justify-between w-full bg-mountain-700 hover:bg-mountain-800 px-5 py-3.5 text-sm font-semibold text-white tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1"
          >
            <span>Enquire About This Room</span>
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
