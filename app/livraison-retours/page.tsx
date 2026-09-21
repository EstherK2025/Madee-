import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Livraison & retours",
  description:
    "Délais, frais et conditions de livraison et de retour des commandes Madee.",
};

export default function LivraisonRetoursPage() {
  return (
    <>
      <section className="pagehead">
        <div className="container">
          <p className="eyebrow">Aide</p>
          <h1>Livraison &amp; retours</h1>
          <p>
            Tout ce qu'il faut savoir pour recevoir et, si besoin, renvoyer vos
            pièces Madee en toute sérénité.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <h2>Livraison</h2>
          <p>
            Vos commandes sont préparées avec soin et expédiées sous 2 jours
            ouvrés. Vous recevez un e-mail avec votre numéro de suivi dès que
            votre colis quitte notre atelier.
          </p>
          <ul className="infolist">
            <li>
              <strong>Livraison offerte</strong> dès 150&nbsp;€ d'achat.
            </li>
            <li>
              <strong>France métropolitaine</strong> — 4,90&nbsp;€, 2 à 4 jours
              ouvrés.
            </li>
            <li>
              <strong>Belgique, Suisse, Luxembourg</strong> — 9,90&nbsp;€, 3 à 6
              jours ouvrés.
            </li>
            <li>
              <strong>Canada &amp; International</strong> — calculé au moment du
              paiement, 5 à 10 jours ouvrés.
            </li>
          </ul>
          <p>
            Les éventuels droits de douane hors Union européenne sont à la
            charge du destinataire.
          </p>

          <h2>Retours &amp; échanges</h2>
          <p>
            Une pièce ne vous convient pas ? Vous disposez de{" "}
            <strong>30 jours</strong> après réception pour nous la retourner.
            Les articles doivent être non portés, non lavés, avec leur
            étiquette d'origine.
          </p>
          <ul className="infolist">
            <li>
              <strong>Retours gratuits</strong> en France métropolitaine.
            </li>
            <li>Remboursement sous 5 à 7 jours après réception du colis.</li>
            <li>
              Échange de taille possible, sous réserve de disponibilité de la
              pièce.
            </li>
          </ul>
          <p>
            Pour lancer un retour ou un échange, écrivez-nous à{" "}
            <a
              className="inline-link"
              href="mailto:bonjour@madee.com"
            >
              bonjour@madee.com
            </a>{" "}
            en précisant votre numéro de commande — nous vous guidons pas à pas.
          </p>

          <p style={{ marginTop: "2.4em" }}>
            <Link href="/contact" className="btn btn--solid">
              Une question ? Contactez-nous
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
