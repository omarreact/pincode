import { readdirSync, existsSync, statSync, readFileSync } from "node:fs";
import { join } from "node:path";

if (process.env.PINCODE_CF_STATIC_EXPORT !== "1") {
  throw new Error("This build requires PINCODE_CF_STATIC_EXPORT=1, never alter the default Vercel build.");
}
if (!existsSync("next.config.ts")) throw new Error("Next.js source configuration is missing");

function files(root) {
  if (!existsSync(root)) return [];
  return readdirSync(root).flatMap(item => {
    const path = join(root, item);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
}
const sources = files("app");
const unsupported = sources.filter(path =>
  /(?:^|[/\\])api(?:[/\\])/.test(path) ||
  /(?:^|[/\\])\[[^/\\]+\]/.test(path) ||
  /(?:^|[/\\])route\.(?:ts|tsx|js)$/.test(path) && !/[\\/]robots\.|[\\/]sitemap\./.test(path)
);
if (unsupported.length) {
  throw new Error("Static export review required for dynamic routes: " + unsupported.join(", "));
}
for (const name of ["services", "solutions", "work", "about", "insights", "contact"]) {
  if (!sources.includes(join("app", name, "page.tsx"))) throw new Error("Missing page: " + name);
}
const redirectSource = readFileSync("public/_redirects", "utf8");
for (const name of ["services", "solutions", "work", "about", "insights", "contact"]) {
  if (!redirectSource.includes("/" + name + ".html /" + name + " 301")) {
    throw new Error("Missing Cloudflare legacy redirect: " + name);
  }
}
console.log("Cloudflare static export preflight: 7 public routes, no API routes, legacy redirects present.");
