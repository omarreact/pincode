import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How PINCODE IT handles website enquiries, domain searches and third-party links.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <LegalPage
    eyebrow="PINCODE IT / PRIVACY"
    title="Privacy, explained clearly."
    description="Understand what happens when you browse, check domains, compare providers or contact PINCODE IT."
    updated="2 November 2026"
    sections={[
      {
        title: "Who operates this website",
        paragraphs: [
          "PINCODE IT operates pincodeit.com. For questions about this notice or personal information associated with your enquiry, email admin@pincodeit.com.",
          "This notice describes the public website in its current configuration. Separately operated services, external registrars and hosting providers have their own privacy notices.",
        ],
      },
      {
        title: "Information you choose to share",
        paragraphs: [
          "The project builder keeps your selections and optional contact details in your browser while you prepare your message. Choosing Continue by email opens your own email application; you must send the message yourself. The public project builder does not currently submit enquiries into a PINCODE IT database.",
          "If you send us email, we receive the information you provide and may retain it in our business email systems to reply, discuss a proposal and maintain correspondence. Avoid including passwords, payment card information or other secrets in an enquiry.",
        ],
      },
      {
        title: "Domain searches and provider comparisons",
        paragraphs: [
          "When you check a domain, our website processes the name you enter and requests public registration information from the relevant registry using RDAP. The request is not a guarantee that the domain can be purchased.",
          "Our comparison pages may retrieve publicly displayed prices from third-party hosting and registrar sites. When you follow an external link, you leave PINCODE IT, and that provider controls its own account, checkout and privacy practices.",
        ],
      },
      {
        title: "Technical information and security",
        paragraphs: [
          "Like most hosted websites, our infrastructure and security services may process IP addresses, request information, timestamps and browser metadata to serve pages, prevent abuse and diagnose failures. Hosting and email providers may retain their own operational logs under their policies.",
          "We do not currently operate a public account system, advertising pixel or a stored enquiry database on this website. If we add new tracking or data-processing features, we should update this notice before enabling them.",
        ],
      },
      {
        title: "Your choices",
        paragraphs: [
          "You can browse the public pages without creating an account. You can choose not to submit an enquiry, and your mail application allows you to review a message before sending it.",
          "To ask about information you sent to PINCODE IT, request a correction or discuss deletion where applicable, contact admin@pincodeit.com. We may need to verify your request and retain information where required for legitimate business or legal reasons.",
        ],
      },
      {
        title: "Updates",
        paragraphs: [
          "We may revise this notice as our services, providers or legal requirements change. The update date above indicates the current published version.",
        ],
      },
    ]}
  />;
}
