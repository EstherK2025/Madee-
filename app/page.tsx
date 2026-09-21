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
                Mode modeste · Interculturelle
              </Reveal>
              <h1 className="hero__title">
                <span>Se couvrir,</span>
                <span>
                  <em>s'affirmer.</em>
                </span>
              </h1>
              <Reveal as="p" delay={0.1} className="hero__lead">
                Madee habille la femme qui s'affirme. Des tenues pudiques et
                précises, pensées pour célébrer la beauté de la femme noire et
                lui offrir le confort d'être pleinement elle-même.
              </Reveal>
              <Reveal delay={0.18} className="hero__actions">
                <Link href="/boutique" className="btn btn--solid">
                  Voir la collection
                </Link>
                <Link href="/a-propos" className="btn btn--ghost">
                  La Maison
                </Link>
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

      {/* Statement */}
      <section className="statement">
        <div className="container statement__inner">
          <Reveal as="h2">
            La pudeur n'est pas une limite. <em>C'est une signature.</em>
          </Reveal>
        </div>
      </section>

      {/* La Maison */}
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
              La Maison
            </Reveal>
            <Reveal as="h2" delay={0.08}>
              Une mode qui vous ressemble, sans vous demander de choisir.
            </Reveal>
            <Reveal as="p" delay={0.14}>
              Madee est née d'une conviction simple : la pudeur et l'élégance ne
              s'opposent pas. Nous créons des vêtements modestes et
              interculturels qui traversent les origines et rassemblent les
              femmes autour d'une même exigence de beauté et de dignité.
            </Reveal>
            <Reveal as="p" delay={0.2}>
              Des coupes nettes, des matières nobles et des couleurs profondes
              qui subliment toutes les carnations. Se couvrir devient un geste
              de style, jamais un renoncement.
            </Reveal>
            <Reveal as="ul" delay={0.26} className="maison__stats">
              <li>
                <strong>2026</strong>
                <span>Première collection</span>
              </li>
              <li>
                <strong>100%</strong>
                <span>Coupes pudiques</span>
              </li>
              <li>
                <strong>∞</strong>
                <span>Cultures célébrées</span>
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
              <h3>Modestie choisie</h3>
              <p>
                Des vêtements couvrants et confortables qui laissent parler
                votre présence, pas votre exposition. La pudeur comme liberté.
              </p>
            </Reveal>
            <Reveal as="article" delay={0.1} className="value">
              <h3>Racines interculturelles</h3>
              <p>
                Nous puisons dans la richesse des cultures du monde pour créer
                des pièces qui dialoguent, s'assemblent et vous appartiennent.
              </p>
            </Reveal>
            <Reveal as="article" delay={0.2} className="value">
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
                Collection Nour
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
              Le manifeste
            </Reveal>
            <Reveal as="blockquote" delay={0.08}>
              « Se couvrir n'a jamais voulu dire se cacher. Chaque drapé est une
              déclaration : je suis pudique, je suis puissante, je suis
              pleinement moi. »
            </Reveal>
            <Reveal as="p" delay={0.16} className="editorial__sign">
              — L'équipe Madee
            </Reveal>
          </div>
          <Reveal delay={0.1} className="editorial__panel">
            <div className="editorial__word">Madee.</div>
            <p>
              Un nom, une promesse : celle d'une garde-robe qui honore votre
              foi, votre culture et votre force, sans compromis sur le style.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
