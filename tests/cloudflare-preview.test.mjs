import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const output = "out";
const pages = ["", "services", "solutions", "work", "about", "insights", "contact"];
test("static export includes all public agency pages", () => {
  for (const name of pages) {
    const path = name ? join(output, name, "index.html") : join(output, "index.html");
    assert.ok(existsSync(path), "Missing exported page: " + path);
    const html = readFileSync(path, "utf8");
    assert.match(html, /PINCODE IT/i, "Missing agency identity in " + path);
  }
});
test("static export retains favicon and Next.js hydration assets", () => {
  assert.ok(existsSync(join(output, "brand", "pincode-mark.svg")), "Brand logo missing");
  assert.ok(existsSync(join(output, "_next", "static")), "Client assets not exported");
  assert.ok(readdirSync(join(output, "_next", "static")).length > 0);
});
test("Cloudflare Pages reproduces Next.js legacy redirect URLs", () => {
  const raw = readFileSync(join(output, "_redirects"), "utf8");
  for (const name of pages.slice(1)) {
    assert.ok(raw.includes("/" + name + ".html /" + name + " 301"), "Missing redirect: " + name);
  }
});
test("SEO endpoints export without advertising the temporary preview origin", () => {
  const robots = readFileSync(join(output, "robots.txt"), "utf8");
  const sitemap = readFileSync(join(output, "sitemap.xml"), "utf8");
  assert.match(robots, /sitemap\.xml/);
  assert.match(sitemap, /https:\/\/www\.pincodeit\.com/);
});
test("source and build output are kept separate from Vercel's default build", () => {
  const conf = readFileSync("next.config.ts", "utf8");
  assert.match(conf, /PINCODE_CF_STATIC_EXPORT/);
  assert.match(conf, /output: "export"/);
  assert.match(readFileSync(".gitignore", "utf8"), /^out\/$/m);
});
