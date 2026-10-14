import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The legacy HTML URLs remain public during the App Router migration.
  // Never rewrite /nid_dob or its API endpoints into marketing pages.
  reactStrictMode: true,
};
export default nextConfig;
