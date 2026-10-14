import type { MetadataRoute } from "next";
export default function robots():MetadataRoute.Robots{return {rules:[{userAgent:"*",allow:"/",disallow:["/nid_dob","/nid_dob/"]}],sitemap:"https://www.pincodeit.com/sitemap.xml"}}
