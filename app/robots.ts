import type { MetadataRoute } from "next";

// Deterministic metadata works on Vercel and in the optional Cloudflare Pages static export.
export const dynamic = "force-static";
export default function robots():MetadataRoute.Robots{return {rules:[{userAgent:"*",allow:"/",disallow:["/nid_dob","/nid_dob/"]}],sitemap:"https://www.pincodeit.com/sitemap.xml"}}
