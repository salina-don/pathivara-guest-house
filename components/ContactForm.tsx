"use client";

import { useState, FormEvent, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { siteConfig } from "@/lib/content";

type Status = "idle" | "loading" | "success" | "error";

const ROOMS = [
  "Garden Single A",
  "Garden Single B",
  "Deluxe Double Sawasdee",
  "Deluxe Double Lanna",
  "Deluxe Double Bloom",
  "Pathivara Family Suite",
];

export default function ContactForm() {
  const params = useSearchParams();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    room: params?.get("room") ?? "",
    message: "",
  });

  // Update room from URL param on mount
  useEffect(() => {
    const r = params?.get("room");
    if (r) setFields((f) => ({ ...f, room: r }));
  }, [params]);

  const set = (key: keyof typeof fields) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setFields((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`https://formspree.io/f/${siteConfig.formspreeId}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          phone: fields.phone,
          checkIn: fields.checkIn,
          checkOut: fields.checkOut,
          guests: fields.guests,
          roomPreference: fields.room,
          message: fields.message,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus("success");
      } else {
        throw new Error(data.error ?? "Submission failed");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try emailing us directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-2xl bg-brand-50 ring-1 ring-brand-200">
        <CheckCircle className="h-14 w-14 text-brand-500 mb-4" aria-hidden="true" />
        <h3 className="font-serif text-2xl font-semibold text-stone-900">We&rsquo;ll be in touch soon!</h3>
        <p className="mt-3 text-stone-600 max-w-sm">
          Thank you, {fields.name.split(" ")[0]}. We typically respond within a few hours. Check your inbox — or your spam folder just in case.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Booking enquiry form"
      className="space-y-5"
    >
      {/* Name + Email */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1.5">
            Full name <span aria-hidden="true" className="text-brand-600">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            required
            value={fields.name}
            onChange={set("name")}
            placeholder="Jane Smith"
            className="block w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-stone-900 placeholder-stone-400 shadow-sm transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1.5">
            Email address <span aria-hidden="true" className="text-brand-600">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={fields.email}
            onChange={set("email")}
            placeholder="jane@example.com"
            className="block w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-stone-900 placeholder-stone-400 shadow-sm transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 sm:text-sm"
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1.5">
          Phone / WhatsApp
        </label>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          value={fields.phone}
          onChange={set("phone")}
          placeholder="+1 555 123 4567"
          className="block w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-stone-900 placeholder-stone-400 shadow-sm transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 sm:text-sm"
        />
      </div>

      {/* Check-in / Check-out */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="checkin" className="block text-sm font-medium text-stone-700 mb-1.5">
            Check-in date <span aria-hidden="true" className="text-brand-600">*</span>
          </label>
          <input
            id="checkin"
            type="date"
            required
            value={fields.checkIn}
            onChange={set("checkIn")}
            min={new Date().toISOString().split("T")[0]}
            className="block w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-stone-900 shadow-sm transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="checkout" className="block text-sm font-medium text-stone-700 mb-1.5">
            Check-out date <span aria-hidden="true" className="text-brand-600">*</span>
          </label>
          <input
            id="checkout"
            type="date"
            required
            value={fields.checkOut}
            onChange={set("checkOut")}
            min={fields.checkIn || new Date().toISOString().split("T")[0]}
            className="block w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-stone-900 shadow-sm transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 sm:text-sm"
          />
        </div>
      </div>

      {/* Guests + Room */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-stone-700 mb-1.5">
            Number of guests <span aria-hidden="true" className="text-brand-600">*</span>
          </label>
          <select
            id="guests"
            required
            value={fields.guests}
            onChange={set("guests")}
            className="block w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-stone-900 shadow-sm transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 sm:text-sm"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="room" className="block text-sm font-medium text-stone-700 mb-1.5">
            Room preference
          </label>
          <select
            id="room"
            value={fields.room}
            onChange={set("room")}
            className="block w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-stone-900 shadow-sm transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 sm:text-sm"
          >
            <option value="">No preference</option>
            {ROOMS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          value={fields.message}
          onChange={set("message")}
          placeholder="Anything we should know? Special occasion, dietary needs, early check-in request…"
          className="block w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-stone-900 placeholder-stone-400 shadow-sm transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 sm:text-sm resize-none"
        />
      </div>

      {/* Error */}
      {status === "error" && (
        <div role="alert" className="flex items-start gap-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-8 py-3.5 text-base font-semibold text-white shadow transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" && <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />}
        {status === "loading" ? "Sending…" : "Send Enquiry"}
      </button>

      <p className="text-center text-xs text-stone-400">
        We respond within a few hours · No payment required to enquire
      </p>
    </form>
  );
}
