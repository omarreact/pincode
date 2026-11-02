import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/layout/SiteShell";
import { AgencyPageHero } from "@/components/marketing/AgencyPageHero";
import { MarketplaceVisualLead } from "@/components/marketing/MarketplaceVisualLead";
import { ProviderMarketplace } from "@/components/marketplace/ProviderMarketplace";
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
        <AgencyPageHero
          headingId="hosting-heading"
          eyebrow="PINCODE IT / HOSTING MARKETPLACE"
          title="Compare hosting providers. Choose with confidence."
          description="Understand first-term prices, renewal costs and plan features before you buy. Choose a provider and continue directly to its official order page."
          primary={{ label: "Compare hosting plans", href: "#hosting-provider-comparison", arrow: "↓" }}
          secondary={{ label: "Start a conversation", href: "/contact", arrow: "↗" }}
          stages={["COMPARE", "CHOOSE", "LAUNCH"]}
        />
        <MarketplaceVisualLead kind="hosting" />
        <ProviderMarketplace kind="hosting" initialFeed={getReferenceMarketplace("hosting")}/>
      </main>
      <SiteFooter/>
    </>
  );
}
