"use client";

import Link from "next/link";
import Reveal from "../components/Reveal";
import { useT } from "@/lib/i18n";

export default function AProposPage() {
  const t = useT();
  return (
    <>
      <section className="pagehead">
        <div className="container">
          <p className="eyebrow">{t("apropos.eyebrow")}</p>
          <h1>{t("apropos.title")}</h1>
          <p>{t("apropos.lead")}</p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <Reveal as="p">{t("apropos.p0")}</Reveal>
          <Reveal as="h2" delay={0.05}>{t("apropos.h1")}</Reveal>
          <Reveal as="p" delay={0.05}>{t("apropos.p1")}</Reveal>
          <Reveal as="h2" delay={0.05}>{t("apropos.h2")}</Reveal>
          <Reveal as="p" delay={0.05}>{t("apropos.p2")}</Reveal>
          <Reveal as="h2" delay={0.05}>{t("apropos.h3")}</Reveal>
          <Reveal as="p" delay={0.05}>{t("apropos.p3")}</Reveal>
        </div>
      </section>

      <section className="editorial section">
        <div className="container editorial__grid">
          <div className="editorial__text">
            <Reveal as="p" className="eyebrow">{t("apropos.quoteEyebrow")}</Reveal>
            <Reveal as="blockquote" delay={0.08}>{t("apropos.quote")}</Reveal>
            <Reveal as="p" delay={0.16} className="editorial__sign">— Madee</Reveal>
          </div>
          <Reveal delay={0.1} className="editorial__panel">
            <div className="editorial__word">{t("apropos.writeUs")}</div>
            <p>
              {t("apropos.writeText")}{" "}
              <a
                href="mailto:bonjour@madee.com"
                style={{ color: "var(--paper)", textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                bonjour@madee.com
              </a>
              .
            </p>
            <p style={{ marginTop: "1.4em" }}>
              <Link href="/boutique" className="btn btn--cream">{t("common.discover")}</Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
