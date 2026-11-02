"use client";
import { useEffect, useRef } from "react";
import { LegacyNavigation } from "../layout/LegacyNavigation";

/* The exact original homepage markup is retained so the former layout and
   typography can be restored without maintaining a second public HTML page.
   React owns the lifecycle of animation observers and event listeners. */
const homepageIntroHTML = "\n<a class=\"skip-link\" href=\"#main\">Skip to content</a>\n";
const originalHomepageHTML = "<main id=\"main\">\n<section class=\"hero\"><div class=\"hero-orbit\"><span class=\"orbit-dot\"></span></div><div class=\"container hero-copy reveal\"><div class=\"kicker\">Pincode · Information Technology</div><h1>Technology that moves <span>business forward.</span></h1><p class=\"lede\">We design, build, improve and support digital systems with a simple goal: make technology more useful to the business behind it.</p><div class=\"hero-actions\"><a class=\"button button-primary\" href=\"/contact\">Start a project</a><a class=\"button button-light\" href=\"/services\">Explore services</a><a class=\"button button-light\" href=\"/domains\">Check a domain</a><a class=\"button button-light\" href=\"/hosting\">Compare hosting</a></div></div></section>\n\n<section class=\"pincode-visual-proof\" aria-labelledby=\"pincode-visual-proof-title\">\n  <div class=\"container pincode-visual-proof-top reveal\">\n    <div>\n      <span class=\"pincode-visual-proof-label\">REAL INTERFACES / SELECTED BUILDS</span>\n      <h2 id=\"pincode-visual-proof-title\">See the work. Not just the words.</h2>\n      <p>Actual interface previews sourced from public PINCODE IT project repositories.</p>\n    </div>\n    <a class=\"button button-light\" href=\"/work\">Explore project work ↗</a>\n  </div>\n  <div class=\"container pincode-visual-proof-grid\">\n    <a class=\"pincode-preview pincode-preview-cms reveal\" href=\"/work\" aria-label=\"Explore PinCMS in our work\">\n      <div class=\"pincode-preview-window\"><span class=\"pincode-preview-window-head\">● ● ● <em>PINCODE IT / PINCMS</em></span>\n        <img src=\"/images/projects/pincms-dashboard.webp\" loading=\"lazy\" decoding=\"async\" width=\"1100\" height=\"688\" alt=\"PinCMS content dashboard preview sourced from the public repository\" />\n      </div>\n      <div class=\"pincode-preview-meta\"><span>CONTENT SYSTEMS</span><strong>PinCMS · Content studio</strong><span aria-hidden=\"true\">↗</span></div>\n    </a>\n    <a class=\"pincode-preview pincode-preview-ai reveal\" href=\"/work\" aria-label=\"Explore PinAI in our work\">\n      <div class=\"pincode-preview-window\"><span class=\"pincode-preview-window-head\">● ● ● <em>PINCODE IT / PINAI</em></span>\n        <img src=\"/images/projects/pinai-builder.png\" loading=\"lazy\" decoding=\"async\" width=\"1280\" height=\"800\" alt=\"PinAI app builder workspace screenshot sourced from the public repository\" />\n      </div>\n      <div class=\"pincode-preview-meta\"><span>AI / DEVELOPER TOOLS</span><strong>PinAI · Building interfaces</strong><span aria-hidden=\"true\">↗</span></div>\n    </a>\n  </div>\n  <p class=\"container pincode-visual-proof-note\">Repository screenshots; features and interfaces may differ between builds.</p>\n</section>\n\n<section class=\"section section-white\"><div class=\"container section-head reveal\"><div><div class=\"eyebrow\">Capabilities</div><h2>One IT partner. Multiple ways to move forward.</h2></div><p>Browse the areas Pincode can help with. Each service can stand alone or become part of a broader digital roadmap.</p></div><div class=\"scroller-wrap\"><div class=\"scroller\" data-scroller>\n<article class=\"service-tile\"><span class=\"number\">01 / BUILD</span><h3>Web & business solutions.</h3><p>Responsive websites and web experiences shaped around real customer journeys and business requirements.</p><a class=\"button button-light\" href=\"/services#web\">Learn more</a><div class=\"service-symbol\">⌘</div></article>\n<article class=\"service-tile\"><span class=\"number\">02 / SELL</span><h3>E-commerce that feels simple.</h3><p>Storefronts, catalog experiences and checkout journeys designed to make buying and managing easier.</p><a class=\"button button-ghost\" href=\"/services#commerce\">Learn more</a><div class=\"service-symbol\">↗</div></article>\n<article class=\"service-tile\"><span class=\"number\">03 / SPEED</span><h3>Performance without the wait.</h3><p>Technical review and focused optimization for sites that feel slower than they should.</p><a class=\"button button-light\" href=\"/services#performance\">Learn more</a><div class=\"service-symbol\">⚡</div></article>\n<article class=\"service-tile\"><span class=\"number\">04 / PROTECT</span><h3>Security and reliability.</h3><p>Practical hardening, safer configuration and responsible maintenance for digital infrastructure.</p><a class=\"button button-ghost\" href=\"/services#security\">Learn more</a><div class=\"service-symbol\">◇</div></article>\n<article class=\"service-tile\"><span class=\"number\">05 / CARE</span><h3>Support after launch.</h3><p>Updates, fixes, monitoring and technical help that continue after the initial project is complete.</p><a class=\"button button-light\" href=\"/services#support\">Learn more</a><div class=\"service-symbol\">∞</div></article>\n</div><div class=\"paddles\"><button class=\"paddle\" data-scroll-prev aria-label=\"Previous\">←</button><button class=\"paddle\" data-scroll-next aria-label=\"Next\">→</button></div></div></section>\n\n<section class=\"section\"><div class=\"container section-head reveal\"><div><div class=\"eyebrow\">How we think</div><h2>Less technology theatre. More useful outcomes.</h2></div><p>Good digital work is not about adding complexity. It is about choosing the right experience, architecture and operating model for the problem.</p></div><div class=\"container story-grid\">\n<article class=\"story-card large green reveal\"><div class=\"eyebrow\" style=\"color:#baf5df\">Designed around the business</div><h3>Start with the problem, not the stack.</h3><p>Requirements, users and business constraints come before frameworks and features.</p><div class=\"visual-code\">discover();<br>define();<br>design();<br>build();<br>measure();<br>improve();</div></article>\n<article class=\"story-card small reveal\"><div class=\"eyebrow\">Performance</div><h3>Fast is part of the experience.</h3><p>Speed, responsiveness and efficient delivery are considered from the beginning instead of treated as final polish.</p><div class=\"visual-grid\"><span></span><span></span><span></span><span></span><span></span><span></span></div></article>\n<article class=\"story-card half dark reveal\"><div class=\"eyebrow\" style=\"color:#69dab2\">Support</div><h3>Launch is a milestone, not an ending.</h3><p>Digital products need maintenance, security attention and improvement after they go live.</p></article>\n<article class=\"story-card half reveal\"><div class=\"eyebrow\">Clarity</div><h3>Make the next decision obvious.</h3><p>Clear interfaces, clear scope and clear communication reduce friction for users and teams alike.</p></article>\n</div></section>\n\n<section class=\"section section-white\"><div class=\"container feature-stage reveal\"><div class=\"feature-copy\"><div class=\"eyebrow\" style=\"color:#5ce2b2\">IT, connected</div><h3>Build. Improve. Protect. Support.</h3><p>Pincode brings core website and digital operations work into one connected service model, so improvements do not happen in isolation.</p><div style=\"margin-top:24px\"><a class=\"button button-primary\" href=\"/solutions\">Explore solutions</a></div></div><div class=\"feature-visual\"><div class=\"data-core\">PC</div></div></div></section>\n\n<section class=\"section\"><div class=\"container section-head reveal\"><div><div class=\"eyebrow\">Process</div><h2>A clear path from idea to operation.</h2></div><p>Projects move through deliberate stages so decisions, responsibilities and expectations stay visible.</p></div><div class=\"container process\"><nav class=\"process-nav\"><a class=\"active\" data-process-link href=\"#discover\">01 Discover</a><a data-process-link href=\"#define\">02 Define</a><a data-process-link href=\"#build\">03 Build</a><a data-process-link href=\"#operate\">04 Operate</a></nav><div class=\"process-list\">\n<article class=\"process-step reveal\" id=\"discover\" data-process-section><span>01 / DISCOVER</span><div><h3>Understand.</h3><p>Clarify the business context, audience, current friction and the result the project needs to deliver.</p></div></article>\n<article class=\"process-step reveal\" id=\"define\" data-process-section><span>02 / DEFINE</span><div><h3>Decide.</h3><p>Turn the problem into scope, priorities, content, architecture and a practical delivery plan.</p></div></article>\n<article class=\"process-step reveal\" id=\"build\" data-process-section><span>03 / BUILD</span><div><h3>Create.</h3><p>Design, develop, review and refine with usability, performance, accessibility and maintainability in mind.</p></div></article>\n<article class=\"process-step reveal\" id=\"operate\" data-process-section><span>04 / OPERATE</span><div><h3>Keep improving.</h3><p>Launch carefully, resolve real-world issues and continue supporting the platform when ongoing care is needed.</p></div></article>\n</div></div></section>\n\n<section class=\"section section-dark\"><div class=\"container section-head reveal\"><div><div class=\"eyebrow\" style=\"color:#5ce2b2\">Work</div><h2>Proof belongs in the product.</h2></div><p>Pincode will publish real case studies as verified client and project material is available. No invented portfolio or inflated statistics.</p></div><div class=\"container case-grid\"><a class=\"case-card reveal\" href=\"/work\"><span class=\"pill\">PUBLIC PROJECT / PINCMS</span><h3>Practical tools for content and publishing.</h3><p>A glimpse of the page editing experience from our public PinCMS codebase.</p><div class=\"case-screen\"><img src=\"/images/projects/pincms-editor.webp\" loading=\"lazy\" decoding=\"async\" width=\"1100\" height=\"688\" alt=\"PinCMS page editor screenshot\" /></div></a><a class=\"case-card reveal\" href=\"/work\"><span class=\"pill\">PUBLIC PROJECT / PINAI</span><h3>Developer tools with a visual interface.</h3><p>Explore PinAI interface previews and inspect implementation progress in its public repository.</p><div class=\"case-screen\"><img src=\"/images/projects/pinai-scan.png\" loading=\"lazy\" decoding=\"async\" width=\"1280\" height=\"800\" alt=\"PinAI application scan interface screenshot\" /></div></a></div></section>\n\n<section class=\"section section-white\"><div class=\"container cta-band reveal\"><h2>Have something to build?</h2><a class=\"button button-light\" href=\"/contact\">Tell us about it →</a></div></section>\n</main>\n<footer class=\"site-footer\"><div class=\"container\"><div class=\"footer-grid\"><div class=\"footer-brand\"><a class=\"brand\" href=\"/\"><span class=\"brand-mark\"><img src=\"/brand/pincode-mark.svg\" alt=\"\" width=\"28\" height=\"28\"/></span><span class=\"brand-name\">PINCODE IT</span></a><p>Modern IT and digital solutions from Dhaka, Bangladesh.</p></div><div><div class=\"footer-title\">Explore</div><div class=\"footer-links\"><a href=\"/services\">Services</a><a href=\"/solutions\">Solutions</a><a href=\"/work\">Work</a></div></div><div><div class=\"footer-title\">Company</div><div class=\"footer-links\"><a href=\"/about\">About</a><a href=\"/insights\">Insights</a><a href=\"/contact\">Contact</a></div></div><div><div class=\"footer-title\">Connect</div><div class=\"footer-links\"><a href=\"mailto:pincodeit.com.bd@gmail.com\">Email</a><a href=\"https://www.facebook.com/pincode.com.bd/\">Facebook</a></div></div></div><div class=\"footer-bottom\"><span>© <span data-year></span> Pincode. All rights reserved.</span><span>Dhaka, Bangladesh · pincodeit.com</span></div></div></footer>\n<a class=\"floating-contact\" href=\"/contact\">Start a project →</a>\n<div class=\"modal\" data-modal><div class=\"modal-card\"><button class=\"modal-close\" data-modal-close aria-label=\"Close\">×</button><div class=\"eyebrow\">Pincode service</div><h2 data-modal-title></h2><p data-modal-body></p></div></div>\n\n";

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
      if ((event as KeyboardEvent).key === "Escape") { hideModal(); }
    });
    all("[data-year]").forEach(element => { element.textContent = String(new Date().getFullYear()); });

    return () => {
      controller.abort();
      revealObserver?.disconnect();
      processObserver?.disconnect();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div id="pincode-legacy-home" ref={rootRef}>
      <div dangerouslySetInnerHTML={{ __html: homepageIntroHTML }} />
      <LegacyNavigation />
      <div dangerouslySetInnerHTML={{ __html: originalHomepageHTML }} />
    </div>
  );
}
