import type { NextConfig } from "next";
const legacy = ["services", "solutions", "work", "about", "insights", "contact"];
// A static export is used only for the isolated Cloudflare Pages preview.
// Keep the Vercel Next.js build/runtime and its redirect rules unchanged.
const cloudflareExport = process.env.PINCODE_CF_STATIC_EXPORT === "1";
const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(cloudflareExport
    ? { output: "export" as const, trailingSlash: true, images: { unoptimized: true } }
    : { async redirects() {
        return legacy.map((page) => ({
          source: "/" + page + ".html",
          destination: "/" + page,
          permanent: true,
        }));
      } }),
};
export default nextConfig;
