import Link from "next/link";
import type { MarketingTopicData } from "./MarketingTopic";
import "./marketing-visual-stage.css";

export type MarketingStory = "services" | "solutions" | "work" | "about" | "insights";

const stories: Record<MarketingStory, {
  eyebrow: string;
  heading: string;
  description: string;
  footnote: string;
  action: string;
  href: string;
}> = {
  services: {
    eyebrow: "DESIGN × ENGINEERING × CARE",
    heading: "More than a list of services.",
    description: "Thoughtful design, reliable engineering and long-term support belong to the same conversation. Explore how the capabilities connect.",
    footnote: "From first idea to working product",
    action: "Explore our work",
    href: "/work",
  },
  solutions: {
    eyebrow: "BUSINESS NEEDS / PRACTICAL SYSTEMS",
    heading: "Start with the problem. Build the right thing.",
    description: "A useful digital platform should have a clear purpose, understandable decisions and room to evolve with the people who use it.",
    footnote: "Define · Design · Deliver",
    action: "Discuss your project",
    href: "/contact",
  },
  work: {
    eyebrow: "PUBLIC WORK / OPEN ENGINEERING",
    heading: "Explore real work, not inflated claims.",
    description: "Review public source code and the decisions behind our engineering projects. What you see here is publicly inspectable, not an invented client portfolio.",
    footnote: "Public repositories · No invented metrics",
    action: "See all projects",
    href: "#explore",
  },
  about: {
    eyebrow: "PEOPLE / PROCESS / PURPOSE",
    heading: "Good technology starts with clear thinking.",
    description: "We believe that practical scope, thoughtful communication and reliable delivery matter more than impressive jargon.",
    footnote: "Clarity · Craft · Continuity",
    action: "Start a conversation",
    href: "/contact",
  },
  insights: {
    eyebrow: "FIELD NOTES / USEFUL IDEAS",
    heading: "Ideas should lead to better decisions.",
    description: "Read practical guides on building, securing and maintaining digital experiences. Each article is designed to be useful beyond this page.",
    footnote: "Strategy · Performance · Security",
    action: "Browse the guides",
    href: "#explore",
  },
};

function VisualStageTopic({ topic, index }: { topic: MarketingTopicData; index: number }) {
  const destination = topic.href ?? `#${topic.id ?? "explore"}`;
  const inner = (
    <>
      <span className="agency-story-number">{String(index + 1).padStart(2, "0")}</span>
      <span className="agency-story-item-copy">
        <small>{topic.tag ?? "EXPLORE"}</small>
        <strong>{topic.title}</strong>
      </span>
      <span className="agency-story-arrow" aria-hidden="true">↗</span>
    </>
  );

  if (destination.startsWith("https://")) {
    return <a className="agency-story-topic" href={destination} target="_blank" rel="noopener noreferrer">{inner}</a>;
  }
  if (destination.startsWith("#")) {
    return <a className="agency-story-topic" href={destination}>{inner}</a>;
  }
  return <Link className="agency-story-topic" href={destination}>{inner}</Link>;
}

/**
 * A lightweight, server-rendered visual feature shared by marketing routes.
 * No image downloads, counters, extra hydration or large animated layers.
 */
export function MarketingVisualStage({
  variant,
  topics,
}: {
  variant: MarketingStory;
  topics: MarketingTopicData[];
}) {
  const story = stories[variant];

  return (
    <section className="agency-story-stage" data-variant={variant} aria-labelledby="agency-story-heading">
      <div className="agency-story-shell">
        <div className="agency-story-copy">
          <span className="agency-story-eyebrow"><span className="agency-story-pulse" aria-hidden="true" />{story.eyebrow}</span>
          <h2 id="agency-story-heading">{story.heading}</h2>
          <p>{story.description}</p>
          <Link className="agency-story-action" href={story.href}>
            {story.action} <span aria-hidden="true">↗</span>
          </Link>
          <span className="agency-story-footnote">{story.footnote}</span>
        </div>
        <div className="agency-story-board">
          <div className="agency-story-board-head">
            <span className="agency-story-board-dots" aria-hidden="true"><i /><i /><i /></span>
            <span>PINCODE IT / EXPLORE</span>
            <span aria-hidden="true">✦</span>
          </div>
          <div className="agency-story-orbit" aria-hidden="true">
            <span className="agency-story-orbit-ring" />
            <span className="agency-story-orbit-core">P</span>
            <span className="agency-story-orbit-node agency-story-orbit-node-one" />
            <span className="agency-story-orbit-node agency-story-orbit-node-two" />
          </div>
          <div className="agency-story-topics">
            {topics.slice(0, 3).map((topic, index) => (
              <VisualStageTopic topic={topic} index={index} key={topic.id ?? topic.title} />
            ))}
          </div>
          <div className="agency-story-board-footer">
            <span>EXPLORE THE WORK</span>
            <span aria-hidden="true">— 01 / 03</span>
          </div>
        </div>
      </div>
    </section>
  );
}
