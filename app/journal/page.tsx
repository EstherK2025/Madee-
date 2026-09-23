"use client";

import Link from "next/link";
import Reveal from "../components/Reveal";
import { articles } from "@/lib/journal";
import { useLocale, loc } from "@/lib/i18n";

export default function JournalPage() {
  const { t, locale } = useLocale();
  return (
    <>
      <section className="pagehead">
        <div className="container">
          <p className="eyebrow">{t("journal.eyebrow")}</p>
          <h1>{t("journal.title")}</h1>
          <p>{t("journal.intro")}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="journal-grid">
            {articles.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 0.08}>
                <Link href={`/journal/${a.slug}`} className="post">
                  <div className={`post__media sw-${a.swatch}`}>
                    <span className="pvisual__name">Madee</span>
                  </div>
                  <span className="post__cat">
                    {loc(a.category, locale)} · {loc(a.date, locale)}
                  </span>
                  <h3>{loc(a.title, locale)}</h3>
                  <p>{loc(a.excerpt, locale)}</p>
                  <span className="link-arrow">
                    {t("journal.read")} <span>→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
