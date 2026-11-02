import type { Metadata } from "next";
import { MarketingPage } from "@/components/marketing/MarketingPage";
import { WorkPhotoEditorial } from "@/components/marketing/WorkPhotoEditorial";

export const metadata: Metadata = {
  title: "Our Approach to Digital Work",
  description: "Explore the design, engineering and strategy disciplines behind professional digital products and online business experiences.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return <MarketingPage feature={<WorkPhotoEditorial />} data={{
    eyebrow: "PINCODE IT / OUR WORK",
    title: "Great digital work feels different.",
    intro: "Explore the craft behind considered digital experiences: thoughtful design, dependable development and a clear path from business challenge to useful product.",
    cta: "Every great outcome starts with a process.",
    exploreDescription: "The photographs here are free illustrative editorial images, not photographs of PINCODE IT staff or completed customer projects.",
    story: "work",
    cards: [
      { id: "design", title: "Digital experience design", body: "Create elegant, accessible interfaces that make navigation and decision-making easier for people.", tag: "DESIGN", href: "/services#web", linkLabel: "Explore expertise" },
      { id: "engineering", title: "Web & application engineering", body: "Build responsive, maintainable digital platforms with practical architecture and dependable functionality.", tag: "ENGINEERING", href: "/services", linkLabel: "Explore expertise" },
      { id: "strategy", title: "Planning and product thinking", body: "Translate business needs into clear priorities, realistic milestones and a coherent delivery roadmap.", tag: "STRATEGY", href: "/solutions", linkLabel: "Explore solutions" },
      { id: "support", title: "Reliability and long-term growth", body: "Help maintain, secure, optimize and improve the systems a business depends on after launch.", tag: "SUPPORT", href: "/services#support", linkLabel: "Explore support" },
    ],
  }} />;
}
