import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/SiteShell";
import { DomainSearch } from "@/components/DomainSearch";
import { ProviderMarketplace } from "@/components/ProviderMarketplace";
import { getReferenceMarketplace } from "@/lib/provider-marketplace";
import "./domains.css";
import "./marketplace.css";

export const metadata: Metadata = {
  title: "Domain Search, Registrar Prices & Offers",
  description: "Search .com, .net, .org, .dev and .app domains using public registry registration records. Explore names for your next website with PINCODE IT.",
  alternates: { canonical: "/domains" },
};

export default function DomainsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="domain-page">
        <section className="domain-page-hero" data-site-motion="hero" aria-labelledby="domains-heading">
          <span className="domain-eyebrow">PINCODE IT / DOMAIN SERVICES</span>
          <h1 id="domains-heading">A great digital idea starts with <span>the right domain.</span></h1>
          <p>Check whether your preferred name already has a registration record, explore other extensions, compare official registrar prices and promotions, then order directly from trusted providers.</p>
        </section>
        <DomainSearch />
        <ProviderMarketplace kind="domain" initialFeed={getReferenceMarketplace("domain")} />
        <div className="domain-page-below" data-site-motion="section">
          <article><strong>01 · Find a name</strong><p>Compare popular domain extensions before choosing your brand online.</p></article>
          <article><strong>02 · Verify with a registrar</strong><p>Confirm registration eligibility, premium prices and restrictions with your preferred registrar.</p></article>
          <article><strong>03 · Build your presence</strong><p>PINCODE IT can help connect hosting, DNS, email and your new website.</p></article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
