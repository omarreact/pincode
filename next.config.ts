import type { NextConfig } from "next";
const legacy = ["services","solutions","work","about","insights","contact"];
const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return legacy.map((page) => ({
      source: "/"+page+".html",
      destination: "/"+page,
      permanent: true,
    }));
  },
};
export default nextConfig;
