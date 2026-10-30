// PINCODE IT isolated Cloudflare Worker acceptance gate. Read-only requests only.
const base = new URL("https://cf-migrate-pincode-preview.farukkhanone.workers.dev/");
const checks = [
  { path: "/", type: "html" },
  { path: "/services", type: "html" },
  { path: "/domains", type: "html" },
  { path: "/hosting", type: "html" },
  { path: "/contact", type: "html" },
  { path: "/about", type: "html" },
  { path: "/api/domains/check", type: "bad-input" },
  { path: "/api/marketplace/offers", type: "bad-input" },
  { path: "/api/domains/check?domain=example.com", type: "rdap" },
];
let failed = 0;
for (const check of checks) {
  const url = new URL(check.path, base);
  try {
    const response = await fetch(url, {
      redirect: "manual",
      signal: AbortSignal.timeout(25000),
      headers: { "user-agent": "PINCODE-Cloudflare-Isolated-Stage/1.0" },
    });
    const ct = response.headers.get("content-type") || "";
    const body = (await response.text()).slice(0, 250000);
    let pass = false;
    switch (check.type) {
      case "html":
        pass = response.status === 200 &&
          ct.includes("text/html") &&
          body.toLowerCase().includes("<html") &&
          body.includes("PINCODE");
        break;
      case "bad-input":
        pass = response.status === 400 && ct.includes("application/json");
        break;
      case "rdap":
        try {
          const data = JSON.parse(body);
          pass = response.status === 200 &&
            data.domain === "example.com" &&
            ["registered", "possibly-available", "unverified"].includes(data.status);
        } catch { pass = false; }
        break;
    }
    console.log(`${pass ? "PASS" : "FAIL"} ${check.path} → HTTP ${response.status} [${check.type}]`);
    if (!pass) failed++;
  } catch (error) {
    console.error(`FAIL ${check.path} → ${error instanceof Error ? error.message : String(error)}`);
    failed++;
  }
}
if (failed) {
  console.error(`Do not cut over pincodeit.com: ${failed} isolated Worker checks failed.`);
  process.exitCode = 1;
}
