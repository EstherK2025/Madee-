import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/lib/journal";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return { title: "Article introuvable" };
  return { title: a.title, description: a.excerpt };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <article>
      <section className="pagehead">
        <div className="container">
          <p className="eyebrow">
            {article.category} · {article.date}
          </p>
          <h1 style={{ maxWidth: "18ch" }}>{article.title}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <p className="crumb">
            <Link href="/journal">Le Journal</Link> / {article.category}
          </p>
          <p style={{ fontSize: "1.15rem", color: "var(--ink)" }}>
            {article.excerpt}
          </p>
          {article.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <p style={{ marginTop: "2.4em" }}>
            <Link href="/journal" className="link-arrow">
              <span>←</span> Tous les articles
            </Link>
          </p>
        </div>
      </section>
    </article>
  );
}
