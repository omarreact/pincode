import Link from "next/link";
import { SiteHeader, SiteFooter } from "./SiteShell";

export type PageContent = {
  eyebrow: string;
  title: string;
  intro: string;
  cta?: string;
  cards: { id?: string; title: string; body: string; tag?: string }[];
};

/**
 * Shared server-rendered design for Services, Solutions, Work, About and Insights.
 * Page-specific copy comes from each route; the glass design stays consistent.
 */
export function MarketingPage({ data }: { data: PageContent }) {
  return (
    <>
      <SiteHeader />
      <main className="agency-subpage" id="main">
        <section className="agency-page-hero" aria-labelledby="agency-page-title">
          <div className="agency-hero-ambient agency-ambient-one" aria-hidden="true" />
          <div className="agency-hero-ambient agency-ambient-two" aria-hidden="true" />
          <div className="agency-hero-panel">
            <div className="agency-hero-topline">
              <span className="agency-eyebrow">{data.eyebrow}</span>
              <span className="agency-hero-signature">PINCODE IT <span aria-hidden="true">↗</span></span>
            </div>
            <div className="agency-hero-content">
              <h1 id="agency-page-title">{data.title}</h1>
              <p>{data.intro}</p>
              <div className="agency-page-actions">
                <Link href="/contact" className="agency-glass-button agency-glass-button-primary">
                  Start a conversation <span aria-hidden="true">↗</span>
                </Link>
                <a href="#explore" className="agency-glass-button agency-glass-button-outline">
                  Explore below <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
            <div className="agency-hero-bottomline">
              <span>BUILD <span className="agency-dot">·</span> IMPROVE <span className="agency-dot">·</span> SUPPORT</span>
              <span>SCROLL TO EXPLORE ↓</span>
            </div>
          </div>
        </section>

        <section className="agency-explore" id="explore" aria-labelledby="agency-explore-title">
          <div className="agency-explore-intro">
            <div>
              <span className="agency-eyebrow">EXPLORE / PINCODE IT</span>
              <h2 id="agency-explore-title">{data.cta ?? "Build useful technology together."}</h2>
            </div>
            <p>Explore the ideas and capabilities behind what we do, then start a conversation about what your business actually needs.</p>
          </div>
          <nav className="agency-index" aria-label="Jump to a topic">
            {data.cards.map((card, index) => (
              <a href={`#${card.id ?? "topic-" + (index + 1)}`} key={card.id ?? card.title} className="agency-index-link">
                <span className="agency-index-number">{String(index + 1).padStart(2, "0")}</span>
                <span>{card.title}</span>
                <span className="agency-index-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </nav>
          <div className="agency-card-grid">
            {data.cards.map((card, index) => (
              <article
                key={card.id ?? card.title}
                id={card.id ?? "topic-" + (index + 1)}
                className="agency-detail-card"
              >
                <div className="agency-card-top">
                  <span className="agency-card-number">{String(index + 1).padStart(2, "0")} / {String(data.cards.length).padStart(2, "0")}</span>
                  <span className="agency-card-tag">{card.tag ?? "FOCUS"}</span>
                </div>
                <div className="agency-card-symbol" aria-hidden="true"><span>↗</span></div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                <Link href="/contact" className="agency-card-link">
                  Discuss this <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="agency-footer-section" aria-label="Work with PINCODE IT">
          <div className="agency-footer-cta">
            <div className="agency-footer-ambient" aria-hidden="true" />
            <div>
              <span className="agency-eyebrow">LET'S MOVE FORWARD</span>
              <h2>Have something to build?</h2>
              <p>Tell us what you're trying to achieve. We'll start with the problem and work toward the right solution.</p>
            </div>
            <Link href="/contact" className="agency-glass-button agency-glass-button-light">
              Tell us about it <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
