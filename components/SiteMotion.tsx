"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Progressive enhancement: server-rendered content remains readable if JS
 * never runs. No animation library, page-transition delays or layout shifts.
 */
export function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.querySelector<HTMLElement>("main#main");
    if (!main || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nodes = Array.from(main.querySelectorAll<HTMLElement>("[data-site-motion]"));
    if (!nodes.length) return;

    const animate = (node: HTMLElement) => {
      node.classList.add("site-motion-visible");
      node.classList.remove("site-motion-pending");
    };
    if (!("IntersectionObserver" in window)) {
      nodes.forEach(animate);
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        animate(element);
        observer.unobserve(element);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    nodes.forEach((node, index) => {
      if (node.dataset.siteMotion === "card") {
        node.style.setProperty("--site-motion-delay", String(Math.min(index % 3, 2) * 65) + "ms");
      }
      // Above-the-fold content is never hidden awaiting hydration.
      if (node.getBoundingClientRect().top < window.innerHeight * 0.9) {
        node.classList.add("site-motion-enter");
      } else {
        node.classList.add("site-motion-pending");
        observer.observe(node);
      }
    });

    return () => {
      observer.disconnect();
      nodes.forEach(node => {
        node.classList.remove("site-motion-pending", "site-motion-visible", "site-motion-enter");
        node.style.removeProperty("--site-motion-delay");
      });
    };
  }, [pathname]);

  return null;
}
