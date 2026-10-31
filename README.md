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

### Migration warning
The seven legacy marketing HTML files have been removed from the repository root; their existing Next.js App Router routes and `.html` redirects are preserved. Their previous versions remain in Git history. Unused root `styles.css` and `script.js` are left unchanged by this HTML-only cleanup; the live homepage uses styles in `public/`. The separate `nid_dob/index.html` utility and `public/email/pincode-business-template.html` are intentionally retained. Non-marketing tools such as `/nid_dob` still need independent regression testing.

Administration remains a separate secured application in [Admin_Pincode_Projects](https://github.com/omarreact/Admin_Pincode_Projects). Do not move admin code or credentials into this public repository.
