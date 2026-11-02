# Image provenance and usage

## Actual project previews (self-hosted)

All five source screenshots were copied, unchanged, from public repositories owned by the developer. These files are UI previews from the codebases, **not** evidence of a commissioned client project, current production release or measurable customer outcomes.

| PINCODE IT asset | Source |
|---|---|
| `/images/projects/pincms-dashboard.webp` | https://github.com/omarreact/PinCMS/blob/main/public/assets/dashboard-preview.webp |
| `/images/projects/pincms-editor.webp` | https://github.com/omarreact/PinCMS/blob/main/public/assets/editor-preview.webp |
| `/images/projects/pincms-themes.webp` | https://github.com/omarreact/PinCMS/blob/main/public/assets/themes-preview.webp |
| `/images/projects/pinai-builder.png` | https://github.com/omarreact/PinAI/blob/main/screenshots/app-builder-preview.png |
| `/images/projects/pinai-scan.png` | https://github.com/omarreact/PinAI/blob/main/screenshots/scan-card.png |

## Illustrative stock photography

Remote images are served from Unsplash using `next/image` on responsive marketing sections. Unsplash is a third-party provider; review its license before redistribution. These do **not** depict PINCODE IT staff or offices.

- Software-development workspace: https://images.unsplash.com/photo-1498050108023-c5249f4df085
- Technology collaboration: https://images.unsplash.com/photo-1519389950473-47ba0277781c
- Contemporary office architecture: https://images.unsplash.com/photo-1497366754035-f200968a6e72
- Editorial team/devices: https://images.unsplash.com/photo-1516321318423-f06f85e504b3
- Data center infrastructure: https://images.unsplash.com/photo-1558494949-ef010cbdcc31
- Team collaboration: https://images.unsplash.com/photo-1521737711867-e3b97375f902
- Earth as metaphor for connected domains: https://images.unsplash.com/photo-1451187580459-43490279c0fa

## Performance and content rules

- Self-hosted project previews get intrinsic or reserved aspect ratio and lazy-loading when below the fold.
- Editorial photographs use Next.js image optimization, responsive `sizes`, quality 72–75, and lazy loading; there is no hero-photo preload because the large textual H1 must render immediately.
- A source image can be temporarily unavailable; CSS gradients remain as layout fallbacks.
- Do not use these images as claimed customer screenshots, employee portraits or customer-testimonial evidence.
- If a photo cannot be reliably licensed, replace its source rather than inventing authorship.
