import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";

export const metadata: Metadata = {
  title: "La Maison",
  description:
    "L'histoire de Madee : créer des pièces élégantes qui permettent à chaque femme de se sentir belle, confiante et pleinement elle-même.",
};

export default function AProposPage() {
  return (
    <>
      <section className="pagehead">
        <div className="container">
          <p className="eyebrow">À propos de Madee</p>
          <h1>Notre histoire</h1>
          <p>
            L'élégance, autrement — des silhouettes pensées pour révéler votre
            allure.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <Reveal as="p">
            Madee est née d'une vision simple : créer des pièces élégantes qui
            permettent à chaque femme de se sentir belle, confiante et
            pleinement elle-même.
          </Reveal>

          <Reveal as="h2" delay={0.05}>
            Une élégance intemporelle
          </Reveal>
          <Reveal as="p" delay={0.05}>
            Chaque silhouette est pensée avec soin, de la coupe aux détails,
            pour créer une élégance qui traverse les saisons. Nous préférons
            les pièces justes aux pièces nombreuses : des matières nobles, des
            lignes épurées, des finitions maîtrisées.
          </Reveal>

          <Reveal as="h2" delay={0.05}>
            La collection
          </Reveal>
          <Reveal as="p" delay={0.05}>
            Des silhouettes qui parlent d'elles-mêmes. Nos modèles sont imaginés
            pour celles qui recherchent une mode élégante, féminine et
            sophistiquée — la femme qui apprécie la simplicité, le raffinement
            et le caractère.
          </Reveal>

          <Reveal as="h2" delay={0.05}>
            Notre promesse
          </Reveal>
          <Reveal as="p" delay={0.05}>
            Un nom, une promesse : celle d'une garde-robe qui révèle votre
            allure sans jamais élever la voix. Fait avec soin, porté avec
            fierté.
          </Reveal>
        </div>
      </section>

      <section className="editorial section">
        <div className="container editorial__grid">
          <div className="editorial__text">
            <Reveal as="p" className="eyebrow">
              Le mot de la maison
            </Reveal>
            <Reveal as="blockquote" delay={0.08}>
              « L'élégance, autrement : une évidence dans chaque geste, un
              raffinement dans chaque détail. »
            </Reveal>
            <Reveal as="p" delay={0.16} className="editorial__sign">
              — Madee
            </Reveal>
          </div>
          <Reveal delay={0.1} className="editorial__panel">
            <div className="editorial__word">Écrivez-nous</div>
            <p>
              Une question, une envie, une collaboration ? Nous serions ravies
              d'échanger avec vous à{" "}
              <a
                href="mailto:bonjour@madee.com"
                style={{ color: "var(--paper)", textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                bonjour@madee.com
              </a>
              .
            </p>
            <p style={{ marginTop: "1.4em" }}>
              <Link href="/boutique" className="btn btn--cream">
                Découvrir la collection
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
