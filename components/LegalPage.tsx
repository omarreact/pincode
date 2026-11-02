import { SiteHeader, SiteFooter } from "./SiteShell";
import { AgencyPageHero } from "./AgencyPageHero";
import "./legal.css";

export type LegalSection = {
  title: string;
  paragraphs: string[];
};

export function LegalPage({
  eyebrow, title, description, updated, sections,
}: {
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="agency-subpage">
        <AgencyPageHero
          headingId="agency-page-title"
          eyebrow={eyebrow}
          title={title}
          description={description}
          primary={{ label: "Contact us", href: "/contact", arrow: "↗" }}
          secondary={{ label: "Read below", href: "#policy-details", arrow: "↓" }}
          stages={["CLEAR", "FAIR", "RESPONSIBLE"]}
        />
        <section id="policy-details" className="agency-legal" aria-label={title}>
          <p className="agency-legal-updated">Last updated: {updated}</p>
          {sections.map((section, index) => (
            <section key={section.title} aria-labelledby={`legal-section-${index}`}>
              <h2 id={`legal-section-${index}`}>{section.title}</h2>
              {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
