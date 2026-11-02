"use client";

import { useEffect } from "react";

/** Small client island for the old service carousel/modal. The large homepage
 * markup and domain/hosting sections are server-rendered, not hydrated. */
export function LegacyHomepageInteractions() {
  useEffect(() => {
    const root = document.getElementById("pincode-legacy-home");
    if (!root) return;
    const controller = new AbortController();
    const query = (selector: string, container: ParentNode = root) => container.querySelector<HTMLElement>(selector);
    const all = (selector: string, container: ParentNode = root) => Array.from(container.querySelectorAll<HTMLElement>(selector));
    const bind = (node: EventTarget | null | undefined, type: string, listener: EventListener) => {
      node?.addEventListener(type, listener, { signal: controller.signal });
    };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // All server-rendered sections are visible immediately. No scroll observer
    // may hide content in long screenshots, on slow phones or during hydration.
    // The hero uses a small CSS-only first-paint animation instead.

    all("[data-scroller]").forEach(element => {
      const wrap = element.closest(".scroller-wrap") ?? root;
      bind(query("[data-scroll-prev]", wrap), "click", () =>
        element.scrollBy({ left: -Math.min(element.clientWidth * .8, 500), behavior: reducedMotion ? "auto" : "smooth" }));
      bind(query("[data-scroll-next]", wrap), "click", () =>
        element.scrollBy({ left: Math.min(element.clientWidth * .8, 500), behavior: reducedMotion ? "auto" : "smooth" }));
    });

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

    return () => {
      controller.abort();
      document.body.style.overflow = "";
    };
  }, []);
  return null;
}
