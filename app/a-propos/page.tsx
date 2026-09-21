import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";

export const metadata: Metadata = {
  title: "La Maison",
  description:
    "L'histoire de Madee : une maison de mode modeste et interculturelle qui célèbre la femme noire et son affirmation.",
};

export default function AProposPage() {
  return (
    <>
      <section className="pagehead">
        <div className="container">
          <p className="eyebrow">La Maison Madee</p>
          <h1>Notre histoire</h1>
          <p>
            Une mode qui honore votre foi, votre culture et votre force — sans
            jamais vous demander de choisir entre pudeur et élégance.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <Reveal as="p">
            Madee est née d'une conviction simple : la pudeur et l'élégance ne
            s'opposent pas. Nous dessinons des vêtements modestes et
            interculturels qui traversent les origines et rassemblent les
            femmes autour d'une même exigence de beauté et de dignité.
          </Reveal>

          <Reveal as="h2" delay={0.05}>
            Pensée pour la femme qui s'affirme
          </Reveal>
          <Reveal as="p" delay={0.05}>
            Chaque pièce est imaginée pour la femme noire qui veut s'affirmer :
            des coupes fluides, des matières nobles et des couleurs profondes
            qui subliment toutes les carnations. Se couvrir devient un geste de
            style, jamais un renoncement. Chez Madee, on ne se cache pas — on se
            révèle.
          </Reveal>

          <Reveal as="h2" delay={0.05}>
            Un dialogue entre les cultures
          </Reveal>
          <Reveal as="p" delay={0.05}>
            Nous puisons dans la richesse des cultures du monde — leurs
            textiles, leurs drapés, leurs savoir-faire — pour créer des pièces
            qui dialoguent et s'assemblent. Une garde-robe interculturelle, où
            chacune retrouve un peu de ses racines et beaucoup d'elle-même.
          </Reveal>

          <Reveal as="h2" delay={0.05}>
            Notre engagement
          </Reveal>
          <Reveal as="p" delay={0.05}>
            Des matières choisies avec soin, des coupes pensées pour durer, une
            fabrication respectueuse. Nous préférons des collections justes à
            des collections nombreuses. Fait avec soin, porté avec fierté.
          </Reveal>
        </div>
      </section>

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
            <div className="editorial__word">Écrivez-nous</div>
            <p>
              Une question, une envie, une collaboration ? Nous serions ravies
              d'échanger avec vous à{" "}
              <a href="mailto:bonjour@madee.com" style={{ color: "var(--gold-soft)" }}>
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
