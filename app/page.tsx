import Link from "next/link";
import Reveal from "./components/Reveal";
import ProductCard from "./components/ProductCard";
import { featuredProducts } from "@/lib/products";

export default function HomePage() {
  const featured = featuredProducts();

  return (
    <>
      {/* Hero — split éditorial */}
      <section className="hero">
        <div className="container">
          <div className="hero__grid">
            <div className="hero__content">
              <Reveal as="p" className="eyebrow">
                Première collection
              </Reveal>
              <h1 className="hero__title">
                <span>L'élégance,</span>
                <span>
                  <em>autrement.</em>
                </span>
              </h1>
              <Reveal as="p" delay={0.1} className="hero__lead">
                Des silhouettes pensées pour révéler votre allure. Découvrez
                notre première collection, imaginée pour la femme qui apprécie
                la simplicité, le raffinement et le caractère.
              </Reveal>
              <Reveal delay={0.18} className="hero__actions">
                <Link href="/boutique" className="btn btn--solid">
                  Voir la collection
                </Link>
                <Link href="/a-propos" className="btn btn--ghost">
                  La Maison
                </Link>
              </Reveal>
              <Reveal delay={0.32} className="hero__trust">
                <span>Livraison offerte dès 150&nbsp;€</span>
                <span>Paiement sécurisé</span>
                <span>Retours 30 jours</span>
              </Reveal>
            </div>
            <div className="hero__panel">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="hero__wordmark"
                src="/madee-wordmark-cream.png"
                alt="Madee"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Film de campagne */}
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
            La collection
          </Reveal>
          <Reveal as="h2" delay={0.08}>
            Des silhouettes <em>qui parlent d'elles-mêmes.</em>
          </Reveal>
          <Reveal delay={0.16}>
            <Link href="/boutique" className="btn btn--cream">
              Découvrir la collection
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
              <img
                className="maison__wordmark"
                src="/madee-wordmark-cream.png"
                alt="Le logo Madee sur fond vert profond"
              />
              <span className="maison__tag">Est. 2026</span>
            </div>
          </Reveal>
          <div className="maison__text">
            <Reveal as="p" className="eyebrow">
              Notre histoire
            </Reveal>
            <Reveal as="h2" delay={0.08}>
              Madee est née d'une vision simple.
            </Reveal>
            <Reveal as="p" delay={0.14}>
              Créer des pièces élégantes qui permettent à chaque femme de se
              sentir belle, confiante et pleinement elle-même.
            </Reveal>
            <Reveal as="p" delay={0.2}>
              Chaque silhouette est pensée avec soin, de la coupe aux détails,
              pour créer une élégance intemporelle.
            </Reveal>
            <Reveal as="ul" delay={0.26} className="maison__stats">
              <li>
                <strong>2026</strong>
                <span>Première collection</span>
              </li>
              <li>
                <strong>∞</strong>
                <span>Élégance intemporelle</span>
              </li>
              <li>
                <strong>100%</strong>
                <span>Pensé avec soin</span>
              </li>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Signature — Simplicité, raffinement, caractère */}
      <section className="valeurs section" id="valeurs">
        <div className="container">
          <div className="section-head">
            <Reveal as="p" className="eyebrow">
              Notre signature
            </Reveal>
            <Reveal as="h2" delay={0.08}>
              Simplicité, raffinement, caractère
            </Reveal>
          </div>
          <div className="valeurs__grid">
            <Reveal as="article" className="value">
              <h3>Simplicité</h3>
              <p>
                Des lignes épurées, une évidence dans chaque geste. La
                simplicité comme forme la plus aboutie de l'élégance.
              </p>
            </Reveal>
            <Reveal as="article" delay={0.1} className="value">
              <h3>Raffinement</h3>
              <p>
                Des matières nobles et des finitions soignées, de la coupe au
                moindre détail. Le luxe se cache dans la précision.
              </p>
            </Reveal>
            <Reveal as="article" delay={0.2} className="value">
              <h3>Caractère</h3>
              <p>
                Des silhouettes qui affirment une présence. Pour la femme qui
                sait ce qu'elle veut et le porte avec allure.
              </p>
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
                La collection
              </Reveal>
              <Reveal as="h2" delay={0.08}>
                La sélection
              </Reveal>
            </div>
            <Reveal delay={0.16}>
              <Link href="/boutique" className="link-arrow">
                Toute la boutique <span>→</span>
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
              La collection
            </Reveal>
            <Reveal as="blockquote" delay={0.08}>
              « Des silhouettes qui parlent d'elles-mêmes — imaginées pour
              celles qui recherchent une mode élégante, féminine et
              sophistiquée. »
            </Reveal>
            <Reveal as="p" delay={0.16} className="editorial__sign">
              — Madee
            </Reveal>
          </div>
          <Reveal delay={0.1} className="editorial__panel">
            <div className="editorial__word">Madee.</div>
            <p>
              Un nom, une promesse : celle d'une élégance intemporelle, pensée
              dans le moindre détail pour révéler votre allure.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
