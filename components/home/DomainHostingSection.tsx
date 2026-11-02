import Image from "next/image";
import Link from "next/link";
import { photos } from "@/lib/stock-photos";
import "./domain-hosting-section.css";

const offers = [
  {
    eyebrow: "01 / DOMAINS",
    title: "The right name is where it starts.",
    description: "Discover domain options, check registration records and compare registrar offers before choosing your digital address.",
    primary: { href: "/domains", label: "Search a domain" },
    secondary: { href: "/domains#domain-provider-comparison", label: "Compare registrars" },
    features: ["Popular extensions", "Registrar comparisons"],
    image: photos.connected,
    artLabel: "A NAME TO BUILD ON",
    className: "is-domain",
  },
  {
    eyebrow: "02 / WEB HOSTING",
    title: "A reliable home for your next idea.",
    description: "Explore hosting features, introductory and renewal pricing, then compare providers before making your choice.",
    primary: { href: "/hosting", label: "Compare hosting plans" },
    secondary: { href: "/contact", label: "Talk to our team" },
    features: ["Plans & features", "Renewal pricing"],
    image: photos.infrastructure,
    artLabel: "THE FOUNDATION MATTERS",
    className: "is-hosting",
  },
] as const;

/** Server-rendered domain and hosting discovery: no client bundle. */
export function DomainHostingSection() {
  return (
    <section className="home-domain-hosting" aria-labelledby="home-domain-hosting-heading">
      <div className="container home-domain-hosting-inner">
        <div className="home-domain-hosting-intro">
          <div>
            <span className="home-domain-hosting-eyebrow">THE ESSENTIALS / YOUR ONLINE PRESENCE</span>
            <h2 id="home-domain-hosting-heading">A strong digital presence <span>starts here.</span></h2>
          </div>
          <p>Make your next step with clarity. Explore domains and hosting side by side, with simple tools and useful comparisons.</p>
        </div>
        <div className="home-domain-hosting-grid">
          {offers.map(offer => (
            <article className={`home-domain-hosting-card ${offer.className}`} key={offer.eyebrow}>
              <div className="home-domain-hosting-copy">
                <span className="home-domain-hosting-card-label">{offer.eyebrow}</span>
                <h3>{offer.title}</h3>
                <p>{offer.description}</p>
                <div className="home-domain-hosting-chips">
                  {offer.features.map(feature => <span key={feature}>{feature}</span>)}
                </div>
                <div className="home-domain-hosting-actions">
                  <Link href={offer.primary.href} className="home-domain-hosting-primary">{offer.primary.label} <span aria-hidden="true">↗</span></Link>
                  <Link href={offer.secondary.href} className="home-domain-hosting-secondary">{offer.secondary.label} <span aria-hidden="true">↗</span></Link>
                </div>
              </div>
              <div className="home-domain-hosting-photo">
                <Image
                  src={offer.image.src}
                  alt={offer.image.alt}
                  fill
                  sizes="(max-width:760px) 94vw, 44vw"
                  quality={65}
                  loading="lazy"
                />
                <div className="home-domain-hosting-photo-shade" />
                <span>{offer.artLabel}</span>
              </div>
            </article>
          ))}
        </div>
        <p className="home-domain-hosting-note">Check final registration availability, taxes and hosting renewal prices with each provider before purchasing.</p>
      </div>
    </section>
  );
}
