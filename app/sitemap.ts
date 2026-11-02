import type { MetadataRoute } from "next";
import { site } from "@/lib/site-config";

const pages = ["", "services", "solutions", "work", "about", "insights", "contact", "domains", "hosting", "privacy", "terms"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(path => ({
    url: `${site.url}/${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : ["domains", "hosting", "services"].includes(path) ? 0.8 : 0.6,
  }));
}
