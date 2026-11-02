import { test, expect } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const routes = [
  "/", "/services", "/solutions", "/work", "/about", "/insights",
  "/domains", "/hosting", "/contact", "/privacy", "/terms",
];
const viewports = [
  { name: "phone-375", width: 375, height: 812 },
  { name: "phone-390", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  // 1920x1080 screen at 150% Windows scaling is about 1280 CSS pixels wide.
  { name: "windows-150pct", width: 1280, height: 620 },
  { name: "desktop-1440", width: 1440, height: 900 },
];

async function open(page, path = "/") {
  const response = await page.goto(path, { waitUntil: "domcontentloaded" });
  expect(response?.status(), `HTTP response for ${path}`).toBeLessThan(400);
  await expect(page.locator("main").first()).toBeVisible();
}

async function assertNoOverflow(page, name) {
  const dimensions = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
  }));
  expect(dimensions.scroll, `Horizontal overflow on ${name}: ${JSON.stringify(dimensions)}`)
    .toBeLessThanOrEqual(dimensions.viewport + 5);
}

async function capture(page, info, name, fullPage = false) {
  // Clicking a slide indicator scrolls the browser to the controls. Reset to
  // the top before capturing, or later slides misleadingly look blank.
  await page.evaluate(() => window.scrollTo(0, 0));
  if (fullPage) {
    // Full-page screenshots do not automatically trigger native lazy loading
    // of images far below the fold; make QA captures representative.
    await page.evaluate(() => {
      document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        img.loading = "eager";
      });
    });
    await page.waitForTimeout(450);
  }
  const safeName = name.replace(/[^a-z0-9-]/gi, "_");
  const path = info.outputPath(`${safeName}.png`);
  await page.screenshot({ path, fullPage, animations: "disabled", timeout: 30_000 });
  await info.attach(safeName, { path, contentType: "image/png" });
}

test("hero actually renders all three slides and user controls work", async ({ page }, info) => {
  await page.setViewportSize({ width: 1280, height: 620 });
  await open(page);
  const hero = page.locator(".premium-hero");
  await expect(hero).toBeVisible();
  const active = hero.locator(".premium-hero-slide.is-active");
  await expect(active).toHaveCount(1);

  const expectedTitles = ["Technology that moves", "Every great idea needs", "Designed for people."];
  for (let index = 0; index < 3; index++) {
    if (index) await hero.getByRole("button", { name: new RegExp(`Go to slide ${index + 1}:`) }).click();
    await expect(active).toHaveCount(1);
    await expect(active.locator("h1")).toContainText(expectedTitles[index]);
    await expect(active.getByRole("link").first()).toBeVisible();
    await expect.poll(async () => {
      return active.evaluate(element => Number(window.getComputedStyle(element).opacity));
    }).toBeGreaterThan(0.90);
    const rect = await active.boundingBox();
    expect(rect?.width ?? 0).toBeGreaterThan(600);
    expect(rect?.height ?? 0).toBeGreaterThan(350);
    await capture(page, info, `hero-slide-${index + 1}`);
  }

  await hero.getByRole("button", { name: "Previous slide" }).click();
  await expect(active.locator("h1")).toContainText(expectedTitles[1]);

  const pause = hero.getByRole("button", { name: "Pause automatic slides" });
  await pause.click();
  await expect(hero.getByRole("button", { name: "Resume automatic slides" })).toHaveAttribute("aria-pressed", "true");
  await hero.getByRole("button", { name: "Next slide" }).click();
  await expect(active.locator("h1")).toContainText(expectedTitles[2]);
  await assertNoOverflow(page, "slider");
});

test("reduced-motion users can change slides without automatic animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await open(page);
  const hero = page.locator(".premium-hero");
  await expect(hero.getByRole("button", { name: "Resume automatic slides" })).toBeDisabled();
  await hero.getByRole("button", { name: "Next slide" }).click();
  await expect(hero.locator(".premium-hero-slide.is-active h1")).toContainText("Every great idea needs");
  const animation = await hero.locator(".premium-hero-slide.is-active").evaluate(
    element => getComputedStyle(element).animationName
  );
  expect(animation).toBe("none");
});

test("homepage retains content, services, Domain & Hosting and one footer", async ({ page }) => {
  await open(page);
  await expect(page.locator(".home-domain-hosting-card")).toHaveCount(2);
  await expect(page.locator(".pincode-visual-proof")).toBeVisible();
  await expect(page.locator(".process-section .process-step")).toHaveCount(4);
  await expect(page.locator(".agency-footer-cta")).toHaveCount(1);
  await expect(page.locator("footer.agency-site-footer")).toHaveCount(1);
  const cards = page.locator(".home-domain-hosting-card");
  await expect(cards.first().getByRole("link", { name: /Search a domain/ })).toHaveAttribute("href", "/domains");
  await expect(cards.nth(1).getByRole("link", { name: /Compare hosting plans/ })).toHaveAttribute("href", "/hosting");
});

for (const viewport of viewports) {
  test(`responsive homepage has no blank hero or overflow: ${viewport.name}`, async ({ page }, info) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await open(page);
    const hero = page.locator(".premium-hero");
    const heading = hero.locator(".premium-hero-slide.is-active h1");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("Technology that moves");
    const rect = await heading.boundingBox();
    expect(rect?.width ?? 0).toBeGreaterThan(150);
    expect(rect?.height ?? 0).toBeGreaterThan(40);
    const links = hero.locator(".premium-hero-slide.is-active .premium-hero-actions a");
    await expect(links).toHaveCount(2);
    if (viewport.name === "windows-150pct") {
      // Static presence tests alone missed the CTA pushed below the screen
      // by old legacy CSS specificity.
      const fontSize = await heading.evaluate(el => parseFloat(getComputedStyle(el).fontSize));
      expect(fontSize, "Hero h1 is too large at 150% display scaling").toBeLessThanOrEqual(65);
      const primaryBox = await links.first().boundingBox();
      expect(primaryBox?.y ?? 9999).toBeGreaterThanOrEqual(0);
      expect((primaryBox?.y ?? 9999) + (primaryBox?.height ?? 0),
        "Hero primary button must fit above the fold at 1280x620").toBeLessThanOrEqual(viewport.height - 7);
    }
    await assertNoOverflow(page, viewport.name);
    await capture(page, info, `homepage-${viewport.name}`, true);
  });
}

for (const viewport of [
  { name: "phone-390", width: 390, height: 844 },
  { name: "windows-150pct", width: 1280, height: 620 },
]) {
  test(`key route screenshots and layout at ${viewport.name}`, async ({ page }, info) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    for (const route of ["/services", "/work", "/hosting", "/contact"]) {
      await open(page, route);
      await expect(page.locator(".agency-footer-cta")).toHaveCount(1);
      await expect(page.locator("footer.agency-site-footer")).toHaveCount(1);
      await assertNoOverflow(page, `${viewport.name} ${route}`);
      await capture(page, info, `${viewport.name}-${route.slice(1)}`);
    }
  });
}

test("all public routes resolve and have a shared CTA/footer", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  for (const route of routes) {
    await open(page, route);
    await expect(page.locator(".agency-footer-cta")).toHaveCount(1);
    await expect(page.locator("footer.agency-site-footer")).toHaveCount(1);
    await assertNoOverflow(page, route);
  }
});

test("mobile menu provides navigation without covering content", async ({ page }, info) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await open(page);
  const menu = page.getByRole("button", { name: "Open menu" });
  await menu.click();
  await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator(".mega-menu.open")).toBeVisible();
  await capture(page, info, "mobile-menu-open");
  await page.getByRole("button", { name: "Close menu" }).click();
  await expect(page.locator(".mega-menu.open")).toHaveCount(0);
  await assertNoOverflow(page, "mobile navigation");
});

test("collect actionable performance signals without assuming a perfect score", async ({ page }, info) => {
  const results = [];
  for (const viewport of [
    { name: "phone-390", width: 390, height: 844 },
    { name: "windows-150pct", width: 1280, height: 620 },
  ]) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.addInitScript(() => {
      window.__visualMetrics = { cls: 0, lcp: 0 };
      try {
        new PerformanceObserver(list => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) window.__visualMetrics.cls += entry.value;
          }
        }).observe({ type: "layout-shift", buffered: true });
        new PerformanceObserver(list => {
          for (const entry of list.getEntries()) window.__visualMetrics.lcp = entry.startTime;
        }).observe({ type: "largest-contentful-paint", buffered: true });
      } catch {}
    });
    await open(page);
    await page.waitForTimeout(1800);
    const metrics = await page.evaluate(() => ({
      ...window.__visualMetrics,
      navigation: Math.round(performance.getEntriesByType("navigation")[0]?.duration || 0),
      resources: performance.getEntriesByType("resource").length,
      images: document.images.length,
      brokenImages: [...document.images].filter(img => img.complete && !img.naturalWidth && img.currentSrc).length,
      domHeight: document.documentElement.scrollHeight,
    }));
    results.push({ viewport: viewport.name, ...metrics });
  }
  mkdirSync("artifacts", { recursive: true });
  const resultPath = join("artifacts", "browser-performance.json");
  writeFileSync(resultPath, JSON.stringify({ collectedAt: new Date().toISOString(), results }, null, 2));
  await info.attach("browser-performance.json", { path: resultPath, contentType: "application/json" });
  expect(results).toHaveLength(2);
});
