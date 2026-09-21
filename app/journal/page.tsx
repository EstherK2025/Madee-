import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";
import { articles } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Le Journal",
  description:
    "Inspirations, art de porter et regards sur la mode modeste et interculturelle.",
};

export default function JournalPage() {
  return (
    <>
      <section className="pagehead">
        <div className="container">
          <p className="eyebrow">Le Journal</p>
          <h1>Inspirations &amp; art de porter</h1>
          <p>
            Nos regards sur la mode modeste, les cultures qui nous inspirent et
            les femmes qui portent Madee.
          </p>
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
                    {a.category} · {a.date}
                  </span>
                  <h3>{a.title}</h3>
                  <p>{a.excerpt}</p>
                  <span className="link-arrow">
                    Lire <span>→</span>
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
