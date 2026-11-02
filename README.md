# PINCODE IT — Public Agency Website

Official Next.js website for **PINCODE IT**, a Dhaka-based technology partner.

- Production: https://pincodeit.com
- Source: https://github.com/omarreact/pincode (main)
- Vercel: https://vercel.com/omarreacts-projects/pincode
- Design: PINCODE IT branded Next.js components (no external page-builder runtime)
- Architecture & maintenance: [Project Architecture](docs/ARCHITECTURE.md)

## Stack
Next.js 16.3.7 App Router, React 19.2, TypeScript 5, CSS tokens, Vercel.

## Local development

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

## Pages
`/`, `/services`, `/solutions`, `/work`, `/about`, `/insights`, `/contact`, `/domains`, `/hosting`, `/privacy`, `/terms`, and four articles under `/insights/[slug]`.
Legacy URLs like `/services.html` redirect to clean App Router routes.

Contact uses a browser-only project brief that prepares a email message; **it does not send or persist records to the administration system**. Only publish genuine testimonials, client references and portfolio metrics.

## Deployment
The Vercel project uses the **Next.js framework preset** and automatic output detection, not the old static `public` output override. GitHub pushes to `main` trigger builds. Review deployment status before claiming a production release.

### Compatibility notes
All public marketing pages run through Next.js App Router. The old root-level HTML, CSS and JS website was removed; the previous versions remain in Git history. The shared navbar is now native React/Next.js `Link`, while preserved homepage content links use client-side `router.push()` routing. Legacy `.html` URLs redirect to App Router pages. The separate `/nid_dob` tool and HTML email template are outside the public SPA and must be validated independently.

Administration remains a separate secured application in [Admin_Pincode_Projects](https://github.com/omarreact/Admin_Pincode_Projects). Do not move admin code or credentials into this public repository.

## Repository structure

```text
app/                      Next.js routes, metadata, and API handlers
components/
  home/                   Original homepage experience and identity
  layout/                 Shared navigation, footer, and page motion
  marketing/              Hero, cards, visual storytelling, legal layout
  contact/                Enquiry workflow and contact cards
  domains/                Domain search UI
  marketplace/            Hosting and registrar comparison UI
lib/                      Site configuration and business data
public/                   Brand assets, email template, needed home CSS
tests/                    Regression checks
docs/                     Architecture and maintenance notes
```

`app/sitemap.ts` and `app/robots.ts` generate the SEO metadata routes; the obsolete root-level static snapshots have been removed. **Do not delete** the active `public/legacy-*.css` stylesheets because the homepage/shared navigation still use them.

The separate `/nid_dob` identity-verification HTML and authentication files are compatibility resources outside the marketing SPA. They have not been migrated or removed because they require independent security and functional verification. The email HTML template is an externally used asset, not a Next.js page.

No AI-generated folders are required for production.
