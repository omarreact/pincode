import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
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
