import Image from "next/image";
import { pagePhotography, photo, type GalleryName } from "@/lib/stock-photos";
import "./photo-mosaic.css";

/** Fully server-rendered, editorial photo mosaic with explicit alt and size hints. */
export function PhotoMosaic({ page, compact = false }: { page: GalleryName; compact?: boolean }) {
  const gallery = pagePhotography[page];
  return (
    <section className={`agency-photo-mosaic${compact ? " agency-photo-mosaic-compact" : ""}`} aria-label={gallery.caption}>
      <div className="agency-photo-mosaic-heading">
        <span className="agency-eyebrow">PERSPECTIVES / PINCODE IT</span>
        <p>{gallery.caption}</p>
      </div>
      <div className="agency-photo-mosaic-grid">
        {gallery.mosaic.map((key, i) => {
          const image = photo(key);
          return (
            <figure className={`agency-photo-mosaic-tile agency-photo-mosaic-tile-${i+1}`} key={`${key}-${i}`}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={i === 0 ? "(max-width: 760px) 92vw, 49vw" : "(max-width: 760px) 46vw, 24vw"}
                quality={65}
                loading="lazy"
              />
              <figcaption>{["THE BIG PICTURE","THE DETAILS","THE PEOPLE"][i]}</figcaption>
            </figure>
          );
        })}
      </div>
      <p className="agency-photo-mosaic-credit">Illustrative stock photography · Unsplash · Not PINCODE IT staff or client imagery</p>
    </section>
  );
}
