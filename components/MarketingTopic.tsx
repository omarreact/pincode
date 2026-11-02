import Link from "next/link";

export type MarketingTopicData = {
  id?: string;
  title: string;
  body: string;
  tag?: string;
};

type TopicProps = { topic: MarketingTopicData; index: number };

function topicId(topic: MarketingTopicData, index: number) {
  return topic.id ?? "topic-" + (index + 1);
}

/** Index link and content card share a stable anchor ID across marketing routes. */
export function MarketingTopicLink({ topic, index }: TopicProps) {
  return (
    <a
      href={`#${topicId(topic, index)}`}
      className="agency-index-link"
      data-site-motion="card"
    >
      <span className="agency-index-number">{String(index + 1).padStart(2, "0")}</span>
      <span>{topic.title}</span>
      <span className="agency-index-arrow" aria-hidden="true">↗</span>
    </a>
  );
}

export function MarketingTopicCard({
  topic,
  index,
  total,
}: TopicProps & { total: number }) {
  return (
    <article
      id={topicId(topic, index)}
      className="agency-detail-card"
      data-site-motion="card"
    >
      <div className="agency-card-top">
        <span className="agency-card-number">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span className="agency-card-tag">{topic.tag ?? "FOCUS"}</span>
      </div>
      <div className="agency-card-symbol" aria-hidden="true"><span>↗</span></div>
      <h3>{topic.title}</h3>
      <p>{topic.body}</p>
      <Link href="/contact" className="agency-card-link">
        Discuss this <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}
