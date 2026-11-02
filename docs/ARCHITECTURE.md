# PINCODE IT — Next.js architecture

## Application

- Next.js 16 App Router, React 19 and TypeScript
- GitHub `main` is the source of truth
- Vercel is production; validate preview and CI before merging
- Canonical domain: https://pincodeit.com

## Route structure

- Public pages: `/`, `/services`, `/solutions`, `/work`, `/about`, `/insights`, `/contact`, `/domains`, `/hosting`, `/privacy`, and `/terms`
- Static editorial guides: `/insights/[slug]` from `lib/insight-articles.ts`
- Public APIs: `/api/domains/check` and `/api/marketplace/offers`
- Metadata routes: `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`, and `app/icon.svg`
- Legacy marketing `.html` URLs permanently redirect in `next.config.ts`

## Responsibilities

```text
app/                 Routing, server endpoints, metadata and route CSS
components/home/     Home experience, business details, click routing
components/layout/   Site header/footer, navigation, visual reveal
components/marketing/ Reusable content pages, cards, hero and legal layouts
components/contact/  Project enquiry and contact methods
components/domains/  Public RDAP lookup UI
components/marketplace/ Third-party comparison UI
lib/                 Site settings, pricing and article data
public/              Approved logo, email template and required home CSS
tests/               CI-driven site integrity checks
docs/                Architecture documentation
```

Server components are the default. Only genuinely interactive components (`LegacyHomepage`, `LegacyNavigation`, `LegacyLinkBridge`, `SiteMotion`, `ContactBuilder`, `DomainSearch`, and `ProviderMarketplace`) use client JavaScript.

## Safe cleanup boundaries

`components/PublicWebsite.tsx` was a disconnected alternative homepage, removed after verifying it was not routed. Old root `sitemap.xml`, `robots.txt` and `favicon.svg` were obsolete duplicates; the metadata routes and `public/favicon.svg` remain.

`public/legacy-home.css` and `public/legacy-glass.css` **are in use** and retained to protect the original homepage and navigation. The home view's HTML string is a compatibility implementation within React, not a second deployed root HTML page. A later JSX rewrite requires screenshot and interaction parity checks.

`nid_dob/index.html`, `api/nid-dob-auth.js` and `lib/nid-dob-auth.js` remain isolated sensitive-tool compatibility resources; do not remove or migrate without checking the auth/session behavior and deployment route. `public/email/pincode-business-template.html` remains an intentional hosted email asset.

## Validation

```bash
npm install
npm run test:site
npm run typecheck
npm run build
```

Do not publish secrets or claim functional integrations from test assertions alone. Verify production deployment, desktop/mobile experience, and the external mail-forwarding chain separately.
