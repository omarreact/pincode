# PINCODE IT — Public Website Blueprint

**Source of truth:** `omarreact/pincode` on `main`
**Live canonical domain:** https://www.pincodeit.com
**Agency administration:** Separate Next.js app in `omarreact/Admin_Pincode_Projects` at https://admin.pincodeit.com
**Design:** MagicPath project `460995059706400768`, component `460995155655299072` (interactive React preview).

## Objective
A credible, fast, accessible, search-friendly public home for PINCODE IT: a technology partner that designs, builds, improves and supports useful digital systems. The website is a marketing and intake channel, **not an admin dashboard**.

## Approved website-inspired brand direction
- Primary ink: `#101714`; deep green: `#0D4033`
- CTA / forest green: `#32885D`; bright green accent: `#22B573`
- Mint: `#E6F7EE`; paper: `#F8FAF8`
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
Previous static site files remain in the repository for migration reference. They are not guaranteed to be served under Next.js merely because files sit at repository root. Keep legacy public paths working only by explicitly migrating them to `public/`, implementing an App Router page/route, or configuring verified redirects. **Audit `/nid_dob` and any non-marketing tool before switching traffic**; the existing privacy headers remain in `vercel.json`, but those headers alone do not preserve the old application's assets or functionality.

## Visitor journey
1. Visitor arrives on mobile or desktop and understands the agency's value proposition.
2. Visitor explores relevant service/solution pages.
3. Visitor reviews honest process and work criteria.
4. Visitor reaches Contact / project builder.
5. Browser prepares a email message using selected project priorities, without claiming to submit data to a CRM.
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
