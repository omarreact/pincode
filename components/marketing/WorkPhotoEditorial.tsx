import Image from "next/image";
import Link from "next/link";
import { photo } from "@/lib/stock-photos";
import "./work-photo-editorial.css";

/** A visual representation of capabilities, not fictional customer case studies. */
const columns = [
  { key: "userExperience", eyebrow: "01 / DESIGN", title: "Make every interaction feel intentional.", body: "From the first wireframe to the finishing details, clear experiences help people achieve more." },
  { key: "programming", eyebrow: "02 / ENGINEERING", title: "Build reliable systems underneath.", body: "Maintainable architecture, responsible performance decisions and implementation that can evolve." },
  { key: "strategy", eyebrow: "03 / STRATEGY", title: "Connect technology to real needs.", body: "The right solution begins with a shared understanding of the problem and the people involved." },
] as const;

export function WorkPhotoEditorial() {
  return (
    <section className="agency-photo-work" aria-labelledby="agency-photo-work-heading">
      <div className="agency-photo-work-head">
        <span className="agency-eyebrow">CAPABILITIES IN FOCUS</span>
        <h2 id="agency-photo-work-heading">A closer look at what great digital work takes.</h2>
        <p>These are illustrative editorial photographs, not a claim that the pictured people or environments belong to PINCODE IT.</p>
      </div>
      <div className="agency-photo-work-grid">
        {columns.map(({key,eyebrow,title,body}) => {
          const image = photo(key);
          return (
            <article key={key} className="agency-photo-work-card">
              <div className="agency-photo-work-image">
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 800px) 91vw, 31vw" loading="lazy" quality={66}/>
              </div>
              <div className="agency-photo-work-copy">
                <span>{eyebrow}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </article>
          );
        })}
      </div>
      <Link href="/contact" className="agency-photo-work-link">Let's discuss your project <span aria-hidden="true">↗</span></Link>
    </section>
  );
}
