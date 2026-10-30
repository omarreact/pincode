# PINCODE IT — isolated Cloudflare Workers migration

The production hostname **pincodeit.com remains on its existing hosting** until a separate release approval. This branch is based on `chore/nextjs-only-remove-legacy-html-topbar`, keeping that proposed visual design intact.

## Build/runtime
- Original Next.js: `npm run build` and `npm run dev` remain available.
- Cloudflare Vinext: `npm run build:vinext`; worker in `cloudflare.config.ts`.
- Staging Worker: `cf-migrate-pincode-preview` (previously served a placeholder).
- Expected isolated address after deployment and activation: `https://cf-migrate-pincode-preview.farukkhanone.workers.dev/`.
- GitHub source: `omarreact/pincode`, branch `chore/cloudflare-vinext-preflight-20261030`.
- Cloudflare Workers Builds is restricted to this branch only; no builds from `main`.

## Tests before promotion
1. Verify `/`, `/domains`, `/hosting`, `/services`, `/contact` return real HTML and required visual assets load.
2. Verify the domain-check API handles invalid inputs with HTTP 400 and a valid second-level domain without errors.
3. Verify marketplace API bad input returns HTTP 400; check live pricing behavior separately.
4. Check console errors, navigation menus, contact links, responsive breakpoints, robots and sitemap, logo and footer.
5. Compare production design screenshots at desktop/tablet/mobile. No design changes are permitted as part of this hosting migration.
6. Confirm original Next.js build and all site tests pass, including the no-public-phone rule.
7. Only then, with a verified rollback target, consider explicitly approved production DNS cutover.

**Never** copy secrets into repo files or public build logs, turn off authentication, or attach `pincodeit.com` just to make a failed staging build appear successful.
