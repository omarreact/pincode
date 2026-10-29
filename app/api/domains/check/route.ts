import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REGISTRIES: Record<string, string> = {
  com: "https://rdap.verisign.com/com/v1/domain/",
  net: "https://rdap.verisign.com/net/v1/domain/",
  org: "https://rdap.publicinterestregistry.org/rdap/domain/",
  dev: "https://pubapi.registry.google/rdap/domain/",
  app: "https://pubapi.registry.google/rdap/domain/",
};

type Availability = "registered" | "possibly-available" | "unverified";
type Result = {
  domain: string;
  status: Availability;
  checkedAt: string;
  source: string;
  message: string;
};
const cache = new Map<string, { expires: number; value: Result }>();
const attempts = new Map<string, { count: number; reset: number }>();
const DOMAIN_PATTERN = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+(?:com|net|org|dev|app)$/;

function validDomain(domain: string): boolean {
  return domain.length <= 253 && DOMAIN_PATTERN.test(domain) && domain.split(".").length === 2;
}

function rateLimited(request: NextRequest): boolean {
  const ip = request.headers.get("x-real-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
  const now = Date.now();
  if (attempts.size > 2000) for (const [key, val] of attempts) if (val.reset < now) attempts.delete(key);
  const current = attempts.get(ip);
  if (!current || current.reset < now) {
    attempts.set(ip, { count: 1, reset: now + 60_000 });
    return false;
  }
  current.count += 1;
  return current.count > 30;
}

function result(domain: string, status: Availability, message: string): Result {
  return { domain, status, checkedAt: new Date().toISOString(), source: "Registry RDAP", message };
}

export async function GET(request: NextRequest) {
  const domain = (request.nextUrl.searchParams.get("domain") ?? "").trim().toLowerCase();
  if (!validDomain(domain)) {
    return NextResponse.json({ error: "Enter a valid second-level .com, .net, .org, .dev or .app domain." }, { status: 400 });
  }
  if (rateLimited(request)) {
    return NextResponse.json({ error: "Too many checks. Please retry in a minute." }, { status: 429, headers: { "Retry-After": "60" } });
  }
  const now = Date.now();
  const cached = cache.get(domain);
  if (cached && cached.expires > now) {
    return NextResponse.json(cached.value, { headers: { "Cache-Control": "no-store" } });
  }
  if (cache.size > 1000) for (const [key, value] of cache) if (value.expires < now) cache.delete(key);

  const tld = domain.split(".").at(-1)!;
  let data: Result;
  try {
    const response = await fetch(REGISTRIES[tld] + encodeURIComponent(domain), {
      headers: { Accept: "application/rdap+json, application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(7000),
      redirect: "error",
    });
    if (response.status === 200) {
      const record: unknown = await response.json();
      const name = record && typeof record === "object" && "ldhName" in record ? String(record.ldhName).toLowerCase() : "";
      data = name === domain
        ? result(domain, "registered", "This domain has an active registry record.")
        : result(domain, "unverified", "The registry response could not be verified.");
    } else if (response.status === 404) {
      // RDAP 404 means no matching registry object, NOT guaranteed purchasability.
      // A nonstandard endpoint or an explicit unsupported-query error must not be treated as free.
      const body = (await response.text()).slice(0, 4096).toLowerCase();
      data = /unsupported|not support|invalid query|not implemented|not available for registration|reserved/.test(body)
        ? result(domain, "unverified", "The registry could not confirm whether this name can be registered.")
        : result(domain, "possibly-available", "No registration record found. Confirm with a registrar before buying.");
    } else {
      data = result(domain, "unverified", "The registry is temporarily unable to verify this domain.");
    }
  } catch {
    data = result(domain, "unverified", "The registry could not be reached. Please retry later.");
  }
  cache.set(domain, { expires: now + (data.status === "registered" ? 300_000 : 45_000), value: data });
  return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
}
