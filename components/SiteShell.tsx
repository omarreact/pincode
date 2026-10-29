"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { title: "Home", href: "/" },
  { title: "Services", href: "/services" },
  { title: "Domain Search", href: "/domains" },
  { title: "Solutions", href: "/solutions" },
  { title: "Work", href: "/work" },
  { title: "About", href: "/about" },
  { title: "Insights", href: "/insights" },
  { title: "Contact", href: "/contact" },
];

function Brand() {
  return (
    <Link href="/" className="agency-brand" aria-label="PINCODE IT, home">
      <span className="agency-brand-mark" aria-hidden="true">
        <svg viewBox="0 0 48 48" fill="none" role="presentation">
          <path d="M24 3 42 13.5v21L24 45 6 34.5v-21L24 3Z" stroke="currentColor" strokeWidth="3.5" />
          <path d="M18 31V16h7.2c4.8 0 7.8 2.6 7.8 6.7 0 4-3 6.7-7.8 6.7H22V31h-4Zm4-5.2h3c2.5 0 4-1 4-3.1 0-2.1-1.5-3.1-4-3.1h-3v6.2Z" fill="currentColor" />
        </svg>
      </span>
      <span>PINCODE <strong>IT</strong></span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <>
      <a className="agency-skip" href="#main">Skip to content</a>
      <div className="noticebar">Technology that moves business forward <span aria-hidden="true">↗</span></div>
      <header className="head agency-site-header">
        <Brand />
        <button
          type="button"
          className="mobile-toggle agency-menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="agency-primary-nav"
          onClick={() => setOpen(previous => !previous)}
        >
          <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        </button>
        <nav
          id="agency-primary-nav"
          className={open ? "navigation open agency-main-nav" : "navigation agency-main-nav"}
          aria-label="Main navigation"
        >
          {navigation.map(({ title, href }) => (
            <Link
              key={href}
              href={href}
              aria-current={path === href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {title}
            </Link>
          ))}
        </nav>
        <Link className="pill green head-cta agency-site-cta" href="/contact">
          Start a project <span aria-hidden="true">↗</span>
        </Link>
      </header>
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
