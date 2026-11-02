# PINCODE IT — automated UI quality and performance

The site now has two distinct levels of release validation:

1. **Static source and build checks** — Node regression suite, TypeScript, production Next.js build.
2. **Real Chromium UI checks** — starts the production build locally; cycles the three carousel slides; checks actual computed visibility and dimensions; validates CTA/footer, routes, mobile menu, interactive buttons, horizontal overflow and responsive screenshots. This is a required CI job.

A third, **Lighthouse performance baseline**, gathers desktop/mobile-style lab metrics for Home, Hosting and Contact. It is intentionally **informational initially** because the first measurements have not yet established reliable budgets; every run publishes a GitHub artifact.

## Run locally

```bash
npm install
npx playwright install chromium
npm run build
npm run test:browser
```

Open `playwright-report/index.html` or inspect the `test-results/` directory for screenshots, traces and performance data. Test against the **production build**, not a development server, so behavior and CSS match deployment.

## Tested viewport equivalents

- 375 × 812 (small phone)
- 390 × 844 (phone)
- 768 × 1024 (tablet)
- 1280 × 620 (roughly 1920×1080 at Windows 150% display scaling)
- 1440 × 900 (desktop)

The screenshots are **evidence artifacts, not approved pixel baselines**. A reviewer should inspect them before substantial layout changes are merged. Source-only assertions cannot catch visual regressions.

## Quality targets (not measured results)

- Mobile Lighthouse performance score ideally ≥ 90.
- Largest Contentful Paint ≤ 2.5s.
- Cumulative Layout Shift ≤ 0.1.
- Responsive layouts must have no horizontal overflow.
- The homepage hero must always show active slide text, action links and an image container.
- The service enquiry modal, menu and domain/hosting links must remain usable.

Lighthouse measurements will vary with the CI runner, remote photography, and lab network conditions. Treat single-run results as a baseline, not a production RUM score. Use multiple runs and actual field data before making hard performance claims or blocking releases on score.

## Architecture improvements

The homepage has been split into server-rendered `LegacyHomepage` content and a small `LegacyHomepageInteractions` client island. The reusable Domain & Hosting cards remain server-rendered; only the navigation, premium slider and modal/scroller interactions hydrate. This reduces unnecessary client code compared with making the entire legacy homepage a client component.

Keep the remaining legacy section markup until the new browser screenshots show it can safely be converted to native components without altering established layout.
