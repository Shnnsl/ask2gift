import type { MetadataRoute } from "next";
import { giftGuides } from "@/lib/guides";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/quiz`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.url}/gift-guides`, lastModified, changeFrequency: "weekly", priority: 0.9 }
  ];

  const guides: MetadataRoute.Sitemap = giftGuides.map((guide) => ({
    url: `${siteConfig.url}/gift-guides/${guide.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: guide.group === "christmas" ? 0.9 : 0.7
  }));

  const information: MetadataRoute.Sitemap = ["/about", "/contact", "/privacy", "/terms", "/affiliate-disclosure"].map(
    (route) => ({ url: `${siteConfig.url}${route}`, lastModified, changeFrequency: "yearly", priority: 0.3 })
  );

  return [...pages, ...guides, ...information];
}
