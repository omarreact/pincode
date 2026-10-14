import type { MetadataRoute } from "next";
const pages=["","services","solutions","work","about","insights","contact"];
export default function sitemap():MetadataRoute.Sitemap{return pages.map(p=>({url:"https://www.pincodeit.com/"+p,changeFrequency:p?"monthly":"weekly",priority:p?0.7:1}))}
