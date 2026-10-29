import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/SiteShell";
import { DomainSearch } from "@/components/DomainSearch";
import "./domains.css";

export const metadata: Metadata = {
  title: "Domain Search & Availability",
  description: "Search .com, .net, .org, .dev and .app domains using public registry registration records. Explore names for your next website with PINCODE IT.",
  alternates: { canonical: "/domains" },
};

export default function DomainsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="domain-page">
        <section className="domain-page-hero" aria-labelledby="domains-heading">
          <span className="domain-eyebrow">PINCODE IT / DOMAIN SERVICES</span>
          <h1 id="domains-heading">A great digital idea starts with <span>the right domain.</span></h1>
          <p>Check whether your preferred name already has a registration record, explore other extensions, and get help planning your website or hosting.</p>
        </section>
        <DomainSearch />
        <div className="domain-page-below">
          <article><strong>01 · Find a name</strong><p>Compare popular domain extensions before choosing your brand online.</p></article>
          <article><strong>02 · Verify with a registrar</strong><p>Confirm registration eligibility, premium prices and restrictions with your preferred registrar.</p></article>
          <article><strong>03 · Build your presence</strong><p>PINCODE IT can help connect hosting, DNS, email and your new website.</p></article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
