import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader, SiteFooter } from "@/components/SiteShell";
import { AgencyPageHero } from "@/components/AgencyPageHero";
import { insightArticles, getInsightArticle } from "@/lib/insight-articles";
import "@/components/legal.css";

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
      </main>
      <SiteFooter />
    </>
  );
}
