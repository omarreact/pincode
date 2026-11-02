import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

/**
 * Source-wide stock photo check.
 * A permanent 404 must block a release; transient network errors are reported
 * without treating an external image CDN outage as a code regression.
 */
function collectSources(dir) {
  const paths = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) paths.push(...collectSources(path));
    else if (/\.(?:ts|tsx|css)$/.test(name)) paths.push(path);
  }
  return paths;
}
const files = ["lib", "components", "app", "public"].flatMap(collectSources);
const ids = [...new Set(files.flatMap(file => {
  const source = readFileSync(file, "utf8");
  return [...source.matchAll(/photo-\d{13}-[a-z0-9]+/gi)].map(match => match[0]);
}))];
if (!ids.length) throw new Error("No source photography identifiers were found");

const broken = [];
const networkWarnings = [];
const parallel = 5;

async function check(id) {
  const url = `https://images.unsplash.com/${id}?fit=crop&w=64&q=30`;
  try {
    const result = await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(12_000) });
    if (result.status === 404 || result.status === 410) broken.push({ id, status: result.status });
    else if (!result.ok) networkWarnings.push({ id, status: result.status });
  } catch (error) {
    networkWarnings.push({ id, message: String(error) });
  }
}

for (let i = 0; i < ids.length; i += parallel) {
  await Promise.all(ids.slice(i, i + parallel).map(check));
}
console.log(`Checked ${ids.length} distinct stock-photo URLs.`);
if (networkWarnings.length) {
  console.warn("Non-404 image CDN/network warnings:", JSON.stringify(networkWarnings));
}
if (broken.length) {
  console.error("Broken Unsplash image identifiers:", JSON.stringify(broken));
  process.exitCode = 1;
}
