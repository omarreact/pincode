"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Upgrade links in the preserved homepage content to App Router SPA transitions.
 * Normal Next.js Link anchors are already handled by Next and are not intercepted.
 */
export function LegacyLinkBridge() {
  const router = useRouter();

  useEffect(() => {
    const resolve = (anchor: HTMLAnchorElement) => {
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || anchor.hasAttribute("download") ||
          (anchor.target && anchor.target !== "_self") ||
          anchor.rel.split(/\s+/).includes("external")) return null;
      let url: URL;
      try { url = new URL(href, window.location.href); } catch { return null; }
      if (url.origin !== window.location.origin || !["http:", "https:"].includes(url.protocol)) return null;
      if (/^\/(?:api|nid_dob|_next)(?:\/|$)/.test(url.pathname) || /\.[a-z0-9]+$/i.test(url.pathname)) return null;
      return url;
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 ||
          event.ctrlKey || event.metaKey || event.shiftKey || event.altKey ||
          !(event.target instanceof Element)) return;
      const anchor = event.target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const next = resolve(anchor);
      if (!next) return;
      const route = next.pathname + next.search + next.hash;
      const current = window.location.pathname + window.location.search + window.location.hash;
      if (route === current) return;
      // Let native same-page fragment scrolling work without an unnecessary RSC fetch.
      if (next.pathname === window.location.pathname && next.search === window.location.search && next.hash) return;
      event.preventDefault();
      router.push(route);
    };

    const onPrefetch = (event: Event) => {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement) || anchor.dataset.spaPrefetched) return;
      if (!anchor.closest("#pincode-legacy-home")) return;
      const next = resolve(anchor);
      if (!next || next.pathname === window.location.pathname) return;
      anchor.dataset.spaPrefetched = "1";
      router.prefetch(next.pathname + next.search);
    };

    document.addEventListener("click", onClick);
    document.addEventListener("pointerover", onPrefetch, { passive: true });
    document.addEventListener("focusin", onPrefetch);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("pointerover", onPrefetch);
      document.removeEventListener("focusin", onPrefetch);
    };
  }, [router]);

  return null;
}
