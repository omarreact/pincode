import type { MetadataRoute } from "next";
import { site } from "@/lib/site-config";
import { insightArticles } from "@/lib/insight-articles";

const pages = ["", "services", "solutions", "work", "about", "insights", "contact", "domains", "hosting", "privacy", "terms"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = pages.map(path => ({
    url: `${site.url}/${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : ["domains", "hosting", "services"].includes(path) ? 0.8 : 0.6,
  }));
  const articlePages: MetadataRoute.Sitemap = insightArticles.map(article => ({
    url: `${site.url}/insights/${article.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  return [...staticPages, ...articlePages];
}
