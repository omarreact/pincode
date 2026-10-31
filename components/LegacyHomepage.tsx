"use client";
import { useEffect, useRef } from "react";

/* The exact original homepage markup is retained so the former layout and
   typography can be restored without maintaining a second public HTML page.
   React owns the lifecycle of animation observers and event listeners. */
const originalHomepageHTML = "\n<a class=\"skip-link\" href=\"#main\">Skip to content</a>\n<div class=\"announcement\">Building something new? <a href=\"/contact\">Start a project with Pincode →</a></div>\n<header class=\"site-header\"><div class=\"container nav\">\n<a class=\"brand\" href=\"/\"><span class=\"brand-mark\"><img src=\"/brand/pincode-mark.svg\" alt=\"\" width=\"28\" height=\"28\" decoding=\"async\"/></span><span class=\"brand-name\">PINCODE IT</span></a>\n<nav class=\"nav-links\"><a class=\"nav-link active\" href=\"/\">Home</a><a class=\"nav-link\" data-mega-trigger aria-expanded=\"false\" href=\"/services\">Services</a><a class=\"nav-link\" href=\"/solutions\">Solutions</a><a class=\"nav-link\" href=\"/work\">Work</a><a class=\"nav-link\" href=\"/about\">About</a><a class=\"nav-link\" href=\"/insights\">Insights</a><a class=\"nav-link\" href=\"/domains\">Domain Search</a><a class=\"nav-link\" href=\"/hosting\">Hosting Deals</a></nav>\n<div class=\"nav-actions\"><a class=\"button button-primary\" href=\"/contact\">Start a project</a><button class=\"menu-button\" data-menu-button aria-label=\"Menu\" aria-expanded=\"false\"><span></span><span></span><span></span></button></div>\n</div></header>\n<div class=\"mega-menu\" data-mega><div class=\"container mega-inner\"><div class=\"mega-primary\"><div class=\"mega-label\">Explore services</div><a href=\"/services#web\">Web & business</a><a href=\"/services#commerce\">E-commerce</a><a href=\"/services#performance\">Performance</a></div><div class=\"mega-list\"><div class=\"mega-label\">Operate better</div><a href=\"/services#security\">Security & reliability</a><a href=\"/services#support\">Managed support</a><a href=\"/services#transformation\">Digital improvement</a></div><div class=\"mega-list\"><div class=\"mega-label\">Quick links</div><a href=\"/solutions\">Solutions by need</a><a href=\"/work\">Selected work</a><a href=\"/contact\">Project builder</a></div></div></div>\n<main id=\"main\">\n<section class=\"hero\"><div class=\"hero-orbit\"><span class=\"orbit-dot\"></span></div><div class=\"container hero-copy reveal\"><div class=\"kicker\">Pincode · Information Technology</div><h1>Technology that moves <span>business forward.</span></h1><p class=\"lede\">We design, build, improve and support digital systems with a simple goal: make technology more useful to the business behind it.</p><div class=\"hero-actions\"><a class=\"button button-primary\" href=\"/contact\">Start a project</a><a class=\"button button-light\" href=\"/services\">Explore services</a><a class=\"button button-light\" href=\"/domains\">Check a domain</a><a class=\"button button-light\" href=\"/hosting\">Compare hosting</a></div></div></section>\n\n<section class=\"section section-white\"><div class=\"container section-head reveal\"><div><div class=\"eyebrow\">Capabilities</div><h2>One IT partner. Multiple ways to move forward.</h2></div><p>Browse the areas Pincode can help with. Each service can stand alone or become part of a broader digital roadmap.</p></div><div class=\"scroller-wrap\"><div class=\"scroller\" data-scroller>\n<article class=\"service-tile\"><span class=\"number\">01 / BUILD</span><h3>Web & business solutions.</h3><p>Responsive websites and web experiences shaped around real customer journeys and business requirements.</p><a class=\"button button-light\" href=\"/services#web\">Learn more</a><div class=\"service-symbol\">⌘</div></article>\n<article class=\"service-tile\"><span class=\"number\">02 / SELL</span><h3>E-commerce that feels simple.</h3><p>Storefronts, catalog experiences and checkout journeys designed to make buying and managing easier.</p><a class=\"button button-ghost\" href=\"/services#commerce\">Learn more</a><div class=\"service-symbol\">↗</div></article>\n<article class=\"service-tile\"><span class=\"number\">03 / SPEED</span><h3>Performance without the wait.</h3><p>Technical review and focused optimization for sites that feel slower than they should.</p><a class=\"button button-light\" href=\"/services#performance\">Learn more</a><div class=\"service-symbol\">⚡</div></article>\n<article class=\"service-tile\"><span class=\"number\">04 / PROTECT</span><h3>Security and reliability.</h3><p>Practical hardening, safer configuration and responsible maintenance for digital infrastructure.</p><a class=\"button button-ghost\" href=\"/services#security\">Learn more</a><div class=\"service-symbol\">◇</div></article>\n<article class=\"service-tile\"><span class=\"number\">05 / CARE</span><h3>Support after launch.</h3><p>Updates, fixes, monitoring and technical help that continue after the initial project is complete.</p><a class=\"button button-light\" href=\"/services#support\">Learn more</a><div class=\"service-symbol\">∞</div></article>\n</div><div class=\"paddles\"><button class=\"paddle\" data-scroll-prev aria-label=\"Previous\">←</button><button class=\"paddle\" data-scroll-next aria-label=\"Next\">→</button></div></div></section>\n\n<section class=\"section\"><div class=\"container section-head reveal\"><div><div class=\"eyebrow\">How we think</div><h2>Less technology theatre. More useful outcomes.</h2></div><p>Good digital work is not about adding complexity. It is about choosing the right experience, architecture and operating model for the problem.</p></div><div class=\"container story-grid\">\n<article class=\"story-card large green reveal\"><div class=\"eyebrow\" style=\"color:#baf5df\">Designed around the business</div><h3>Start with the problem, not the stack.</h3><p>Requirements, users and business constraints come before frameworks and features.</p><div class=\"visual-code\">discover();<br>define();<br>design();<br>build();<br>measure();<br>improve();</div></article>\n<article class=\"story-card small reveal\"><div class=\"eyebrow\">Performance</div><h3>Fast is part of the experience.</h3><p>Speed, responsiveness and efficient delivery are considered from the beginning instead of treated as final polish.</p><div class=\"visual-grid\"><span></span><span></span><span></span><span></span><span></span><span></span></div></article>\n<article class=\"story-card half dark reveal\"><div class=\"eyebrow\" style=\"color:#69dab2\">Support</div><h3>Launch is a milestone, not an ending.</h3><p>Digital products need maintenance, security attention and improvement after they go live.</p></article>\n<article class=\"story-card half reveal\"><div class=\"eyebrow\">Clarity</div><h3>Make the next decision obvious.</h3><p>Clear interfaces, clear scope and clear communication reduce friction for users and teams alike.</p></article>\n</div></section>\n\n<section class=\"section section-white\"><div class=\"container feature-stage reveal\"><div class=\"feature-copy\"><div class=\"eyebrow\" style=\"color:#5ce2b2\">IT, connected</div><h3>Build. Improve. Protect. Support.</h3><p>Pincode brings core website and digital operations work into one connected service model, so improvements do not happen in isolation.</p><div style=\"margin-top:24px\"><a class=\"button button-primary\" href=\"/solutions\">Explore solutions</a></div></div><div class=\"feature-visual\"><div class=\"data-core\">PC</div></div></div></section>\n\n<section class=\"section\"><div class=\"container section-head reveal\"><div><div class=\"eyebrow\">Process</div><h2>A clear path from idea to operation.</h2></div><p>Projects move through deliberate stages so decisions, responsibilities and expectations stay visible.</p></div><div class=\"container process\"><nav class=\"process-nav\"><a class=\"active\" data-process-link href=\"#discover\">01 Discover</a><a data-process-link href=\"#define\">02 Define</a><a data-process-link href=\"#build\">03 Build</a><a data-process-link href=\"#operate\">04 Operate</a></nav><div class=\"process-list\">\n<article class=\"process-step reveal\" id=\"discover\" data-process-section><span>01 / DISCOVER</span><div><h3>Understand.</h3><p>Clarify the business context, audience, current friction and the result the project needs to deliver.</p></div></article>\n<article class=\"process-step reveal\" id=\"define\" data-process-section><span>02 / DEFINE</span><div><h3>Decide.</h3><p>Turn the problem into scope, priorities, content, architecture and a practical delivery plan.</p></div></article>\n<article class=\"process-step reveal\" id=\"build\" data-process-section><span>03 / BUILD</span><div><h3>Create.</h3><p>Design, develop, review and refine with usability, performance, accessibility and maintainability in mind.</p></div></article>\n<article class=\"process-step reveal\" id=\"operate\" data-process-section><span>04 / OPERATE</span><div><h3>Keep improving.</h3><p>Launch carefully, resolve real-world issues and continue supporting the platform when ongoing care is needed.</p></div></article>\n</div></div></section>\n\n<section class=\"section section-dark\"><div class=\"container section-head reveal\"><div><div class=\"eyebrow\" style=\"color:#5ce2b2\">Work</div><h2>Proof belongs in the product.</h2></div><p>Pincode will publish real case studies as verified client and project material is available. No invented portfolio or inflated statistics.</p></div><div class=\"container case-grid\"><a class=\"case-card reveal\" href=\"/work\"><span class=\"pill\">Case study framework</span><h3>From business problem to measurable digital change.</h3><p>See how Pincode structures future project stories around challenge, approach, delivery and outcome.</p><div class=\"case-screen\"></div></a><a class=\"case-card reveal\" href=\"/work\"><span class=\"pill\">Transparent by design</span><h3>Real work only.</h3><p>Project pages are reserved for work that can be described honestly and supported with genuine material.</p><div class=\"case-screen\"></div></a></div></section>\n\n<section class=\"section section-white\"><div class=\"container cta-band reveal\"><h2>Have something to build?</h2><a class=\"button button-light\" href=\"/contact\">Tell us about it →</a></div></section>\n</main>\n<footer class=\"site-footer\"><div class=\"container\"><div class=\"footer-grid\"><div class=\"footer-brand\"><a class=\"brand\" href=\"/\"><span class=\"brand-mark\"><img src=\"/brand/pincode-mark.svg\" alt=\"\" width=\"28\" height=\"28\"/></span><span class=\"brand-name\">PINCODE IT</span></a><p>Modern IT and digital solutions from Dhaka, Bangladesh.</p></div><div><div class=\"footer-title\">Explore</div><div class=\"footer-links\"><a href=\"/services\">Services</a><a href=\"/solutions\">Solutions</a><a href=\"/work\">Work</a></div></div><div><div class=\"footer-title\">Company</div><div class=\"footer-links\"><a href=\"/about\">About</a><a href=\"/insights\">Insights</a><a href=\"/contact\">Contact</a></div></div><div><div class=\"footer-title\">Connect</div><div class=\"footer-links\"><a href=\"mailto:pincodeit.com.bd@gmail.com\">Email</a><a href=\"https://www.facebook.com/pincode.com.bd/\">Facebook</a></div></div></div><div class=\"footer-bottom\"><span>© <span data-year></span> Pincode. All rights reserved.</span><span>Dhaka, Bangladesh · pincodeit.com</span></div></div></footer>\n<a class=\"floating-contact\" href=\"/contact\">Start a project →</a>\n<div class=\"modal\" data-modal><div class=\"modal-card\"><button class=\"modal-close\" data-modal-close aria-label=\"Close\">×</button><div class=\"eyebrow\">Pincode service</div><h2 data-modal-title></h2><p data-modal-body></p></div></div>\n\n";

// Shared source for the exact homepage navigation markup (header + mega-menu).
// The old announcement banner is intentionally excluded on inner pages.
export const legacySiteHeaderHTML = originalHomepageHTML.slice(
  originalHomepageHTML.indexOf('<header class="site-header">'),
  originalHomepageHTML.indexOf('<main id="main">')
);

export function LegacyHomepage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const controller = new AbortController();
    const query = (selector: string, container: ParentNode = root) => container.querySelector<HTMLElement>(selector);
    const all = (selector: string, container: ParentNode = root) => Array.from(container.querySelectorAll<HTMLElement>(selector));
    const bind = (node: EventTarget | null | undefined, type: string, listener: EventListener) => {
      node?.addEventListener(type, listener, { signal: controller.signal });
    };
    const menu = query("[data-mega]");
    const menuButton = query("[data-menu-button]");
    const triggers = all("[data-mega-trigger]");
    const mobile = () => window.matchMedia("(max-width: 900px)").matches;
    const ensureMobileNav = () => {
      if (!menu || !mobile() || query(".mobile-primary", menu)) return;
      const source = query(".nav-links");
      const destination = query(".mega-inner", menu);
      if (!source || !destination) return;
      const block = document.createElement("div");
      block.className = "mega-primary mobile-primary";
      const heading = document.createElement("div");
      heading.className = "mega-label";
      heading.textContent = "Navigate";
      block.append(heading);
      source.querySelectorAll("a").forEach(link => {
        const item = document.createElement("a");
        item.href = link.getAttribute("href") ?? "/";
        item.textContent = link.textContent;
        block.append(item);
      });
      destination.prepend(block);
    };
    const closeMenu = () => {
      menu?.classList.remove("open");
      menuButton?.setAttribute("aria-expanded", "false");
      triggers.forEach(trigger => trigger.setAttribute("aria-expanded", "false"));
    };
    const openMenu = () => {
      ensureMobileNav();
      menu?.classList.add("open");
      menuButton?.setAttribute("aria-expanded", "true");
      triggers.forEach(trigger => trigger.setAttribute("aria-expanded", "true"));
    };
    bind(menuButton, "click", () => menu?.classList.contains("open") ? closeMenu() : openMenu());
    triggers.forEach(trigger => {
      bind(trigger, "mouseenter", openMenu);
      bind(trigger, "focus", openMenu);
      bind(trigger, "click", event => {
        if (mobile()) {
          event.preventDefault();
          menu?.classList.contains("open") ? closeMenu() : openMenu();
        }
      });
    });
    bind(menu, "mouseleave", () => { if (!mobile()) closeMenu(); });
    bind(menu, "click", event => {
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest("a")) closeMenu();
    });
    bind(document, "click", event => {
      const target = event.target instanceof Element ? event.target : null;
      if (target && !target.closest("[data-mega], [data-mega-trigger], [data-menu-button]")) closeMenu();
    });

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealObserver = !reducedMotion && "IntersectionObserver" in window
      ? new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: .12 })
      : null;
    all(".reveal").forEach(element => {
      if (revealObserver) revealObserver.observe(element);
      else element.classList.add("visible");
    });

    all("[data-scroller]").forEach(element => {
      const wrap = element.closest(".scroller-wrap") ?? root;
      bind(query("[data-scroll-prev]", wrap), "click", () =>
        element.scrollBy({ left: -Math.min(element.clientWidth * .8, 500), behavior: reducedMotion ? "auto" : "smooth" }));
      bind(query("[data-scroll-next]", wrap), "click", () =>
        element.scrollBy({ left: Math.min(element.clientWidth * .8, 500), behavior: reducedMotion ? "auto" : "smooth" }));
    });

    const processLinks = all("[data-process-link]");
    const processSections = all("[data-process-section]");
    const processObserver = processLinks.length && processSections.length && "IntersectionObserver" in window
      ? new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) processLinks.forEach(link =>
              link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id));
          });
        }, { rootMargin: "-35% 0px -50% 0px" })
      : null;
    processSections.forEach(element => processObserver?.observe(element));

    const modal = query("[data-modal]");
    const modalTitle = query("[data-modal-title]");
    const modalBody = query("[data-modal-body]");
    const descriptions: Record<string, [string, string]> = {
      web: ["Web & Business Solutions", "Responsive business websites and applications designed around real user journeys."],
      ecommerce: ["E-commerce Platforms", "Storefronts and practical commerce journeys."],
      performance: ["Performance Engineering", "Focused improvements to speed, assets and usability."],
      security: ["Security & Reliability", "Hardening, reliable configuration and maintenance."],
      support: ["Managed Support", "Ongoing updates, fixes and technical support."],
    };
    const hideModal = () => {
      modal?.classList.remove("open");
      document.body.style.overflow = "";
    };
    all("[data-modal-open]").forEach(element => bind(element, "click", event => {
      event.preventDefault();
      const description = descriptions[element.dataset.modalOpen ?? ""];
      if (!description || !modal || !modalTitle || !modalBody) return;
      modalTitle.textContent = description[0];
      modalBody.textContent = description[1];
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    }));
    bind(query("[data-modal-close]"), "click", hideModal);
    bind(modal, "click", event => { if (event.target === modal) hideModal(); });
    bind(document, "keydown", event => {
      if ((event as KeyboardEvent).key === "Escape") { closeMenu(); hideModal(); }
    });
    all("[data-year]").forEach(element => { element.textContent = String(new Date().getFullYear()); });

    return () => {
      controller.abort();
      revealObserver?.disconnect();
      processObserver?.disconnect();
      document.body.style.overflow = "";
    };
  }, []);

  return <div id="pincode-legacy-home" ref={rootRef} dangerouslySetInnerHTML={{ __html: originalHomepageHTML }} />;
}
