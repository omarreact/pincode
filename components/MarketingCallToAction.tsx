import { AgencyActionLink } from "./AgencyActionLink";

/** Shared marketing CTA section: stays server-rendered and indexable. */
export function MarketingCallToAction() {
  return (
    <section className="agency-footer-section" aria-label="Work with PINCODE IT">
      <div className="agency-footer-cta" data-site-motion="section">
        <div className="agency-footer-ambient" aria-hidden="true" />
        <div>
          <span className="agency-eyebrow">LET'S MOVE FORWARD</span>
          <h2>Have something to build?</h2>
          <p>Tell us what you're trying to achieve. We'll start with the problem and work toward the right solution.</p>
        </div>
        <AgencyActionLink
          href="/contact"
          label="Tell us about it"
          arrow="↗"
          variant="light"
        />
      </div>
    </section>
  );
}
