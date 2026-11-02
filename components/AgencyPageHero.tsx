import { AgencyActionLink, type AgencyAction } from "./AgencyActionLink";

type AgencyPageHeroProps = {
  headingId: string;
  eyebrow: string;
  title: string;
  description: string;
  primary: AgencyAction;
  secondary: AgencyAction;
  stages: [string, string, string];
  signature?: string;
  scrollLabel?: string;
};

/**
 * Reuses the Insights hero design on service tools and marketplaces.
 * All routes share the same CSS and route-entry motion; Home retains its own hero.
 */
export function AgencyPageHero({
  headingId,
  eyebrow,
  title,
  description,
  primary,
  secondary,
  stages,
  signature = "PINCODE IT",
  scrollLabel = "SCROLL TO EXPLORE ↓",
}: AgencyPageHeroProps) {
  return (
    <section className="agency-page-hero" aria-labelledby={headingId}>
      <div className="agency-hero-ambient agency-ambient-one" aria-hidden="true" />
      <div className="agency-hero-ambient agency-ambient-two" aria-hidden="true" />
      <div className="agency-hero-panel" data-site-motion="hero">
        <div className="agency-hero-topline">
          <span className="agency-eyebrow">{eyebrow}</span>
          <span className="agency-hero-signature">
            {signature} <span aria-hidden="true">↗</span>
          </span>
        </div>
        <div className="agency-hero-content">
          <h1 id={headingId}>{title}</h1>
          <p>{description}</p>
          <div className="agency-page-actions">
            <AgencyActionLink {...primary} variant="primary" />
            <AgencyActionLink {...secondary} variant="outline" />
          </div>
        </div>
        <div className="agency-hero-bottomline">
          <span>
            {stages[0]} <span className="agency-dot">·</span> {stages[1]}{" "}
            <span className="agency-dot">·</span> {stages[2]}
          </span>
          <span>{scrollLabel}</span>
        </div>
      </div>
    </section>
  );
}
