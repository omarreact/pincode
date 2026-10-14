import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/SiteShell";
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
        <section className="agency-page-hero" aria-labelledby="agency-page-title">
          <div className="agency-hero-ambient agency-ambient-one" aria-hidden="true" />
          <div className="agency-hero-ambient agency-ambient-two" aria-hidden="true" />
          <div className="agency-hero-panel">
            <div className="agency-hero-topline">
              <span className="agency-eyebrow">PINCODE IT / CONTACT</span>
              <span className="agency-hero-signature">A CLEAR START <span aria-hidden="true">↗</span></span>
            </div>
            <div className="agency-hero-content">
              <h1 id="agency-page-title">Tell us what needs to change.</h1>
              <p>Start with a guided project brief or contact us directly. You do not need an account, and this site does not store your brief.</p>
              <div className="agency-page-actions">
                <a href="#project-brief" className="agency-glass-button agency-glass-button-primary">
                  Build a project brief <span aria-hidden="true">↓</span>
                </a>
                <a href="mailto:pincodeit.com.bd@gmail.com" className="agency-glass-button agency-glass-button-outline">
                  Email us <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
            <div className="agency-hero-bottomline">
              <span>DISCOVER <span className="agency-dot">·</span> PLAN <span className="agency-dot">·</span> DELIVER</span>
              <span>SCROLL TO BEGIN ↓</span>
            </div>
          </div>
        </section>

        <section id="project-brief" className="agency-contact-section" aria-labelledby="project-brief-heading">
          <div className="agency-contact-intro">
            <span className="agency-eyebrow">01 / GUIDED ENQUIRY</span>
            <h2 id="project-brief-heading">Turn an idea into a useful first brief.</h2>
            <p>Answer three short questions, then prepare an email in your own mail application. Nothing is automatically sent, saved or submitted to a CRM.</p>
          </div>
          <div className="agency-contact-shell">
            <ContactBuilder />
          </div>
        </section>

        <section className="agency-contact-section" aria-labelledby="direct-contact-heading">
          <div className="agency-contact-intro">
            <span className="agency-eyebrow">02 / DIRECT CONTACT</span>
            <h2 id="direct-contact-heading">Prefer a direct message?</h2>
            <p>Choose the simplest way to start a conversation. There is no account requirement and no phone number on this website.</p>
          </div>
          <div className="agency-contact-options">
            <article className="agency-contact-option">
              <small>BUSINESS EMAIL</small>
              <h3>pincodeit.com.bd@gmail.com</h3>
              <p>Share your challenge, an idea or the next step you'd like to discuss.</p>
              <a href="mailto:pincodeit.com.bd@gmail.com">Compose an email ↗</a>
            </article>
            <article className="agency-contact-option">
              <small>BASED IN</small>
              <h3>Dhaka, Bangladesh</h3>
              <p>PINCODE IT collaborates on digital projects and ongoing technical support. We don't publish an unverified street address.</p>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
