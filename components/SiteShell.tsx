"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { legacySiteHeaderHTML } from "./LegacyHomepage";

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

/** Render the homepage's *actual* header HTML on every non-home route.
 * Scoping the same two CSS files to the wrapper preserves the original look
 * without changing the content/page styles or the homepage implementation.
 */
export function SiteHeader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const controller = new AbortController();
    const on = (element: EventTarget | null, type: string, listener: EventListener) => {
      element?.addEventListener(type, listener, { signal: controller.signal });
    };
    const menu = root.querySelector<HTMLElement>("[data-mega]");
    const button = root.querySelector<HTMLElement>("[data-menu-button]");
    const triggers = Array.from(root.querySelectorAll<HTMLElement>("[data-mega-trigger]"));
    const mobile = () => window.matchMedia("(max-width: 900px)").matches;

    // Unlike the homepage's hardcoded Home state, inner routes get the proper
    // active link and aria-current state, including on client navigation.
    root.querySelectorAll<HTMLAnchorElement>(".nav-links a").forEach(link => {
      const href = link.getAttribute("href");
      const selected = href === pathname;
      link.classList.toggle("active", selected);
      if (selected) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    const ensureMobileNav = () => {
      if (!menu || !mobile() || menu.querySelector(".mobile-primary")) return;
      const source = root.querySelector(".nav-links");
      const inner = menu.querySelector(".mega-inner");
      if (!source || !inner) return;
      const block = document.createElement("div");
      block.className = "mega-primary mobile-primary";
      const title = document.createElement("div");
      title.className = "mega-label";
      title.textContent = "Navigate";
      block.append(title);
      source.querySelectorAll("a").forEach(link => {
        const clone = document.createElement("a");
        clone.href = link.getAttribute("href") ?? "/";
        clone.textContent = link.textContent;
        block.append(clone);
      });
      inner.prepend(block);
    };
    const closeMenu = () => {
      menu?.classList.remove("open");
      button?.setAttribute("aria-expanded", "false");
      triggers.forEach(link => link.setAttribute("aria-expanded", "false"));
    };
    const openMenu = () => {
      ensureMobileNav();
      menu?.classList.add("open");
      button?.setAttribute("aria-expanded", "true");
      triggers.forEach(link => link.setAttribute("aria-expanded", "true"));
    };

    closeMenu();
    on(button, "click", () => menu?.classList.contains("open") ? closeMenu() : openMenu());
    triggers.forEach(trigger => {
      on(trigger, "mouseenter", openMenu);
      on(trigger, "focus", openMenu);
      on(trigger, "click", event => {
        if (mobile()) {
          event.preventDefault();
          menu?.classList.contains("open") ? closeMenu() : openMenu();
        }
      });
    });
    on(menu, "mouseleave", () => { if (!mobile()) closeMenu(); });
    on(menu, "click", event => {
      if (event.target instanceof Element && event.target.closest("a")) closeMenu();
    });
    on(document, "click", event => {
      if (event.target instanceof Element && !root.contains(event.target)) closeMenu();
    });
    on(document, "keydown", event => {
      if ((event as KeyboardEvent).key === "Escape") closeMenu();
    });

    return () => controller.abort();
  }, [pathname]);

  return (
    <>
      <link rel="stylesheet" href="/legacy-home.css" precedence="default" />
      <link rel="stylesheet" href="/legacy-glass.css" precedence="default" />
      <div id="pincode-legacy-home" className="pincode-shared-nav" ref={rootRef}>
        <a className="skip-link" href="#main">Skip to content</a>
        <div dangerouslySetInnerHTML={{ __html: legacySiteHeaderHTML }} />
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
