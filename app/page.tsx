"use client";

import Link from "next/link";
import Reveal from "./components/Reveal";
import ProductCard from "./components/ProductCard";
import { featuredProducts } from "@/lib/products";
import { useT } from "@/lib/i18n";

export default function HomePage() {
  const t = useT();
  const featured = featuredProducts();

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero__grid">
            <div className="hero__content">
              <Reveal as="p" className="eyebrow">
                {t("home.hero.eyebrow")}
              </Reveal>
              <h1 className="hero__title">
                <span>{t("home.hero.title1")}</span>
                <span>
                  <em>{t("home.hero.title2")}</em>
                </span>
              </h1>
              <Reveal as="p" delay={0.1} className="hero__lead">
                {t("home.hero.lead")}
              </Reveal>
              <Reveal delay={0.18} className="hero__actions">
                <Link href="/boutique" className="btn btn--solid">
                  {t("home.hero.cta1")}
                </Link>
                <Link href="/a-propos" className="btn btn--ghost">
                  {t("home.hero.cta2")}
                </Link>
              </Reveal>
              <Reveal delay={0.32} className="hero__trust">
                <span>{t("home.trust.shipping")}</span>
                <span>{t("home.trust.secure")}</span>
                <span>{t("home.trust.returns")}</span>
              </Reveal>
            </div>
            <div className="hero__panel">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="hero__wordmark" src="/madee-wordmark-cream.png" alt="Madee" />
            </div>
          </div>
        </div>
      </section>

      {/* Film */}
      <section className="campaign">
        <video
          className="campaign__video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/madee-logo-cream.jpg"
        >
          <source src="/madee-campaign.mp4" type="video/mp4" />
        </video>
        <div className="campaign__overlay" aria-hidden="true" />
        <div className="container campaign__content">
          <Reveal as="p" className="eyebrow">
            {t("home.film.eyebrow")}
          </Reveal>
          <Reveal as="h2" delay={0.08}>
            {t("home.film.title1")} <em>{t("home.film.title2")}</em>
          </Reveal>
          <Reveal delay={0.16}>
            <Link href="/boutique" className="btn btn--cream">
              {t("home.film.cta")}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="maison section" id="maison">
        <div className="container maison__grid">
          <Reveal className="maison__visual">
            <div className="maison__frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="maison__wordmark" src="/madee-wordmark-cream.png" alt="Madee" />
              <span className="maison__tag">Est. 2026</span>
            </div>
          </Reveal>
          <div className="maison__text">
            <Reveal as="p" className="eyebrow">
              {t("home.story.eyebrow")}
            </Reveal>
            <Reveal as="h2" delay={0.08}>
              {t("home.story.title")}
            </Reveal>
            <Reveal as="p" delay={0.14}>
              {t("home.story.p1")}
            </Reveal>
            <Reveal as="p" delay={0.2}>
              {t("home.story.p2")}
            </Reveal>
            <Reveal as="ul" delay={0.26} className="maison__stats">
              <li>
                <strong>{t("home.story.s1n")}</strong>
                <span>{t("home.story.s1l")}</span>
              </li>
              <li>
                <strong>{t("home.story.s2n")}</strong>
                <span>{t("home.story.s2l")}</span>
              </li>
              <li>
                <strong>{t("home.story.s3n")}</strong>
                <span>{t("home.story.s3l")}</span>
              </li>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Signature */}
      <section className="valeurs section" id="valeurs">
        <div className="container">
          <div className="section-head">
            <Reveal as="p" className="eyebrow">
              {t("home.sig.eyebrow")}
            </Reveal>
            <Reveal as="h2" delay={0.08}>
              {t("home.sig.title")}
            </Reveal>
          </div>
          <div className="valeurs__grid">
            <Reveal as="article" className="value">
              <h3>{t("home.sig.v1t")}</h3>
              <p>{t("home.sig.v1p")}</p>
            </Reveal>
            <Reveal as="article" delay={0.1} className="value">
              <h3>{t("home.sig.v2t")}</h3>
              <p>{t("home.sig.v2p")}</p>
            </Reveal>
            <Reveal as="article" delay={0.2} className="value">
              <h3>{t("home.sig.v3t")}</h3>
              <p>{t("home.sig.v3p")}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Sélection */}
      <section className="section" id="collections">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <Reveal as="p" className="eyebrow">
                {t("home.selection.eyebrow")}
              </Reveal>
              <Reveal as="h2" delay={0.08}>
                {t("home.selection.title")}
              </Reveal>
            </div>
            <Reveal delay={0.16}>
              <Link href="/boutique" className="link-arrow">
                {t("home.selection.link")} <span>→</span>
              </Link>
            </Reveal>
          </div>
          <div className="products-grid">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.06}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Éditorial */}
      <section className="editorial section">
        <div className="container editorial__grid">
          <div className="editorial__text">
            <Reveal as="p" className="eyebrow">
              {t("home.editorial.eyebrow")}
            </Reveal>
            <Reveal as="blockquote" delay={0.08}>
              {t("home.editorial.quote")}
            </Reveal>
            <Reveal as="p" delay={0.16} className="editorial__sign">
              {t("home.editorial.sign")}
            </Reveal>
          </div>
          <Reveal delay={0.1} className="editorial__panel">
            <div className="editorial__word">{t("home.editorial.word")}</div>
            <p>{t("home.editorial.text")}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
