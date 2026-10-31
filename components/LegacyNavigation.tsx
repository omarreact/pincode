"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Domain Search", href: "/domains" },
  { label: "Hosting Deals", href: "/hosting" },
];

const menuGroups = [
  { title: "Explore services", className: "mega-primary", entries: [
    { label: "Web & business", href: "/services#web" },
    { label: "E-commerce", href: "/services#commerce" },
    { label: "Performance", href: "/services#performance" },
  ] },
  { title: "Operate better", className: "mega-list", entries: [
    { label: "Security & reliability", href: "/services#security" },
    { label: "Managed support", href: "/services#support" },
    { label: "Digital improvement", href: "/services#transformation" },
  ] },
  { title: "Quick links", className: "mega-list", entries: [
    { label: "Solutions by need", href: "/solutions" },
    { label: "Selected work", href: "/work" },
    { label: "Project builder", href: "/contact" },
  ] },
];

/** Native Next.js Link navigation using the original homepage's CSS selectors. */
export function LegacyNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = () => setOpen(false);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const onOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !ref.current?.contains(event.target)) close();
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("pointerdown", onOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("pointerdown", onOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  const mobile = () => window.matchMedia("(max-width: 900px)").matches;
  return (
    <div className="pincode-navigation" ref={ref}>
      <header className="site-header">
        <div className="container nav">
          <Link className="brand" href="/">
            <span className="brand-mark"><img src="/brand/pincode-mark.svg" alt="" width={28} height={28} decoding="async" /></span>
            <span className="brand-name">PINCODE IT</span>
          </Link>
          <nav className="nav-links" aria-label="Main navigation">
            {navigation.map(item => (
              <Link
                key={item.href}
                className={"nav-link" + (pathname === item.href ? " active" : "")}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                aria-expanded={item.href === "/services" ? open : undefined}
                data-mega-trigger={item.href === "/services" ? "" : undefined}
                onMouseEnter={item.href === "/services" ? () => setOpen(true) : undefined}
                onFocus={item.href === "/services" ? () => setOpen(true) : undefined}
                onClick={event => {
                  if (item.href === "/services" && mobile()) {
                    event.preventDefault();
                    setOpen(value => !value);
                  } else close();
                }}
              >{item.label}</Link>
            ))}
          </nav>
          <div className="nav-actions">
            <Link className="button button-primary" href="/contact" onClick={close}>Start a project</Link>
            <button
              className="menu-button"
              data-menu-button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-controls="pincode-mega-menu"
              aria-expanded={open}
              onClick={() => setOpen(value => !value)}
            ><span/><span/><span/></button>
          </div>
        </div>
      </header>
      <div
        id="pincode-mega-menu"
        className={"mega-menu" + (open ? " open" : "")}
        data-mega
        onMouseLeave={() => { if (!mobile()) close(); }}
      >
        <div className="container mega-inner">
          <div className="mega-primary mobile-primary">
            <div className="mega-label">Navigate</div>
            {navigation.map(item => <Link key={item.href} href={item.href} onClick={close}>{item.label}</Link>)}
          </div>
          {menuGroups.map(group => (
            <div className={group.className} key={group.title}>
              <div className="mega-label">{group.title}</div>
              {group.entries.map(link => <Link href={link.href} key={link.href} onClick={close}>{link.label}</Link>)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
