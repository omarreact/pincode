"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error, reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Keep error details out of the public UI; hosting observability handles diagnostics.
    console.error("A public page failed to render", error);
  }, [error]);

  return (
    <main id="main" className="agency-subpage" style={{ minHeight: "80vh", display: "grid", placeItems: "center", padding: "36px 18px" }}>
      <section className="agency-hero-panel" style={{ width: "min(100%, 960px)" }} aria-labelledby="error-title">
        <div className="agency-hero-topline"><span className="agency-eyebrow">PINCODE IT / SOMETHING WENT WRONG</span></div>
        <div className="agency-hero-content">
          <h1 id="error-title">We couldn't open that page.</h1>
          <p>Please try again. If the issue continues, contact our support team.</p>
          <div className="agency-page-actions">
            <button type="button" onClick={reset} className="agency-glass-button agency-glass-button-primary">Try again ↻</button>
            <Link href="/" className="agency-glass-button agency-glass-button-outline">Return home ↗</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
