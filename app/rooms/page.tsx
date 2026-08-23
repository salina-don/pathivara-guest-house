import type { Metadata } from "next";
import { Bath, Users, Wind, Wifi } from "lucide-react";
import { rooms, siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Rooms",
  description: `5 rooms available at ${siteConfig.name}, ${siteConfig.location.address}, ${siteConfig.location.city}.`,
};

export default function RoomsPage() {
  const withBath    = rooms.filter((r) => r.hasBathroom);
  const withoutBath = rooms.filter((r) => !r.hasBathroom);

  return (
    <div className="bg-white min-h-screen">
      <div style={{ backgroundColor: "#082620" }} className="py-10 px-4 text-center">
        <h1 className="font-serif text-3xl font-bold text-white">Rooms</h1>
        <p className="mt-1 text-stone-400 text-sm">5 rooms · Call to check availability</p>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 space-y-12">

        {/* Included in all rooms */}
        <div className="flex flex-wrap gap-4 text-sm text-stone-600 bg-stone-50 border border-stone-200 p-4">
          <span className="font-semibold text-stone-700 w-full sm:w-auto">All rooms include:</span>
          <span className="flex items-center gap-1.5"><Wifi className="h-3.5 w-3.5 text-mountain-500" />Free WiFi</span>
          <span className="flex items-center gap-1.5"><Wind className="h-3.5 w-3.5 text-mountain-500" />Fan</span>
          <span className="text-stone-400">· Drinking water provided</span>
        </div>

        {/* Rooms with bathroom */}
        <section>
          <h2 className="font-serif text-xl font-bold text-stone-800 mb-1">
            With Attached Bathroom
          </h2>
          <p className="text-sm text-mountain-600 font-semibold mb-5">NPR 1,500 / night</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {withBath.map((room) => (
              <div key={room.id} className="border border-stone-200 overflow-hidden">
                <img
                  src={room.image}
                  alt={`${room.name} at Pathivara Guest House`}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg font-semibold text-stone-800">{room.name}</h3>
                    <span className="font-bold text-mountain-700 text-sm">NPR {room.pricePerNight.toLocaleString()}</span>
                  </div>
                  <div className="mt-2 flex gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 text-xs bg-stone-100 text-stone-600 px-2 py-1">
                      <Users className="h-3 w-3" />{room.bedCount} beds
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs bg-mountain-50 text-mountain-700 px-2 py-1">
                      <Bath className="h-3 w-3" />Attached bathroom
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rooms without bathroom */}
        <section>
          <h2 className="font-serif text-xl font-bold text-stone-800 mb-1">
            With Shared Bathroom
          </h2>
          <p className="text-sm text-mountain-600 font-semibold mb-1">NPR 1,000 / night</p>
          <p className="text-xs text-stone-400 mb-5">One shared bathroom is available outside</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {withoutBath.map((room) => (
              <div key={room.id} className="border border-stone-200 overflow-hidden">
                <img
                  src={room.image}
                  alt={`${room.name} at Pathivara Guest House`}
                  className="h-44 w-full object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg font-semibold text-stone-800">{room.name}</h3>
                    <span className="font-bold text-mountain-700 text-sm">NPR {room.pricePerNight.toLocaleString()}</span>
                  </div>
                  <div className="mt-2 flex gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 text-xs bg-stone-100 text-stone-600 px-2 py-1">
                      <Users className="h-3 w-3" />{room.bedCount} beds
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs bg-stone-100 text-stone-600 px-2 py-1">
                      <Bath className="h-3 w-3" />Shared bathroom
                    </span>
                    {room.note && (
                      <span className="text-xs text-stone-400 italic">{room.note}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
