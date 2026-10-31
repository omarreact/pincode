import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/SiteShell";
import { ProviderMarketplace } from "@/components/ProviderMarketplace";
import { getReferenceMarketplace } from "@/lib/provider-marketplace";
import "../domains/domains.css";
import "../domains/marketplace.css";

export const metadata:Metadata={
  title:"Compare Web Hosting Plans & Deals",
  description:"Compare Namecheap, Hostinger and SiteGround hosting plans, first-term and renewal prices, features, and official deals with PINCODE IT.",
  alternates:{canonical:"/hosting"}
};

export default function HostingComparison(){
  return (
    <>
      <SiteHeader/>
      <main className="domain-page" id="main">
        <section className="domain-page-hero" data-site-motion="hero">
          <span className="domain-eyebrow">PINCODE IT / HOSTING MARKETPLACE</span>
          <h1>Compare hosting providers.<br/><span>Choose with confidence.</span></h1>
          <p>Understand first-term prices, renewal costs and plan features before you buy.
            Choose a provider and continue directly to its official order page.</p>
        </section>
        <ProviderMarketplace kind="hosting" initialFeed={getReferenceMarketplace("hosting")}/>
      </main>
      <SiteFooter/>
    </>
  );
}
