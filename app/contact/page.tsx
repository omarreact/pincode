import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/SiteShell";
import { AgencyPageHero } from "@/components/AgencyPageHero";
import { AgencySectionIntro } from "@/components/AgencySectionIntro";
import { ContactOptionCard } from "@/components/ContactOptionCard";
import { ContactBuilder } from "@/components/ContactBuilder";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell PINCODE IT about your website, digital platform, performance or support requirements.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="agency-subpage agency-contact-page">
        <AgencyPageHero
          headingId="agency-page-title"
          eyebrow="PINCODE IT / CONTACT"
          title="Tell us what needs to change."
          description="Start with a guided project brief or contact us directly. You do not need an account, and this site does not store your brief."
          signature="A CLEAR START"
          primary={{ label: "Build a project brief", href: "#project-brief", arrow: "↓" }}
          secondary={{ label: "Email us", href: "mailto:admin@pincodeit.com", arrow: "↗" }}
          stages={["DISCOVER", "PLAN", "DELIVER"]}
          scrollLabel="SCROLL TO BEGIN ↓"
        />

        <section id="project-brief" className="agency-contact-section" aria-labelledby="project-brief-heading">
          <AgencySectionIntro
            variant="contact"
            headingId="project-brief-heading"
            eyebrow="01 / GUIDED ENQUIRY"
            title="Turn an idea into a useful first brief."
            description="Answer three short questions, then prepare an email in your own mail application. Nothing is automatically sent, saved or submitted to a CRM."
          />
          <div className="agency-contact-shell" data-site-motion="section">
            <ContactBuilder />
          </div>
        </section>

        <section className="agency-contact-section" aria-labelledby="direct-contact-heading">
          <AgencySectionIntro
            variant="contact"
            headingId="direct-contact-heading"
            eyebrow="02 / DIRECT CONTACT"
            title="Prefer a direct message?"
            description="Choose the simplest way to start a conversation. No account is needed, and business enquiries can be sent to our official domain email."
          />
          <div className="agency-contact-options">
            <ContactOptionCard
              label="BUSINESS EMAIL"
              title="admin@pincodeit.com"
              description="Share your challenge, an idea or the next step you'd like to discuss."
              href="mailto:admin@pincodeit.com"
              linkLabel="Compose an email ↗"
            />
            <ContactOptionCard
              label="BASED IN"
              title="Dhaka, Bangladesh"
              description="PINCODE IT provides digital projects and ongoing technical support in Dhaka. Please contact us before arranging an in-person visit."
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
