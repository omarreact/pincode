import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms for browsing PINCODE IT and using public domain and hosting comparison tools.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <LegalPage
    eyebrow="PINCODE IT / TERMS"
    title="Clear terms for using this site."
    description="Information about public content, third-party offers and how we begin professional engagements."
    updated="2 November 2026"
    sections={[
      {
        title: "Public website content",
        paragraphs: [
          "This site introduces PINCODE IT services and offers general information about digital projects. You may browse and share links to public pages for lawful purposes. Please do not interfere with its operation or misuse the domain-search tools.",
          "Content is provided for general information and may change. Contact us before relying on any technical or commercial detail for a purchasing decision.",
        ],
      },
      {
        title: "Domains, hosting and external links",
        paragraphs: [
          "Domain results use public registration records. A missing record does not guarantee a name is available, transferable or eligible to register. Final availability and restrictions are determined by the registrar and registry.",
          "Hosting prices, promotions, feature lists and currency equivalents are indicative; displayed reference prices may be dated, vary by region or term, and exclude taxes or additional charges. Always check the current total, renewal price and terms on the provider's official checkout page.",
          "PINCODE IT does not process third-party hosting payments or register domains through these public comparison pages. External sites have their own agreements, privacy policies and billing processes.",
        ],
      },
      {
        title: "Professional services",
        paragraphs: [
          "Browsing this site or sending an enquiry does not create a services contract. Project scope, fees, timelines, deliverables, support responsibilities and intellectual-property terms are agreed separately in a written proposal or contract.",
          "Project information and examples are not warranties that a particular outcome, performance metric or launch date will be achieved.",
        ],
      },
      {
        title: "Accuracy and availability",
        paragraphs: [
          "We aim to keep information useful and current but cannot guarantee uninterrupted access, error-free third-party data or the accuracy of prices hosted by others. Where allowed by applicable law, use of general site information is at your own discretion.",
        ],
      },
      {
        title: "Contact and updates",
        paragraphs: [
          "For questions about these terms, write to admin@pincodeit.com. We may update these terms as the public website or its tools evolve; changes will be reflected in the date above.",
        ],
      },
    ]}
  />;
}
