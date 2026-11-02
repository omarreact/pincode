import { SiteHeader, SiteFooter } from "./SiteShell";
import { AgencyPageHero } from "./AgencyPageHero";
import { AgencySectionIntro } from "./AgencySectionIntro";
import { MarketingTopicLink, MarketingTopicCard, type MarketingTopicData } from "./MarketingTopic";
import { MarketingCallToAction } from "./MarketingCallToAction";

export type PageContent = {
  eyebrow: string;
  title: string;
  intro: string;
  cta?: string;
  cards: MarketingTopicData[];
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
        <AgencyPageHero
          headingId="agency-page-title"
          eyebrow={data.eyebrow}
          title={data.title}
          description={data.intro}
          primary={{ label: "Start a conversation", href: "/contact", arrow: "↗" }}
          secondary={{ label: "Explore below", href: "#explore", arrow: "↓" }}
          stages={["BUILD", "IMPROVE", "SUPPORT"]}
        />

        <section className="agency-explore" id="explore" aria-labelledby="agency-explore-title">
          <AgencySectionIntro
            variant="explore"
            headingId="agency-explore-title"
            eyebrow="EXPLORE / PINCODE IT"
            title={data.cta ?? "Build useful technology together."}
            description="Explore the ideas and capabilities behind what we do, then start a conversation about what your business actually needs."
          />
          <nav className="agency-index" aria-label="Jump to a topic">
            {data.cards.map((topic, index) => (
              <MarketingTopicLink topic={topic} index={index} key={topic.id ?? topic.title} />
            ))}
          </nav>
          <div className="agency-card-grid">
            {data.cards.map((topic, index) => (
              <MarketingTopicCard
                topic={topic}
                index={index}
                total={data.cards.length}
                key={topic.id ?? topic.title}
              />
            ))}
          </div>
        </section>

        <MarketingCallToAction />
      </main>
      <SiteFooter />
    </>
  );
}
