import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader, SiteFooter } from "@/components/layout/SiteShell";
import { AgencyPageHero } from "@/components/marketing/AgencyPageHero";
import { insightArticles, getInsightArticle } from "@/lib/insight-articles";
import "@/components/marketing/legal.css";
import Image from "next/image";
import { pagePhotography, photo } from "@/lib/stock-photos";
import { PhotoMosaic } from "@/components/marketing/PhotoMosaic";
import "@/components/marketing/article-photo.css";

export const dynamicParams = false;
export function generateStaticParams() {
  return insightArticles.map(article => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.subtitle,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: { type: "article", title: article.title, description: article.subtitle },
  };
}

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getInsightArticle(slug);
  if (!article) notFound();

  return (
    <>
      <SiteHeader />
      <main id="main" className="agency-subpage">
        <AgencyPageHero
          headingId="agency-page-title"
          eyebrow={`PINCODE IT / ${article.category.toUpperCase()}`}
          title={article.title}
          description={article.subtitle}
          primary={{ label: "Read the guide", href: "#article-content", arrow: "↓" }}
          secondary={{ label: "All insights", href: "/insights", arrow: "↗" }}
          stages={["LEARN", "APPLY", "IMPROVE"]}
        />
        <div className="agency-article-image">
          <Image
            src={photo(pagePhotography.insights.cards[insightArticles.findIndex(item => item.slug === slug) % pagePhotography.insights.cards.length]).src}
            alt={photo(pagePhotography.insights.cards[insightArticles.findIndex(item => item.slug === slug) % pagePhotography.insights.cards.length]).alt}
            fill
            sizes="(max-width: 760px) 92vw, 75vw"
            loading="lazy"
            quality={68}
          />
        </div>
        <article id="article-content" className="agency-legal" aria-labelledby="agency-page-title">
          <p className="agency-legal-updated">{article.category} · {article.readingTime}</p>
          {article.sections.map((section, index) => (
            <section key={section.heading} aria-labelledby={`article-section-${index}`}>
              <h2 id={`article-section-${index}`}>{section.heading}</h2>
              {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
          <p><Link href="/insights">← View all insights</Link></p>
        </article>
        <PhotoMosaic page="insights" compact />
      </main>
      <SiteFooter />
    </>
  );
}
