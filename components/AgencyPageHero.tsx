import Link from "next/link";

type HeroAction = {
  label: string;
  href: string;
  arrow: "↓" | "↗";
};

type AgencyPageHeroProps = {
  headingId: string;
  eyebrow: string;
  title: string;
  description: string;
  primary: HeroAction;
  secondary: HeroAction;
  stages: [string, string, string];
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
}: AgencyPageHeroProps) {
  return (
    <section className="agency-page-hero" aria-labelledby={headingId}>
      <div className="agency-hero-ambient agency-ambient-one" aria-hidden="true" />
      <div className="agency-hero-ambient agency-ambient-two" aria-hidden="true" />
      <div className="agency-hero-panel" data-site-motion="hero">
        <div className="agency-hero-topline">
          <span className="agency-eyebrow">{eyebrow}</span>
          <span className="agency-hero-signature">
            PINCODE IT <span aria-hidden="true">↗</span>
          </span>
        </div>
        <div className="agency-hero-content">
          <h1 id={headingId}>{title}</h1>
          <p>{description}</p>
          <div className="agency-page-actions">
            <Link href={primary.href} className="agency-glass-button agency-glass-button-primary">
              {primary.label} <span aria-hidden="true">{primary.arrow}</span>
            </Link>
            <Link href={secondary.href} className="agency-glass-button agency-glass-button-outline">
              {secondary.label} <span aria-hidden="true">{secondary.arrow}</span>
            </Link>
          </div>
        </div>
        <div className="agency-hero-bottomline">
          <span>
            {stages[0]} <span className="agency-dot">·</span> {stages[1]}{" "}
            <span className="agency-dot">·</span> {stages[2]}
          </span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
      </div>
    </section>
  );
}
