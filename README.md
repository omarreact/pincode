# PINCODE IT — Public Agency Website

Official Next.js website for **PINCODE IT**, a Dhaka-based technology partner.

- Production: https://www.pincodeit.com
- Source: https://github.com/omarreact/pincode (main)
- Vercel: https://vercel.com/omarreacts-projects/pincode
- Design: MagicPath public website (component noble-rain-9944)
- Architecture & branding: [Public Website Blueprint](docs/PUBLIC_WEBSITE_BLUEPRINT.md)

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
`/`, `/services`, `/solutions`, `/work`, `/about`, `/insights`, `/contact`.
Legacy URLs like `/services.html` redirect to clean App Router routes.

Contact uses a browser-only project brief that prepares a email message; **it does not send or persist records to the administration system**. Only publish genuine testimonials, client references and portfolio metrics.

## Deployment
The Vercel project uses the **Next.js framework preset** and automatic output detection, not the old static `public` output override. GitHub pushes to `main` trigger builds. Review deployment status before claiming a production release.

### Next.js-only marketing website
The public marketing website is implemented in Next.js App Router. The obsolete root-level
static HTML website, its `styles.css` / `script.js`, and duplicate static metadata assets
have been removed; the original designs remain implemented in the React components and
their scoped stylesheets under `public/`. Existing `/*.html` marketing-page bookmarks
redirect to their Next.js routes.

The independent `/nid_dob` utility and its API are not part of the marketing website;
preserve and separately audit their hosting behavior before migrating or removing them.

Administration remains a separate secured application in [Admin_Pincode_Projects](https://github.com/omarreact/Admin_Pincode_Projects). Do not move admin code or credentials into this public repository.
