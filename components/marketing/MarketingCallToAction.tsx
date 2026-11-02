import Link from "next/link";
import { AgencyActionLink } from "./AgencyActionLink";
import { site } from "@/lib/site-config";

export type MarketingCtaVariant = "default" | "contact";

/**
 * Shared, server-rendered conversion section.
 * SiteFooter owns this component, so every public page receives exactly one
 * CTA immediately above the same global footer.
 */
export function MarketingCallToAction({ variant = "default" }: { variant?: MarketingCtaVariant }) {
  const isContact = variant === "contact";
  const primary = isContact
    ? { href: `mailto:${site.email}`, label: "Email your idea", arrow: "↗" as const }
    : { href: "/contact", label: "Start your project", arrow: "↗" as const };

  return (
    <section className="agency-footer-section" aria-labelledby="agency-site-cta-title">
      <div className="agency-footer-cta" data-site-motion="section">
        <div className="agency-footer-ambient" aria-hidden="true" />
        <div className="agency-cta-copy">
          <span className="agency-eyebrow">
            <span className="agency-cta-status" aria-hidden="true" />
            {isContact ? "LET'S CONNECT / PINCODE IT" : "YOUR NEXT CHAPTER / PINCODE IT"}
          </span>
          <h2 id="agency-site-cta-title">
            {isContact ? (
              <>A conversation can <span>start something great.</span></>
            ) : (
              <>Have an idea? <span>Let's build what comes next.</span></>
            )}
          </h2>
          <p>
            {isContact
              ? "Tell us what you need, what you are trying to improve, or where you would like to begin. We are ready to hear your ideas."
              : "From your first idea to a reliable digital experience, we can help you plan, build and improve what matters to your business."}
          </p>
          <div className="agency-cta-actions">
            <AgencyActionLink {...primary} variant="light" />
            {isContact ? (
              <Link href="/services" className="agency-cta-secondary">
                Explore our services <span aria-hidden="true">↗</span>
              </Link>
            ) : (
              <a href={`mailto:${site.email}`} className="agency-cta-secondary">
                Email us directly <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
        <div className="agency-cta-visual" aria-hidden="true">
          <div className="agency-cta-visual-head">
            <span>PINCODE IT</span>
            <span>001 / IDEAS INTO ACTION</span>
          </div>
          <div className="agency-cta-orbit">
            <span className="agency-cta-orbit-line agency-cta-orbit-line-one" />
            <span className="agency-cta-orbit-line agency-cta-orbit-line-two" />
            <img src="/brand/pincode-mark.svg" alt="" width={76} height={76} decoding="async" />
          </div>
          <div className="agency-cta-visual-steps">
            <span>01 DISCOVER</span>
            <span>02 CREATE</span>
            <span>03 GROW</span>
          </div>
        </div>
      </div>
    </section>
  );
}
