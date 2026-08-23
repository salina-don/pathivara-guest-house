import {
  Wifi, Coffee, Car, Wind, Waves, BookOpen,
  Bike, Utensils, ShieldCheck, MapPin, Package, Baby,
} from "lucide-react";
import { amenities, type Amenity } from "@/lib/content";

// Map icon name strings to Lucide components
const iconMap: Record<string, React.ElementType> = {
  Wifi, Coffee, Car, Wind, Waves, BookOpen,
  Bike, Utensils, ShieldCheck, MapPin, Package, Baby,
};

function AmenityCard({ amenity }: { amenity: Amenity }) {
  const Icon = iconMap[amenity.icon] ?? Wifi;
  return (
    <div className="group flex gap-4 rounded-xl p-5 bg-white ring-1 ring-stone-100 shadow-sm hover:shadow-md transition">
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 group-hover:bg-brand-100 transition"
        aria-hidden="true"
      >
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-semibold text-stone-900 text-sm">{amenity.title}</h3>
        <p className="mt-0.5 text-sm leading-relaxed text-stone-500">{amenity.description}</p>
      </div>
    </div>
  );
}

export default function AmenityGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {amenities.map((a) => (
        <AmenityCard key={a.title} amenity={a} />
      ))}
    </div>
  );
}
