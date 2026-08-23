import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const lastModified = new Date();

  return [
    { url: base,               lastModified, changeFrequency: "weekly",  priority: 1 },
    { url: `${base}/rooms`,    lastModified, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/amenities`,lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/gallery`,  lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/location`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`,    lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`,  lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
}
