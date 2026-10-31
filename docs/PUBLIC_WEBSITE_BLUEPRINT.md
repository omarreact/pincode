# PINCODE IT — Public Website Blueprint

**Source of truth:** `omarreact/pincode` on `main`
**Live canonical domain:** https://www.pincodeit.com
**Agency administration:** Separate Next.js app in `omarreact/Admin_Pincode_Projects` at https://admin.pincodeit.com
**Design:** MagicPath project `460995059706400768`, component `460995155655299072` (interactive React preview).

## Objective
A credible, fast, accessible, search-friendly public home for PINCODE IT: a technology partner that designs, builds, improves and supports useful digital systems. The website is a marketing and intake channel, **not an admin dashboard**.

## Original homepage identity and updated glass surfaces
- Restored homepage ink: `#111312` and deep charcoal: `#0D1110`.
- Restored original greens: `#008F64` and `#00B980`; soft mint: `#DFF8EF`.
- Original paper: `#F5F5F7`. Do not silently swap the homepage font, palette, orbit or reveal animations.
- Glass components use semi-transparent tinted backgrounds, backdrop blur, rim highlights and soft shadows. Text remains sharp and legible.
- The original CSS is scoped to `#pincode-legacy-home` so it cannot accidentally restyle the other Next.js routes.
- Typography: Inter with Arial fallback; bold headlines, clean type scale, generous whitespace.
- Brand voice: outcome-led, practical, concise, transparent. Do not invent client logos, case studies, statistics or testimonials.
- Brand assets should be approved by the business owner before being called final or official.

## Information architecture
| Route | Purpose | Status |
|---|---|---|
| `/` | Branded home, capabilities, value, process, CTA | Implemented in Next.js |
| `/services` | Web, commerce, performance, security, support | Implemented |
| `/solutions` | Solutions by business need | Implemented |
| `/work` | Portfolio approach, transparently no invented case studies | Implemented |
| `/about` | Company positioning, principles | Implemented |
| `/insights` | Editorial topics; real CMS articles follow | Implemented as topical index |
| `/contact` | Guided project builder and email handoff | Implemented; no server-side lead storage |
| `/*.html` legacy marketing URLs | Redirect to Next.js routes | Configured |

## Architecture
- Next.js 16 App Router + React 19 + TypeScript.
- Static/pre-rendered marketing routes for speed; scoped client JS only where needed.
- Shared site shell and reusable marketing page template.
- CSS token system with responsive grid layouts, semantic navigation and visible keyboard focus.
- `app/sitemap.ts`, `app/robots.ts`, per-page metadata and canonical URLs.
- Vercel Git-connected project `pincode`; framework preset must be Next.js, output directory auto-detected.
- All credentials must stay server side. Production content updates should be reviewed in pull requests and tested before release.

## Historical site preservation and migration
The seven old root-level marketing `.html` pages have been removed in favor of their existing Next.js App Router routes. Git history preserves the old snapshots, and `next.config.ts` continues to redirect the old `.html` URLs. Standalone root `styles.css` and `script.js` are left untouched by this HTML-only cleanup and are not loaded by the Next.js marketing pages. Preserve the separate `nid_dob/index.html` utility and `public/email/pincode-business-template.html` (the latter is an email asset, not a website page). **Audit `/nid_dob` and any non-marketing tool before switching traffic**; the existing privacy headers in `vercel.json` alone do not guarantee its functionality.

## Visitor journey
1. Visitor arrives on mobile or desktop and understands the agency's value proposition.
2. Visitor explores relevant service/solution pages.
3. Visitor reviews honest process and work criteria.
4. Visitor reaches Contact / project builder.
5. Browser prepares an email message using selected project priorities, without claiming to submit data to a CRM.
6. After consent, the agency can create a lead in a separately authorized admin system.

## Security, legal, accessibility, SEO
- WCAG AA target, keyboard focus, reduced-motion support, responsive mobile nav.
- Clear privacy/contact disclosures; no background data collection claimed.
- Verified business email from existing source; owner should confirm prior to final publication.
- No client secrets or administrative operations on public routes.
- Verify HTTPS, canonical domain, 301s, sitemap and robots on production.
- Add real Terms/Privacy before embedding tracking or capturing server-side inquiries.
- Protect /nid_dob separately and respect existing security policy.

## Release checklist
- [x] Create Next.js App Router foundation and brand tokens.
- [x] Implement home, services, solutions, work, about, insights, contact.
- [x] Build MagicPath design prototype with interactive components.
- [x] Add Next.js robots/sitemap/metadata.
- [x] Configure legacy marketing .html redirects.
- [x] Set Vercel framework to Next.js and output directory auto-detect.
- [ ] Production Next.js deployment READY; verify actual custom-domain HTTP response.
- [ ] Regression-test old non-marketing tools, especially `/nid_dob`.
- [ ] Check contact email behaviour on mobile and desktop.
- [ ] Audit screenshots at 375/768/1440 px; keyboard/accessibility review.
- [ ] Add approved OG image, final logo, verified portfolio content and real articles.
- [ ] Add automated CI tests and preview release gate.

## Glass restoration and privacy regression coverage
- `public/legacy-home.css`: original font sizes, palette, orbit and reveal animations, scoped to the homepage.
- `public/legacy-glass.css`: frosted navbar, buttons, cards, process/navigation items, modal and footer.
- `app/glass.css`: glass surfaces on native Next.js routes.
- `components/LegacyHomepage.tsx`: Next.js-managed observers and event listeners with unmount cleanup.
- `tests/public-site.test.mjs`: asserts styles, animations, and absence of published phone links or numbers in tracked public source.
- All business enquiries are handled through the displayed email address; no business telephone number is advertised in source files.
