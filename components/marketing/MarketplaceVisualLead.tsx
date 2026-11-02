import Image from "next/image";
import Link from "next/link";
import "./marketplace-visual-lead.css";
import { photo } from "@/lib/stock-photos";

/** Small, relevant visual explanation ahead of transactional tools. */
export function MarketplaceVisualLead({ kind }: { kind: "domain" | "hosting" }) {
  const domain = kind === "domain";
  return (
    <section className="agency-market-visual" aria-labelledby="agency-market-title">
      <div className="agency-market-picture">
        <Image
          src={photo(domain ? "connected" : "infrastructure").src}
          fill
          sizes="(max-width: 820px) 100vw, 48vw"
          alt={domain ? "Earth viewed from space illustrating an internet-wide presence" : "Server hardware illustrating web-hosting infrastructure"}
          loading="lazy"
          quality={65}
        />
        <span className="agency-market-photo-note">Illustrative photography · Unsplash</span>
      </div>
      <div className="agency-market-copy">
        <span className="agency-eyebrow">{domain ? "YOUR NAME / YOUR IDENTITY" : "YOUR STACK / YOUR FOUNDATION"}</span>
        <h2 id="agency-market-title">{domain ? "A digital address for what you're building." : "Great hosting is more than a headline price."}</h2>
        <p>{domain
          ? "Start with a memorable name. Then confirm availability with the registrar before you invest in a brand, email or website."
          : "Look beyond discounts: compare renewal prices, support, reliability and technical requirements before making a decision."}
        </p>
        <Link href={domain ? "#domain-search-title" : "#hosting-provider-comparison"} className="agency-market-action">
          {domain ? "Start domain search" : "Compare hosting offers"} <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
