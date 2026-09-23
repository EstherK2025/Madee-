"use client";

import ContactForm from "../components/ContactForm";
import { useT } from "@/lib/i18n";

export default function ContactPage() {
  const t = useT();
  return (
    <>
      <section className="pagehead">
        <div className="container">
          <p className="eyebrow">{t("contact.eyebrow")}</p>
          <h1>{t("contact.title")}</h1>
          <p>{t("contact.intro")}</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact">
          <div className="contact__aside">
            <h2>{t("contact.asideTitle")}</h2>
            <p>{t("contact.asideText")}</p>
            <div className="contact__block">
              <span className="contact__label">{t("contact.email")}</span>
              <a className="inline-link" href="mailto:bonjour@madee.com">bonjour@madee.com</a>
            </div>
            <div className="contact__block">
              <span className="contact__label">{t("contact.social")}</span>
              <a className="inline-link" href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>{" "}·{" "}
              <a className="inline-link" href="https://pinterest.com" target="_blank" rel="noreferrer">Pinterest</a>{" "}·{" "}
              <a className="inline-link" href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a>
            </div>
            <div className="contact__block">
              <span className="contact__label">{t("contact.service")}</span>
              {t("contact.serviceHours")}
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
