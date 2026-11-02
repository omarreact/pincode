import type { Metadata } from "next";
import { MarketingPage } from "@/components/MarketingPage";

export const metadata: Metadata = {
  title: "Insights — Practical Perspectives on Digital Work",
  description: "Original guides on website strategy, performance, security and ongoing operations from PINCODE IT.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return <MarketingPage data={{
    eyebrow: "PINCODE IT / INSIGHTS",
    title: "Ideas for better digital work.",
    intro: "Practical perspectives on website development, performance, security and long-term operations.",
    cta: "Guides you can put to work.",
    exploreDescription: "Explore our practical guides. Each topic now links to a full article rather than an enquiry form.",
    cards: [
      { id: "strategy", title: "Choosing the right digital foundation", body: "A framework for selecting an architecture that fits users, editors and operations.", tag: "Strategy", href: "/insights/choosing-a-digital-foundation", linkLabel: "Read guide" },
      { id: "speed", title: "Why performance is part of design", body: "How server rendering, animation and real measurements shape faster experiences.", tag: "Performance", href: "/insights/performance-is-part-of-design", linkLabel: "Read guide" },
      { id: "security", title: "Small security decisions with big impact", body: "Defensible defaults for permissions, API responses and safe deployment.", tag: "Security", href: "/insights/security-decisions-that-matter", linkLabel: "Read guide" },
      { id: "support", title: "Life after launch", body: "Monitoring, maintenance, incident response and measured iteration.", tag: "Operations", href: "/insights/life-after-launch", linkLabel: "Read guide" },
    ],
  }} />;
}
