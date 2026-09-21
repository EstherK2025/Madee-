import type { Metadata } from "next";
import ContactForm from "../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Une question, une envie, une collaboration ? Écrivez à la Maison Madee.",
};

export default function ContactPage() {
  return (
    <>
      <section className="pagehead">
        <div className="container">
          <p className="eyebrow">La Maison</p>
          <h1>Nous contacter</h1>
          <p>
            Une question sur une pièce, une commande, une envie de
            collaboration ? Nous serions ravies d'échanger avec vous.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact">
          <div className="contact__aside">
            <h2>Parlons-en</h2>
            <p>
              Nous répondons à chaque message avec attention, généralement sous
              24 à 48&nbsp;heures.
            </p>
            <div className="contact__block">
              <span className="contact__label">E-mail</span>
              <a className="inline-link" href="mailto:bonjour@madee.com">
                bonjour@madee.com
              </a>
            </div>
            <div className="contact__block">
              <span className="contact__label">Réseaux</span>
              <a
                className="inline-link"
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>{" "}
              ·{" "}
              <a
                className="inline-link"
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
              >
                Pinterest
              </a>{" "}
              ·{" "}
              <a
                className="inline-link"
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
              >
                TikTok
              </a>
            </div>
            <div className="contact__block">
              <span className="contact__label">Service client</span>
              Du lundi au vendredi, de 9h à 18h.
            </div>
          </div>

          <div className="contact__form-wrap">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
