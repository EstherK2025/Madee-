import Link from "next/link";
import Marquee from "./components/Marquee";
import Reveal from "./components/Reveal";
import ProductCard from "./components/ProductCard";
import { featuredProducts } from "@/lib/products";

export default function HomePage() {
  const featured = featuredProducts();

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true">
          <div className="hero__orb hero__orb--1" />
          <div className="hero__orb hero__orb--2" />
        </div>
        <div className="hero__inner container">
          <Reveal as="p" className="eyebrow">
            Mode modeste · Interculturelle · Depuis 2026
          </Reveal>
          <h1 className="hero__title">
            <Reveal as="span" delay={0.05}>
              L'élégance modeste,
            </Reveal>
            <Reveal as="span" delay={0.15} className="hero__title-em">
              réinventée.
            </Reveal>
          </h1>
          <Reveal as="p" delay={0.28} className="hero__lead">
            Madee habille la femme qui s'affirme. Des tenues pudiques et
            raffinées, pensées pour célébrer la beauté de la femme noire et lui
            offrir le confort d'être pleinement elle-même.
          </Reveal>
          <Reveal delay={0.4} className="hero__actions">
            <Link href="/boutique" className="btn btn--solid">
              Découvrir la collection
            </Link>
            <Link href="/a-propos" className="btn btn--ghost">
              Notre histoire
            </Link>
          </Reveal>
        </div>
      </section>

      <Marquee />

      {/* La Maison */}
      <section className="maison section" id="maison">
        <div className="container maison__grid">
          <Reveal className="maison__visual">
            <div className="maison__frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/madee-logo-cream.jpg"
                alt="Le logo Madee sur fond vert profond"
              />
            </div>
            <span className="maison__tag">Est. 2026</span>
          </Reveal>
          <div className="maison__text">
            <Reveal as="p" className="eyebrow">
              La Maison Madee
            </Reveal>
            <Reveal as="h2" delay={0.08}>
              Une mode qui vous ressemble, sans jamais vous demander de choisir.
            </Reveal>
            <Reveal as="p" delay={0.16}>
              Madee est née d'une conviction simple : la pudeur et l'élégance ne
              s'opposent pas. Nous créons des vêtements modestes, interculturels,
              qui traversent les origines et rassemblent les femmes autour d'une
              même exigence de beauté et de dignité.
            </Reveal>
            <Reveal as="p" delay={0.24}>
              Chaque pièce est pensée pour la femme noire qui veut s'affirmer :
              des coupes fluides, des matières nobles et des couleurs profondes
              qui subliment toutes les carnations.
            </Reveal>
            <Reveal as="ul" delay={0.32} className="maison__stats">
              <li>
                <strong>100%</strong>
                <span>Coupes pudiques &amp; raffinées</span>
              </li>
              <li>
                <strong>∞</strong>
                <span>Cultures célébrées</span>
              </li>
              <li>
                <strong>1</strong>
                <span>Femme : vous</span>
              </li>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="valeurs section" id="valeurs">
        <div className="container">
          <div className="section-head">
            <Reveal as="p" className="eyebrow">
              Ce qui nous anime
            </Reveal>
            <Reveal as="h2" delay={0.08}>
              Trois piliers, une même femme
            </Reveal>
          </div>
          <div className="valeurs__grid">
            <Reveal as="article" className="value">
              <span className="value__num">01</span>
              <h3>Modestie choisie</h3>
              <p>
                Des vêtements couvrants et confortables qui laissent parler votre
                présence, pas votre exposition. La pudeur comme liberté.
              </p>
            </Reveal>
            <Reveal as="article" delay={0.12} className="value">
              <span className="value__num">02</span>
              <h3>Racines interculturelles</h3>
              <p>
                Nous puisons dans la richesse des cultures du monde pour créer
                des pièces qui dialoguent, s'assemblent et vous appartiennent.
              </p>
            </Reveal>
            <Reveal as="article" delay={0.24} className="value">
              <span className="value__num">03</span>
              <h3>Affirmation de soi</h3>
              <p>
                Habiller la femme noire pour qu'elle se sente décrite, vue et
                fière. Une garde-robe qui affirme, sans jamais crier.
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
                La Collection Nour
              </Reveal>
              <Reveal as="h2" delay={0.08}>
                Des pièces qui vous enveloppent de lumière
              </Reveal>
            </div>
            <Reveal delay={0.16}>
              <Link href="/boutique" className="link-arrow">
                Voir toute la boutique <span>→</span>
              </Link>
            </Reveal>
          </div>
          <div className="products-grid">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.08}>
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
              Le manifeste
            </Reveal>
            <Reveal as="blockquote" delay={0.08}>
              « Se couvrir n'a jamais voulu dire se cacher. Chez Madee, chaque
              drapé est une déclaration : je suis pudique, je suis puissante, je
              suis pleinement moi. »
            </Reveal>
            <Reveal as="p" delay={0.16} className="editorial__sign">
              — L'équipe Madee
            </Reveal>
          </div>
          <Reveal delay={0.1} className="editorial__panel">
            <div className="editorial__word">Madee.</div>
            <p>
              Un nom, une promesse : celle d'une garde-robe qui honore votre foi,
              votre culture et votre force, sans compromis sur le style.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
