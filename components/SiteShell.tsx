"use client";

import Link from "next/link";
import { LegacyNavigation } from "./LegacyNavigation";
import { SiteMotion } from "./SiteMotion";

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
        <div>
          <b>Explore</b>
          <Link href="/services">Services</Link>
          <Link href="/domains">Domain Search</Link>
          <Link href="/hosting">Hosting Deals</Link>
          <Link href="/solutions">Solutions</Link>
          <Link href="/work">Work</Link>
        </div>
        <div>
          <b>Company</b>
          <Link href="/about">About</Link>
          <Link href="/insights">Insights</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <b>Get in touch</b>
          <a href="mailto:pincodeit.com.bd@gmail.com">Business email ↗</a>
          <Link href="/contact" className="agency-footer-contact-link">Start a project ↗</Link>
        </div>
      </div>
      <div className="copyright agency-copyright">
        <span>© {new Date().getFullYear()} PINCODE IT. All rights reserved.</span>
        <span>Built for what comes next.</span>
      </div>
    </footer>
  );
}
