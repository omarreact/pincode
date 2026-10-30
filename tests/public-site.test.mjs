import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, extname } from "node:path";

const read = (file) => readFileSync(new URL("../" + file, import.meta.url), "utf8");

function sourceFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return sourceFiles(full);
    return /\.(?:html|js|jsx|tsx|ts|css|md|json|svg|xml)$/i.test(extname(full)) ? [full] : [];
  });
}

test("original homepage orbit, typography and scroll transitions are retained", () => {
  const css = read("public/legacy-home.css");
  const component = read("components/LegacyHomepage.tsx");
  assert.match(css, /--brand:#00b980/);
  assert.match(css, /@keyframes spin/);
  assert.match(css, /\.reveal/);
  assert.match(component, /originalHomepageHTML/);
  assert.match(component, /data-scroller/);
  assert.match(component, /IntersectionObserver/);
});

test("both restored styling and glass styling are shipped as page resources", () => {
  const page = read("app/page.tsx");
  assert.match(page, /\/legacy-home\.css/);
  assert.match(page, /\/legacy-glass\.css/);
  assert.doesNotMatch(read("components/LegacyHomepage.tsx"), /legacy-home\.js/);
});

test("glass backgrounds cover navigation, controls and card families", () => {
  const css = read("public/legacy-glass.css");
  for (const name of [".site-header", ".mega-menu", ".nav-link", ".button", ".service-tile", ".story-card", ".process-step", ".case-card", ".cta-band", ".modal-card"]) {
    assert.ok(css.includes(name), "Missing glass style for " + name);
  }
  assert.match(css, /backdrop-filter/);
  const pages = read("app/glass.css");
  for (const name of [".head", ".navigation", ".pill", ".marketing-card", ".contact-builder", ".builder-options button"]) {
    assert.ok(pages.includes(name), "Missing Next.js glass style for " + name);
  }
});

test("public source and legacy snapshots contain no phone numbers or WhatsApp links", () => {
  const dirs = ["app", "components", "public", "docs"].flatMap(sourceFiles);
  const root = readdirSync(new URL("..", import.meta.url))
    .filter((name) => /\.(?:html|js|css|json|xml|md)$/i.test(name));
  for (const file of [...dirs, ...root]) {
    const body = file.startsWith("/") ? readFileSync(file, "utf8") : read(file);
    assert.doesNotMatch(body, /(?:\+?880[\s-]*1[\d\s-]{8,}|\b01[3-9]\d{8}\b|wa\.me\/\d+|href=["']tel:\+?\d+)/i, "Phone leak: " + file);
  }
});

test("the enquiry builder opens email rather than a phone-dependent service", () => {
  const builder = read("components/ContactBuilder.tsx");
  assert.match(builder, /mailto:pincodeit\.com\.bd@gmail\.com/);
  assert.match(builder, /Continue by email/);
});

test("legacy marketing URLs redirect to Next.js pages", () => {
  const config = read("next.config.ts");
  assert.match(config, /permanent:\s*true/);
  assert.match(config, /\.html/);
});


test("all public Next.js pages use the shared glass design system", () => {
  const layout = read("app/layout.tsx");
  assert.match(layout, /import "\.\/all-pages\.css"/);
  const css = read("app/all-pages.css");
  for (const selector of [
    ".agency-page-hero", ".agency-hero-panel", ".agency-glass-button",
    ".agency-index-link", ".agency-detail-card", ".agency-card-link",
    ".agency-contact-shell", ".agency-contact-option",
    ".agency-form-progress", ".agency-site-header", ".agency-foot-grid",
  ]) {
    assert.ok(css.includes(selector), "Missing shared glass style: " + selector);
  }

  const marketing = read("components/MarketingPage.tsx");
  for (const className of [
    "agency-page-hero", "agency-hero-panel", "agency-index",
    "agency-detail-card", "agency-glass-button", "agency-footer-cta",
  ]) {
    assert.ok(marketing.includes(className), "Missing shared page component: " + className);
  }
  for (const page of ["services", "solutions", "work", "about", "insights"]) {
    assert.match(read("app/" + page + "/page.tsx"), /<MarketingPage/);
  }
  const contact = read("app/contact/page.tsx");
  assert.match(contact, /agency-subpage/);
  assert.match(contact, /agency-contact-shell/);
  assert.match(contact, /agency-contact-option/);
  assert.match(contact, /<ContactBuilder/);

  const home = read("app/page.tsx");
  assert.match(home, /LegacyHomepage/);
  assert.match(home, /legacy-glass\.css/);
});

test("navigation, enquiry and accessibility fallback work across screen sizes", () => {
  const header = read("components/SiteShell.tsx");
  assert.match(header, /usePathname/);
  assert.match(header, /aria-current/);
  assert.match(header, /aria-expanded/);
  assert.match(header, /agency-main-nav/);
  assert.match(header, /agency-skip/);
  const styles = read("app/all-pages.css");
  assert.match(styles, /@media\(max-width:890px\)/);
  assert.match(styles, /prefers-reduced-motion/);
  assert.match(styles, /prefers-reduced-transparency/);
  assert.match(styles, /@supports not/);
  const builder = read("components/ContactBuilder.tsx");
  assert.match(builder, /agency-form-progress/);
  assert.match(builder, /aria-pressed/);
  assert.match(builder, /mailto:pincodeit\.com\.bd@gmail\.com/);
  assert.match(builder, /Start again/);
});

test("domain search is reachable from public navigation", () => {
  assert.ok(read("components/LegacyHomepage.tsx").includes("/domains"));
  assert.ok(read("components/SiteShell.tsx").includes('href: "/domains"'));
  assert.ok(read("app/domains/page.tsx").includes("<DomainSearch"));
  assert.ok(read("app/domains/page.tsx").includes("<SiteHeader"));
});

test("domain lookup uses validated RDAP and cautious availability wording", () => {
  const api = read("app/api/domains/check/route.ts");
  const ui = read("components/DomainSearch.tsx");
  for (const phrase of ["rdap.verisign.com", "rdap.publicinterestregistry.org", "pubapi.registry.google", "rateLimited", "possibly-available"]) {
    assert.ok(api.includes(phrase), "Missing domain lookup feature: " + phrase);
  }
  assert.ok(ui.includes("Confirm final availability and pricing"));
  assert.ok(ui.includes('aria-live="polite"'));
});

test("provider comparisons show source, renewal and external provider checkout", () => {
  const market=read("components/ProviderMarketplace.tsx");
  const domainPage=read("app/domains/page.tsx");
  const hosting=read("app/hosting/page.tsx");
  const shell=read("components/SiteShell.tsx");
  const catalog=read("lib/provider-marketplace.ts");
  assert.match(domainPage, /kind="domain"/);
  assert.match(hosting, /kind="hosting"/);
  assert.ok(shell.includes('href: "/hosting"'));
  assert.ok(market.includes('rel="noopener noreferrer"'));
  assert.ok(market.includes("Published renewal equivalent"));
  assert.ok(market.includes('basis==="refreshed"'));
  assert.ok(catalog.includes("https://www.hostinger.com/web-hosting"));
  assert.ok(catalog.includes("https://porkbun.com/products/domains"));
  assert.ok(catalog.includes("couponFromOfficial"));
  assert.ok(catalog.includes("Date.now()>=Date.parse(expires)"));
});

test("marketplace feed is restricted and transparently cached", () => {
  const api=read("app/api/marketplace/offers/route.ts");
  assert.ok(api.includes('kind!=="hosting"&&kind!=="domain"'));
  assert.ok(api.includes("s-maxage=900"));
  assert.ok(read("components/LegacyHomepage.tsx").includes("/hosting"));
  assert.ok(read("app/domains/marketplace.css").includes("@media(max-width:760px)"));
});

test("refined PINCODE IT logo is consistent across header, footer, legacy homepage and metadata", () => {
  const symbol = read("public/brand/pincode-mark.svg");
  assert.match(symbol, /pincode-v2-grad/);
  assert.match(symbol, /fill-rule="evenodd"/);
  const header = read("components/SiteShell.tsx");
  assert.match(header, /img src="\/brand\/pincode-mark\.svg"/);
  assert.doesNotMatch(header, /<svg viewBox="0 0 48 48"/);
  const legacy = read("components/LegacyHomepage.tsx");
  assert.ok(legacy.includes("/brand/pincode-mark.svg"));
  assert.doesNotMatch(legacy, /M24 3 42 13.5/);
  const layout = read("app/layout.tsx");
  assert.ok(layout.includes("/brand/pincode-horizontal-light.svg"));
  assert.ok(layout.includes("/favicon.svg"));
  assert.match(read("public/favicon.svg"), /pincode-v2-grad/);
  assert.match(read("app/icon.svg"), /pincode-v2-grad/);
});

test("the standalone root HTML website is retired in favor of Next.js routes", () => {
  for (const file of ["index.html","about.html","services.html","solutions.html","work.html","insights.html","contact.html","styles.css","script.js","favicon.svg","robots.txt","sitemap.xml"]) {
    assert.equal(existsSync(new URL("../" + file, import.meta.url)), false, "Legacy root asset remains: " + file);
  }
  for (const route of ["page.tsx", "services/page.tsx", "solutions/page.tsx", "work/page.tsx",
    "about/page.tsx", "insights/page.tsx", "contact/page.tsx", "domains/page.tsx", "hosting/page.tsx"]) {
    assert.equal(existsSync(new URL("../app/" + route, import.meta.url)), true, "Missing Next.js page: " + route);
  }
});

test("pre-navigation dark bars are removed without altering the visual sections", () => {
  const homepage = read("components/LegacyHomepage.tsx");
  const sharedHeader = read("components/SiteShell.tsx");
  const unusedPublicWebsite = read("components/PublicWebsite.tsx");
  const css = read("public/legacy-home.css");

  assert.ok(!homepage.includes("announcement"));
  assert.ok(!sharedHeader.includes("noticebar"));
  assert.ok(!unusedPublicWebsite.includes("noticebar"));
  assert.ok(!read("app/all-pages.css").includes(".noticebar{"));
  assert.ok(!read("app/globals.css").includes(".noticebar{"));
  assert.ok(!css.includes(".announcement{"));
  assert.ok(!read("public/legacy-glass.css").includes(".announcement{"));
  assert.ok(css.includes(".mega-menu{position:fixed;top:var(--nav)"));
  assert.ok(!css.includes("38px + var(--nav)"));
  assert.ok(homepage.includes("hero-orbit"));
  assert.ok(homepage.includes("data-scroller"));
  assert.ok(sharedHeader.includes("agency-site-header"));
});
