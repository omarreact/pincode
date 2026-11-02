import type { Metadata } from "next";
import { MarketingPage } from "@/components/marketing/MarketingPage";

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
    story: "insights", cards: [
      { id: "strategy", title: "Choosing the right digital foundation", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72", imageAlt: "Bright contemporary office interior as an illustration of technical planning", body: "A framework for selecting an architecture that fits users, editors and operations.", tag: "Strategy", href: "/insights/choosing-a-digital-foundation", linkLabel: "Read guide" },
      { id: "speed", title: "Why performance is part of design", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085", imageAlt: "Laptop displaying code in a developer workspace", body: "How server rendering, animation and real measurements shape faster experiences.", tag: "Performance", href: "/insights/performance-is-part-of-design", linkLabel: "Read guide" },
      { id: "security", title: "Small security decisions with big impact", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31", imageAlt: "Server racks as an illustration of digital infrastructure", body: "Defensible defaults for permissions, API responses and safe deployment.", tag: "Security", href: "/insights/security-decisions-that-matter", linkLabel: "Read guide" },
      { id: "support", title: "Life after launch", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902", imageAlt: "Team collaborating in a technology workspace", body: "Monitoring, maintenance, incident response and measured iteration.", tag: "Operations", href: "/insights/life-after-launch", linkLabel: "Read guide" },
    ],
  }} />;
}
