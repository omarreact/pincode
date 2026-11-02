import type { Metadata } from "next";
import { MarketingPage } from "@/components/MarketingPage";

export const metadata: Metadata = {
  title: "Selected Engineering Work & Public Projects",
  description: "Explore public PINCODE IT engineering projects and how we approach digital delivery. No fabricated client results or testimonials.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return <MarketingPage data={{
    eyebrow: "PINCODE IT / OUR WORK",
    title: "Proof belongs in the product.",
    intro: "Explore public engineering work, architecture and practical delivery approaches. Client references are shared only with permission.",
    cta: "Selected public engineering projects.",
    exploreDescription: "These are publicly accessible engineering repositories and examples, not claims of commissioned client projects or independently verified business outcomes.",
    story: "work", cards: [
      {
        id: "landbd",
        title: "LandBD — Bangladesh land information",
        body: "Public Next.js codebase for Bangladesh-focused land information, calculations and map-enabled workflows. Review the repository to see its architecture and current implementation status.",
        tag: "PUBLIC PROJECT",
        href: "https://github.com/omarreact/shohoz-jomir-hishab",
        linkLabel: "Review source",
      },
      {
        id: "pinai",
        title: "PinAI — developer AI workspace",
        body: "OpenAI-powered development workspace with authenticated chat, project tools and diagnostic workflows. Features and release readiness are documented in the public repository.",
        tag: "PUBLIC PROJECT",
        href: "https://github.com/omarreact/PinAI",
        linkLabel: "Review source",
      },
      {
        id: "pincode-site",
        title: "PINCODE IT — the public website",
        body: "The Next.js website you are using: shared React components, responsive marketing pages, domain tools and a publishing workflow backed by GitHub and Vercel.",
        tag: "THIS WEBSITE",
        href: "https://github.com/omarreact/pincode",
        linkLabel: "Review source",
      },
    ],
  }} />;
}
