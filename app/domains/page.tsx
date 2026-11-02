import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/layout/SiteShell";
import { AgencyPageHero } from "@/components/marketing/AgencyPageHero";
import { MarketplaceVisualLead } from "@/components/marketing/MarketplaceVisualLead";
import { DomainSearch } from "@/components/domains/DomainSearch";
import { ProviderMarketplace } from "@/components/marketplace/ProviderMarketplace";
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
        <AgencyPageHero
          headingId="domains-heading"
          eyebrow="PINCODE IT / DOMAIN SERVICES"
          title="A great digital idea starts with the right domain."
          description="Check whether your preferred name already has a registration record, explore other extensions, compare official registrar prices and promotions, then order directly from trusted providers."
          primary={{ label: "Search a domain", href: "#domain-search-title", arrow: "↓" }}
          secondary={{ label: "Compare registrars", href: "#domain-provider-comparison", arrow: "↓" }}
          stages={["FIND", "COMPARE", "LAUNCH"]}
        />
        <MarketplaceVisualLead kind="domain" />
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
