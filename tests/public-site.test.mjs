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

test("Next.js source tree is organized without unused root snapshots", () => {
  const root = readdirSync(new URL("..", import.meta.url));
  const components = readdirSync(new URL("../components", import.meta.url));
  for (const artifact of ["robots.txt", "sitemap.xml", "favicon.svg"]) {
    assert.ok(!root.includes(artifact), "Obsolete root asset: " + artifact);
  }
  assert.ok(!components.includes("PublicWebsite.tsx"));
  for (const folder of ["home", "layout", "marketing", "contact", "domains", "marketplace"]) {
    assert.ok(components.includes(folder), "Missing component group: " + folder);
  }
  assert.match(read("app/sitemap.ts"), /insightArticles/);
  assert.match(read("app/robots.ts"), /site.url/);
});

test("Process section uses four compact cards without redundant stage pills", () => {
  const home = read("components/home/LegacyHomepage.tsx");
  const css = read("public/legacy-home.css");
  const glass = read("public/legacy-glass.css");

  assert.ok(home.includes("process-section"));
  assert.ok(home.includes("process-heading"));
  for (const stage of ["discover", "define", "build", "operate"]) {
    assert.ok(home.includes(stage), "Missing process stage: " + stage);
  }
  assert.doesNotMatch(home, /process-nav|data-process-link|processObserver|data-process-section/);
  assert.doesNotMatch(css, /\\.process-nav/);
  assert.doesNotMatch(glass, /\\.process-nav/);
  assert.ok(css.includes(".process-section .process-list{"));
  assert.ok(css.includes("grid-template-columns:repeat(2,minmax(0,1fr))"));
  assert.ok(css.includes("min-height:190px"));
  assert.ok(css.includes("@media(max-width:700px)"));
  assert.ok(css.includes("grid-template-columns:minmax(0,1fr)"));
  assert.ok(css.includes("scroll-margin-top:calc(var(--nav) + 18px)"));
});

test("Windows 150% scaling and browser zoom keep the homepage proportional", () => {
  const css = read("public/legacy-home.css");
  const nav = read("components/layout/LegacyNavigation.tsx");
  const home = read("components/home/LegacyHomepage.tsx");

  // A 1920px monitor at 150% presents ~1280 CSS pixels, not 1920.
  assert.ok(css.includes("@media(min-width:1181px) and (max-width:1500px)"));
  assert.ok(css.includes("@media(max-width:1180px)"));
  assert.ok(nav.includes("(max-width: 1180px)"), "Menu logic and CSS need identical breakpoints");
  assert.ok(css.includes(".nav-links{display:none}"));
  assert.ok(css.includes(".mobile-primary{display:block}"));

  // Photo regions must be bounded; they used to occupy most of each card.
  assert.ok(css.includes(".pincode-preview-window{"));
  assert.ok(css.includes("height:clamp(160px,17vw,232px)"));
  assert.ok(css.includes("object-position:center 70%"));
  assert.ok(css.includes(".case-screen,"));
  assert.ok(css.includes("order:-1;"));
  assert.ok(css.includes("height:clamp(180px,19vw,245px)"));
  assert.ok(css.includes(".service-tile .button{"));
  assert.ok(css.includes("margin-bottom:120px"));
  assert.ok(css.includes("@media(max-width:620px)"));
  assert.ok(home.includes("pincode-visual-proof-grid"));
  assert.ok(home.includes("case-grid"));
  assert.ok(home.includes("(max-width: 620px) 92vw"));
  assert.ok(home.includes("(max-width: 620px) 84vw"));
  assert.ok(home.includes("(max-width: 900px) 94vw"));
});

test("mobile UI stays visible, compact and free of overlapping duplicate CTAs", () => {
  const homepage = read("components/home/LegacyHomepage.tsx");
  const base = read("public/legacy-home.css");
  const site = read("app/globals.css");
  const identity = read("components/home/BusinessIdentity.tsx");

  // The old full-page screenshot bug came from opacity:0 until an
  // IntersectionObserver callback fired for every below-the-fold section.
  assert.doesNotMatch(homepage, /revealObserver/);
  assert.ok(base.includes("#pincode-legacy-home .reveal,"));
  assert.match(base, /@keyframes pincode-hero-enter/);
  assert.match(base, /prefers-reduced-motion:reduce/);
  assert.ok(site.includes("[data-site-motion].site-motion-pending"));

  // A second floating project button obscured the mobile heading.
  assert.ok(!homepage.includes("floating-contact"));
  // The homepage's footer is the only visible footer; the organization
  // metadata is still emitted as a JSON-LD script.
  assert.ok(identity.includes("application/ld+json"));
  assert.doesNotMatch(identity, /<section|<h2|<address/);

  // Responsive treatment: no huge fixed mobile hero height, and the
  // gallery, process and service cards are reasonably dense.
  assert.match(base, /max-width:760px/);
  assert.ok(base.includes(".hero{min-height:0;padding:28px 0 45px}"));
  assert.ok(base.includes(".pincode-visual-proof-grid{grid-template-columns:repeat(2,minmax(0,1fr))"));
  assert.ok(base.includes(".process-step{min-height:165px"));
  assert.ok(base.includes(".service-tile{"));
  assert.ok(base.includes("background-color:#0d3021"));
});

test("homepage has no announcement top bar and dropdown stays aligned", () => {
  const home = read("components/home/LegacyHomepage.tsx");
  const css = read("public/legacy-home.css");
  const glass = read("public/legacy-glass.css");
  assert.match(home, /<LegacyNavigation \/>/);
  assert.doesNotMatch(home, /Building something new\?/);
  assert.doesNotMatch(css, /\.announcement\b/);
  assert.doesNotMatch(glass, /\.announcement\b/);
  assert.match(css, /\.mega-menu\{position:fixed;top:var\(--nav\);/);
  assert.doesNotMatch(css, /top:calc\(38px \+ var\(--nav\)\)/);
});

test("original homepage orbit, typography and scroll transitions are retained", () => {
  const css = read("public/legacy-home.css");
  const component = read("components/home/LegacyHomepage.tsx");
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
  assert.doesNotMatch(read("components/home/LegacyHomepage.tsx"), /legacy-home\.js/);
});

test("glass backgrounds cover navigation, controls and card families", () => {
  const css = read("public/legacy-glass.css");
  for (const name of [".site-header", ".mega-menu", ".nav-link", ".button", ".service-tile", ".story-card", ".process-step", ".case-card", ".cta-band", ".modal-card"]) {
    assert.ok(css.includes(name), "Missing glass style for " + name);
  }
  assert.match(css, /backdrop-filter/);
  assert.doesNotMatch(read("app/globals.css"), /\.noticebar\{/);
  const pages = read("app/glass.css");
  for (const name of [".contact-builder", ".builder-options button", ".builder-back", ".builder-finish input", ".foot"]) {
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
  const builder = read("components/contact/ContactBuilder.tsx");
  assert.match(builder, /mailto:admin@pincodeit\.com/);
  assert.match(builder, /Continue by email/);
});

test("legacy marketing URLs redirect to Next.js pages", () => {
  const config = read("next.config.ts");
  assert.match(config, /permanent:\s*true/);
  assert.match(config, /\.html/);
});


test("all public Next.js pages use the shared glass design system", () => {
  const layout = read("app/layout.tsx");
  assert.doesNotMatch(layout, /import "\.\/all-pages\.css"/);
  assert.match(read("components/layout/SiteShell.tsx"), /import "@\/app\/all-pages\.css"/);
  assert.match(read("app/error.tsx"), /import "\.\/all-pages\.css"/);
  const css = read("app/all-pages.css");
  for (const selector of [
    ".agency-page-hero", ".agency-hero-panel", ".agency-glass-button",
    ".agency-index-link", ".agency-detail-card", ".agency-card-link",
    ".agency-contact-shell", ".agency-contact-option",
    ".agency-form-progress", ".agency-site-header", ".agency-foot-grid",
  ]) {
    assert.ok(css.includes(selector), "Missing shared glass style: " + selector);
  }

  const shared = [
    ["components/marketing/AgencyPageHero.tsx", ["agency-page-hero", "agency-hero-panel"]],
    ["components/marketing/AgencyActionLink.tsx", ["agency-glass-button"]],
    ["components/marketing/MarketingPage.tsx", ["agency-index", "agency-card-grid"]],
    ["components/marketing/MarketingTopic.tsx", ["agency-index-link", "agency-detail-card"]],
    ["components/marketing/MarketingCallToAction.tsx", ["agency-footer-cta"]],
  ];
  for (const [file, classNames] of shared) {
    const source = read(file);
    for (const className of classNames) {
      assert.ok(source.includes(className), "Missing shared component: " + file + " / " + className);
    }
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
  const header = read("components/layout/SiteShell.tsx");
  const nav = read("components/layout/LegacyNavigation.tsx");
  assert.match(nav, /usePathname/);
  assert.match(nav, /aria-current/);
  assert.match(nav, /aria-expanded/);
  assert.match(header, /pincode-shared-nav/);
  assert.match(header, /skip-link/);
  assert.match(header, /LegacyNavigation/);
  const styles = read("app/all-pages.css");
  assert.match(styles, /@media\(max-width:890px\)/);
  assert.match(styles, /prefers-reduced-motion/);
  assert.match(styles, /prefers-reduced-transparency/);
  assert.match(styles, /@supports not/);
  const builder = read("components/contact/ContactBuilder.tsx");
  assert.match(builder, /agency-form-progress/);
  assert.match(builder, /aria-pressed/);
  assert.match(builder, /mailto:admin@pincodeit\.com/);
  assert.match(builder, /Start again/);
});

test("domain search is reachable from public navigation", () => {
  assert.ok(read("components/home/LegacyHomepage.tsx").includes("/domains"));
  assert.ok(read("components/layout/SiteShell.tsx").includes("<LegacyNavigation"));
  assert.ok(read("components/layout/LegacyNavigation.tsx").includes('label: "Domain Search"'));
  assert.ok(read("app/domains/page.tsx").includes("<DomainSearch"));
  assert.ok(read("app/domains/page.tsx").includes("<SiteHeader"));
});

test("domain lookup uses validated RDAP and cautious availability wording", () => {
  const api = read("app/api/domains/check/route.ts");
  const ui = read("components/domains/DomainSearch.tsx");
  for (const phrase of ["rdap.verisign.com", "rdap.publicinterestregistry.org", "pubapi.registry.google", "rateLimited", "possibly-available"]) {
    assert.ok(api.includes(phrase), "Missing domain lookup feature: " + phrase);
  }
  assert.ok(ui.includes("Confirm final availability and pricing"));
  assert.ok(ui.includes('aria-live="polite"'));
});

test("provider comparisons show source, renewal and external provider checkout", () => {
  const market=read("components/marketplace/ProviderMarketplace.tsx");
  const domainPage=read("app/domains/page.tsx");
  const hosting=read("app/hosting/page.tsx");
  const shell=read("components/layout/SiteShell.tsx");
  const catalog=read("lib/provider-marketplace.ts");
  assert.match(domainPage, /kind="domain"/);
  assert.match(hosting, /kind="hosting"/);
  assert.ok(shell.includes("<LegacyNavigation"));
  assert.ok(read("components/layout/LegacyNavigation.tsx").includes('label: "Hosting Deals"'));
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
  assert.ok(read("components/home/LegacyHomepage.tsx").includes("/hosting"));
  assert.ok(read("app/domains/marketplace.css").includes("@media(max-width:760px)"));
});

test("refined PINCODE IT logo is consistent across header, footer, legacy homepage and metadata", () => {
  const symbol = read("public/brand/pincode-mark.svg");
  assert.match(symbol, /pincode-v2-grad/);
  assert.match(symbol, /fill-rule="evenodd"/);
  const header = read("components/layout/SiteShell.tsx");
  assert.match(header, /img src="\/brand\/pincode-mark\.svg"/);
  assert.doesNotMatch(header, /<svg viewBox="0 0 48 48"/);
  const legacy = read("components/home/LegacyHomepage.tsx");
  assert.ok(legacy.includes("/brand/pincode-mark.svg"));
  assert.doesNotMatch(legacy, /M24 3 42 13.5/);
  const layout = read("app/layout.tsx");
  assert.ok(layout.includes("/opengraph-image"));
  assert.ok(layout.includes("/favicon.svg"));
  assert.match(read("public/favicon.svg"), /pincode-v2-grad/);
  assert.match(read("app/icon.svg"), /pincode-v2-grad/);
});


test("all Next.js pages use the original navigation design through native React and Next Link", () => {
  const home = read("components/home/LegacyHomepage.tsx");
  const shell = read("components/layout/SiteShell.tsx");
  const nav = read("components/layout/LegacyNavigation.tsx");
  const css = read("app/globals.css");
  assert.ok(home.includes('import { LegacyNavigation } from "../layout/LegacyNavigation"'));
  assert.ok(home.includes("<LegacyNavigation />"));
  assert.ok(shell.includes("<LegacyNavigation />"));
  assert.ok(shell.includes("/legacy-home.css"));
  assert.ok(shell.includes("/legacy-glass.css"));
  assert.ok(nav.includes('from "next/link"'));
  assert.ok(nav.includes("usePathname"));
  assert.ok(nav.includes("aria-current"));
  assert.ok(nav.includes("setOpen"));
  assert.ok(nav.includes("mega-menu"));
  assert.ok(css.includes("pincode-legacy-home.pincode-shared-nav"));
  for (const file of ["components/marketing/MarketingPage.tsx", "app/contact/page.tsx", "app/domains/page.tsx", "app/hosting/page.tsx"]) {
    assert.ok(read(file).includes("<SiteHeader"), file + " should use the shared header");
  }
});

test("all subpages share the Insights hero and Home opening reveal", () => {
  const hero = read("components/marketing/AgencyPageHero.tsx");
  const pages = ["app/domains/page.tsx", "app/hosting/page.tsx"];
  const original = read("components/marketing/MarketingPage.tsx");
  const contact = read("app/contact/page.tsx");
  const home = read("components/home/LegacyHomepage.tsx");
  const style = read("app/globals.css");
  for (const path of pages) {
    const page = read(path);
    assert.match(page, /<AgencyPageHero/);
    assert.doesNotMatch(page, /domain-page-hero/);
  }
  for (const selector of ["agency-page-hero", "agency-hero-panel", "agency-hero-content", 'data-site-motion="hero"']) {
    assert.ok(hero.includes(selector), "Missing shared hero selector: " + selector);
  }
  assert.match(original, /<AgencyPageHero/);
  assert.match(contact, /<AgencyPageHero/);
  assert.match(original, /<MarketingTopicCard/);
  assert.match(contact, /<ContactOptionCard/);
  assert.match(read("app/domains/page.tsx"), /#domain-search-title/);
  assert.match(read("app/hosting/page.tsx"), /#hosting-provider-comparison/);
  assert.match(style, /pincode-home-reveal 700ms ease both/);
  assert.match(style, /translate3d\(0, 28px, 0\)/);
  assert.match(style, /\.agency-page-hero :is\(\.agency-hero-topline, \.agency-hero-content, \.agency-hero-bottomline\)/);
  assert.match(home, /hero-copy reveal/);
  assert.match(read("components/layout/SiteMotion.tsx"), /\[pathname\]/);
});

test("hero entrance starts with CSS and never restarts after hydration", () => {
  const style = read("app/globals.css");
  const motion = read("components/layout/SiteMotion.tsx");
  const home = read("components/home/LegacyHomepage.tsx");
  assert.match(style, /\.agency-page-hero :is\(/);
  assert.match(style, /pincode-home-reveal 700ms ease both/);
  assert.doesNotMatch(style, /\[data-site-motion="hero"\]\.site-motion-enter/);
  assert.doesNotMatch(motion, /classList\.add\("site-motion-enter"\)/);
  assert.match(motion, /\[data-site-motion="section"\], \[data-site-motion="card"\]/);
  assert.match(motion, /prefers-reduced-motion: reduce/);
  assert.match(style, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(home, /hero-copy reveal/);
});

test("shared design is server-rendered and homepage-only JS stays on Home", () => {
  const files = [
    "components/marketing/AgencyPageHero.tsx",
    "components/marketing/AgencyActionLink.tsx",
    "components/marketing/AgencySectionIntro.tsx",
    "components/marketing/MarketingTopic.tsx",
    "components/marketing/MarketingCallToAction.tsx",
    "components/contact/ContactOptionCard.tsx",
    "components/layout/FooterLinkGroup.tsx",
    "components/marketing/MarketingPage.tsx",
    "components/layout/SiteShell.tsx",
  ];
  for (const file of files) {
    assert.doesNotMatch(read(file), /^["']use client["'];/m, "Unexpected client bundle: " + file);
  }
  const home = read("app/page.tsx");
  const layout = read("app/layout.tsx");
  assert.match(home, /<LegacyLinkBridge \/>/);
  assert.doesNotMatch(layout, /LegacyLinkBridge/);
  const shell = read("components/layout/SiteShell.tsx");
  assert.match(shell, /<FooterLinkGroup/);
  assert.match(shell, /<LegacyNavigation \/>/);
  const marketing = read("components/marketing/MarketingPage.tsx");
  assert.match(marketing, /<AgencySectionIntro/);
  assert.match(marketing, /<MarketingCallToAction/);
  assert.match(marketing, /<MarketingTopicLink/);
  assert.match(marketing, /<MarketingTopicCard/);
  const contact = read("app/contact/page.tsx");
  assert.match(contact, /<AgencySectionIntro/);
  assert.match(contact, /<ContactOptionCard/);
  assert.match(read("components/marketing/AgencyActionLink.tsx"), /href\.startsWith\("mailto:"\)/);
  assert.match(read("components/marketing/AgencyPageHero.tsx"), /<AgencyActionLink/);
});

test("speed and motion features do not hide server content or delay provider comparison", () => {
  const home = read("components/home/LegacyHomepage.tsx");
  const motion = read("components/layout/SiteMotion.tsx");
  const shell = read("components/layout/SiteShell.tsx");
  const style = read("app/globals.css");
  const layout = read("app/layout.tsx");
  const homepage = read("components/home/LegacyHomepage.tsx");
  const nav = read("components/layout/LegacyNavigation.tsx");
  assert.ok(motion.includes("IntersectionObserver"));
  assert.ok(motion.includes("prefers-reduced-motion"));
  assert.ok(motion.includes("site-motion-pending"));
  assert.ok(shell.includes("<SiteMotion"));
  assert.ok(read("components/marketing/MarketingTopic.tsx").includes('data-site-motion="card"'));
  assert.ok(read("app/contact/page.tsx").includes('data-site-motion="section"'));
  assert.ok(read("components/marketing/AgencyPageHero.tsx").includes('data-site-motion="hero"'));
  assert.ok(read("app/domains/page.tsx").includes("<AgencyPageHero"));
  assert.ok(read("app/hosting/page.tsx").includes("<AgencyPageHero"));
  assert.ok(!style.includes("@import url("));
  assert.ok(layout.includes('from "next/font/google"'));
  assert.ok(home.includes('from "../layout/LegacyNavigation"'));
  assert.ok(!shell.includes('from "./LegacyHomepage"'));
  assert.ok(nav.length < homepage.length);
  const market = read("components/marketplace/ProviderMarketplace.tsx");
  assert.ok(market.includes("initialFeed"));
  assert.ok(read("app/domains/page.tsx").includes('getReferenceMarketplace("domain")'));
  assert.ok(read("app/hosting/page.tsx").includes('getReferenceMarketplace("hosting")'));
  assert.ok(read("app/api/marketplace/offers/route.ts").includes("unstable_cache"));
});

test("professional site essentials: canonical SEO, policies, errors and domain email", () => {
  const sitemap = read("app/sitemap.ts");
  const robots = read("app/robots.ts");
  const layout = read("app/layout.tsx");
  const footer = read("components/layout/SiteShell.tsx");
  const contact = read("app/contact/page.tsx");
  const domainEmail = "admin@pincodeit.com";
  assert.match(sitemap, /"domains", "hosting", "privacy", "terms"/);
  assert.match(sitemap, /site.url/);
  assert.match(sitemap, /insightArticles/);
  assert.match(sitemap, /article.slug/);
  assert.match(robots, /site.url/);
  assert.match(robots, /"\/api\/"/);
  assert.match(layout, /opengraph-image/);
  assert.match(layout, /summary_large_image/);
  assert.match(read("app/opengraph-image.tsx"), /ImageResponse/);
  assert.ok(read("app/opengraph-image.tsx").includes("public/brand/pincode-email.png"));
  assert.ok(read("app/page.tsx").includes('title: { absolute:'));
  assert.match(footer, /Privacy Policy/);
  assert.match(footer, /Terms of Use/);
  assert.match(footer, /site.email/);
  assert.match(read("lib/site-config.ts"), /admin@pincodeit.com/);
  assert.match(contact, /admin@pincodeit.com/);
  assert.match(read("app/privacy/page.tsx"), /<LegalPage/);
  assert.match(read("app/terms/page.tsx"), /<LegalPage/);
  assert.match(read("app/not-found.tsx"), /404/);
  assert.match(read("app/error.tsx"), /reset/);
  assert.match(read("components/contact/ContactBuilder.tsx"), /mailto:admin@pincodeit.com/);
  assert.equal(domainEmail, "admin@pincodeit.com");
});

test("work page uses honest editorial photography, and insight routes remain intact", () => {
  const work = read("app/work/page.tsx");
  const insights = read("app/insights/page.tsx");
  const articles = read("lib/insight-articles.ts");
  const articlePage = read("app/insights/[slug]/page.tsx");
  assert.match(work, /<WorkPhotoEditorial/);
  assert.match(work, /Illustrative editorial images/i);
  assert.doesNotMatch(work, /PinCMS|PinAI|public project|github.com\/omarreact/i);
  assert.match(insights, /\/insights\/life-after-launch/);
  assert.match(articlePage, /generateStaticParams/);
  assert.match(articlePage, /generateMetadata/);
  assert.match(articlePage, /PhotoMosaic page="insights"/);
  assert.match(articles, /performance-is-part-of-design/);
  assert.match(read("components/domains/DomainSearch.tsx"), /www.namecheap.com\/domains\/domain-name-search/);
});

test("marketing pages include distinctive lightweight visual storytelling", () => {
  const marketing = read("components/marketing/MarketingPage.tsx");
  const visual = read("components/marketing/MarketingVisualStage.tsx");
  const style = read("components/marketing/marketing-visual-stage.css");
  assert.match(marketing, /<MarketingVisualStage/);
  assert.match(visual, /type MarketingStory/);
  assert.match(visual, /noopener noreferrer/);
  assert.match(style, /prefers-reduced-motion:reduce/);
  assert.doesNotMatch(visual, /"use client"/);
  assert.doesNotMatch(visual, /fetch\(/);
  const expected = [
    ["services", "services"], ["solutions", "solutions"],
    ["work", "work"], ["about", "about"], ["insights", "insights"],
  ];
  for (const [route, kind] of expected) {
    const page = read("app/" + route + "/page.tsx");
    assert.ok(page.includes('story: "' + kind + '"'), "Missing visual story on " + route);
  }
  assert.match(read("components/marketing/MarketingTopic.tsx"), /index % 6/);
});

test("professional stock photography is shared, responsive and not a fake portfolio", () => {
  const home = read("components/home/LegacyHomepage.tsx");
  const stock = read("lib/stock-photos.ts");
  const marketing = read("components/marketing/MarketingPage.tsx");
  const mosaic = read("components/marketing/PhotoMosaic.tsx");
  const stage = read("components/marketing/MarketingVisualStage.tsx");
  const portfolio = read("components/marketing/WorkPhotoEditorial.tsx");
  const doc = read("docs/IMAGE-SOURCES.md");
  const publicFolders = readdirSync(new URL("../public", import.meta.url));
  assert.ok(!publicFolders.includes("images"), "Old repository screenshots must not ship");
  assert.doesNotMatch(home, /PinCMS|PinAI|images\/projects/i);
  assert.doesNotMatch(read("app/work/page.tsx"), /PinCMS|PinAI|images\/projects/i);
  assert.ok(home.includes("pincode-visual-proof"));
  assert.ok(home.includes("pincode-service-photo"));
  assert.ok(home.includes("images.unsplash.com"));
  assert.ok(home.includes('loading=\\\"lazy\\\"'));
  assert.match(marketing, /<PhotoMosaic page=\{data.story\}/);
  assert.match(marketing, /editorialImages/);
  assert.match(stage, /heroPhoto.src/);
  assert.match(mosaic, /pagePhotography\[page\]/);
  assert.match(mosaic, /sizes=/);
  assert.match(mosaic, /loading="lazy"/);
  assert.match(portfolio, /next\/image/);
  assert.match(portfolio, /illustrative editorial photographs/);
  assert.match(stock, /Unsplash/);
  for (const page of ["services","solutions","work","about","insights","contact","domains","hosting"]) {
    assert.ok(stock.includes(page + ": {"), "Missing photo collection: " + page);
  }
  for (const path of ["app/contact/page.tsx","app/domains/page.tsx","app/hosting/page.tsx"]) {
    assert.match(read(path), /<PhotoMosaic/);
  }
  assert.match(read("app/insights/[slug]/page.tsx"), /agency-article-image/);
  assert.ok(!read("components/marketing/MarketingPage.tsx").includes("ProjectShowcase"));
  assert.match(read("next.config.ts"), /minimumCacheTTL: 604800/);
  assert.match(doc, /unsplash.com\/license/);
});

test("SPA navigation, clean Next.js routes and historical HTML cleanup", () => {
  const bridge = read("components/home/LegacyLinkBridge.tsx");
  const nav = read("components/layout/LegacyNavigation.tsx");
  const layout = read("app/layout.tsx");
  const home = read("components/home/LegacyHomepage.tsx");
  const homePage = read("app/page.tsx");
  const root = readdirSync(new URL("..", import.meta.url));
  assert.ok(homePage.includes("<LegacyLinkBridge />"));
  assert.ok(!layout.includes("LegacyLinkBridge"));
  assert.ok(bridge.includes("router.push(route)"));
  assert.ok(bridge.includes("event.defaultPrevented"));
  assert.ok(bridge.includes("event.metaKey"));
  assert.ok(bridge.includes("router.prefetch"));
  assert.ok(nav.includes('from "next/link"'));
  assert.ok(nav.includes("href={item.href}"));
  assert.ok(home.includes("<LegacyNavigation />"));
  for (const file of ["index.html","about.html","contact.html","insights.html","services.html","solutions.html","work.html","script.js","styles.css"]) {
    assert.ok(!root.includes(file), "Obsolete static website file remains: " + file);
  }
  assert.ok(read("next.config.ts").includes("/index.html"));
  assert.ok(read("nid_dob/index.html").includes("<html"));
  assert.ok(read("public/email/pincode-business-template.html").includes("<html"));
});
