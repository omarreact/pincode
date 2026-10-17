# PINCODE IT — Cloudflare Pages Preview Migration

**Current production remains on Vercel:** https://www.pincodeit.com
**GitHub source remains authoritative:** https://github.com/omarreact/pincode
**Target staging host (not provisioned):** a distinct Cloudflare Pages `*.pages.dev` preview.
**No DNS, custom-domain, SSL, billing, or production hosting changes are performed by this branch.**

## Architecture decision

PINCODE IT's current public website uses Next.js 16 App Router and React 19, but the audited public marketing pages can be rendered as static assets. A static Cloudflare Pages build is safer and cheaper to test than replacing the Vercel runtime with a Workers adapter.

Set `PINCODE_CF_STATIC_EXPORT=1` **only** for Cloudflare preview builds. It enables `output: "export"`, `trailingSlash` and unoptimized images, and excludes the Vercel-only `redirects()` config. The default `next build` remains unchanged.

`public/_redirects` mirrors the six legacy `/*.html` marketing redirects on Cloudflare Pages. Do not configure a domain redirect or proxy until the preview passes functional tests.

### Preview build & checks (Android GitHub Actions or terminal)

```bash
npm install --no-audit --no-fund
npm run typecheck
npm run test:site
PINCODE_CF_STATIC_EXPORT=1 npm run build:cloudflare-preview
npm run test:cloudflare-preview
```

CI workflow: `.github/workflows/cloudflare-static-preview.yml`. It runs on pull requests and builds the preview without Cloudflare credentials. Its downloadable `pincode-cloudflare-preview-static` artifact has a temporary `X-Robots-Tag: noindex, nofollow` header so the nonproduction preview should not be indexed.

**Never reuse the staging artifact for final production**, because the staging-only `out/_headers` file intentionally disables indexing. For production, rebuild the static export with a reviewed canonical/robots policy.

## Cloudflare Pages setup after the preview build passes

1. On Android open https://dash.cloudflare.com and use the connected PINCODE IT Cloudflare account. Locate the existing `pincode` Worker and `pinflix` Pages project. **Do not overwrite either.**
2. Create a *new* Pages project with an unmistakable staging name, e.g. `pincode-website-preview`. This project must not attach `www.pincodeit.com` or any other production hostname.
3. Download the GitHub Actions artifact, or configure an authorized CI deployment. Upload **contents of** `out/` as the Pages site. Keep staging-only `X-Robots-Tag: noindex, nofollow` and verify no public indexing occurs.
4. Test `/`, `/services/`, `/solutions/`, `/work/`, `/about/`, `/insights/`, and `/contact/`. Check `*.html` redirects, SVG logo, CSS animations, touch navigation, contact mailto flow, JS hydration, dark/light device settings, mobile layout and keyboard accessibility.
5. Review links under `/nid_dob` and other non-marketing paths, if any. The repository's README explicitly notes that old/root-level HTML snapshots may be separate from Next.js pages. Do not claim non-marketing paths are migrated if absent.
6. Confirm page metadata, canonical links, `sitemap.xml`, `robots.txt`, HTTP headers, cache behavior, regional loading, and Cloudflare deployment logs.
7. Compare the preview side-by-side with the Vercel production website. If features differ, fix the preview branch and retest.
8. Obtain explicit approval before **any** DNS or custom-domain cutover. Leave all Vercel deployments running as rollback until final verification.

## Safe final cutover prerequisites

- Cloudflare Pages staging build and functional QA passes across desktop and Android.
- Business routes and contact behavior match the Vercel source of truth.
- Canonical URLs and Google search indexing settings are reviewed for the final custom-domain build.
- No forgotten APIs, hidden routes, HTML exports, asset paths, or server-side authentication are lost.
- The domain's actual DNS/zone ownership and nameservers are verified. A Cloudflare Pages `*.pages.dev` test requires no production DNS migration.
- Backups/rollback plan and a documented release owner are approved.
- A production static build excludes the staging-only noindex header.
- After the domain is switched, monitor traffic, SSL, 404/500 errors, and any contact conversions for at least one normal business cycle before retiring Vercel.

## Current known constraints

- This pilot applies **only** to the public marketing site. LandBD and Admin OS still need separate Firebase App Hosting and runtime compatibility tests.
- Firebase Authentication, Firestore and Cloudinary data should remain where they are; this preview does not access or migrate them.
- Static hosting cannot replace dynamic Next.js APIs or server-only functionality. Any such route added later must fail the preview preflight until reviewed.
- Existing Vercel DNS is not transferred here.
- Cloudflare Pages offers a free plan but free usage/build quotas and commercial terms should be checked in the owning account before long-term commitments.
- This readiness branch does not generate a Cloudflare API token, write Cloudflare resources, change GitHub secrets, or create production deployments.
