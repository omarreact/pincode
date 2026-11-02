import type { MetadataRoute } from "next";
import { site } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/nid_dob", "/nid_dob/"],
    }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
