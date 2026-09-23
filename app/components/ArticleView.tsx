"use client";

import Link from "next/link";
import { getArticle } from "@/lib/journal";
import { useLocale, loc } from "@/lib/i18n";

export default function ArticleView({ slug }: { slug: string }) {
  const { t, locale } = useLocale();
  const article = getArticle(slug);
  if (!article) return null;

  return (
    <article>
      <section className="pagehead">
        <div className="container">
          <p className="eyebrow">
            {loc(article.category, locale)} · {loc(article.date, locale)}
          </p>
          <h1 style={{ maxWidth: "18ch" }}>{loc(article.title, locale)}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <p className="crumb">
            <Link href="/journal">{t("journal.eyebrow")}</Link> /{" "}
            {loc(article.category, locale)}
          </p>
          <p style={{ fontSize: "1.15rem", color: "var(--ink)" }}>
            {loc(article.excerpt, locale)}
          </p>
          {article.body.map((p, i) => (
            <p key={i}>{loc(p, locale)}</p>
          ))}
          <p style={{ marginTop: "2.4em" }}>
            <Link href="/journal" className="link-arrow">
              <span>←</span> {t("journal.all")}
            </Link>
          </p>
        </div>
      </section>
    </article>
  );
}
