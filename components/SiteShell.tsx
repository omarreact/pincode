import Link from "next/link";
import { LegacyNavigation } from "./LegacyNavigation";
import { SiteMotion } from "./SiteMotion";
import { FooterLinkGroup } from "./FooterLinkGroup";

function Brand() {
  return (
    <Link href="/" className="agency-brand" aria-label="PINCODE IT, home">
      <span className="agency-brand-mark" aria-hidden="true">
        <img src="/brand/pincode-mark.svg" alt="" width={31} height={31} decoding="async" />
      </span>
      <span>PINCODE <strong>IT</strong></span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <>
      <link rel="stylesheet" href="/legacy-home.css" precedence="default" />
      <link rel="stylesheet" href="/legacy-glass.css" precedence="default" />
      <SiteMotion />
      <div id="pincode-legacy-home" className="pincode-shared-nav">
        <a className="skip-link" href="#main">Skip to content</a>
        <LegacyNavigation />
      </div>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="foot agency-site-footer">
      <div className="foot-grid agency-foot-grid">
        <div className="agency-foot-intro">
          <Brand />
          <p>Technology that moves business forward.</p>
          <span className="agency-foot-location">Dhaka, Bangladesh</span>
        </div>
        <FooterLinkGroup
          title="Explore"
          links={[
            { label: "Services", href: "/services" },
            { label: "Domain Search", href: "/domains" },
            { label: "Hosting Deals", href: "/hosting" },
            { label: "Solutions", href: "/solutions" },
            { label: "Work", href: "/work" },
          ]}
        />
        <FooterLinkGroup
          title="Company"
          links={[
            { label: "About", href: "/about" },
            { label: "Insights", href: "/insights" },
            { label: "Contact", href: "/contact" },
          ]}
        />
        <FooterLinkGroup
          title="Get in touch"
          links={[
            { label: "Business email ↗", href: "mailto:pincodeit.com.bd@gmail.com" },
            { label: "Start a project ↗", href: "/contact", className: "agency-footer-contact-link" },
          ]}
        />
      </div>
      <div className="copyright agency-copyright">
        <span>© {new Date().getFullYear()} PINCODE IT. All rights reserved.</span>
        <span>Built for what comes next.</span>
      </div>
    </footer>
  );
}
