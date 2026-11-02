# Photography, licensing and optimization

PINCODE IT uses professional editorial photographs from **Unsplash** for its marketing and informational pages. The central photo registry lives in `lib/stock-photos.ts`; the media are **illustrations of the field** and must not be described as PINCODE IT employees, offices, portfolio screenshots, client work or endorsements.

## License

- Unsplash license: https://unsplash.com/license
- Unsplash permits free commercial and noncommercial use; no credit is required, but attribution is appreciated.
- Do not resell unmodified image files or compile competing stock-image collections. Review the current Unsplash terms before future changes.

## Image URLs

The photos originate at `https://images.unsplash.com/`. The following identifiers are used in the centrally curated registry:

- https://images.unsplash.com/photo-1498050108023-c5249f4df085
- https://images.unsplash.com/photo-1519389950473-47ba0277781c
- https://images.unsplash.com/photo-1497366754035-f200968a6e72
- https://images.unsplash.com/photo-1524758631624-e2822e304c36
- https://images.unsplash.com/photo-1451187580459-43490279c0fa
- https://images.unsplash.com/photo-1516321318423-f06f85e504b3
- https://images.unsplash.com/photo-1531403009284-440f080d1e12
- https://images.unsplash.com/photo-1504384308090-c894fdcc538d
- https://images.unsplash.com/photo-1521737711867-e3b97375f902
- https://images.unsplash.com/photo-1460925895917-afdab827c52f
- https://images.unsplash.com/photo-1499951360447-b19be8fe80f5
- https://images.unsplash.com/photo-1754834760252-3e01df56850c
- https://images.unsplash.com/photo-1518770660439-4636190af475
- https://images.unsplash.com/photo-1486406146926-c627a92ad1ab
- https://images.unsplash.com/photo-1522071820081-009f0129c71c
- https://images.unsplash.com/photo-1497366811353-6870744d04b2
- https://images.unsplash.com/photo-1522202176988-66273c2fd55f

## Performance and UX requirements

- Marketing photos use Next.js `Image` with responsive `sizes`, WebP output and 7-day cached derivatives.
- Source URLs request a bounded 1600px image at quality 76 so the Next.js optimizer does not ingest unnecessarily enormous originals.
- Gallery and card photos use quality approximately 65, `loading="lazy"`, and fixed aspect ratio containers.
- The legacy homepage has no additional React client bundle for photos; it uses responsive stock CDN URLs and native `loading="lazy"`, `decoding="async"`, explicit width/height attributes.
- Desktop-only hero photo is CSS-scoped so mobile devices don't fetch it.
- Real content, typography and buttons are readable without any image. Green/charcoal gradient fallbacks remain.
- Avoid preloading below-the-fold images, auto-playing video, parallax, JavaScript carousels and heavy third-party embeds.
- Preserve reduced-motion support and descriptive `alt` text. Decorative hero backgrounds must not be in the accessibility tree.

Stock photography is used for mood and context, **not as proof of client delivery**. Do not add fake testimonials, invented client logos or project completion claims.
