"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n";

export default function Footer() {
  const t = useT();
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/madee-wordmark-cream.png" alt="Madee" className="footer__logo" />
          <p>{t("footer.tagline")}</p>
        </div>
        <nav className="footer__col">
          <h4>{t("footer.shop")}</h4>
          <Link href="/boutique/nouveautes">{t("footer.newIn")}</Link>
          <Link href="/boutique/ensembles">{t("footer.ensembles")}</Link>
          <Link href="/boutique/hauts">{t("footer.hauts")}</Link>
          <Link href="/boutique">{t("footer.allCollection")}</Link>
        </nav>
        <nav className="footer__col">
          <h4>{t("footer.house")}</h4>
          <Link href="/a-propos">{t("footer.ourStory")}</Link>
          <Link href="/#valeurs">{t("footer.values")}</Link>
          <Link href="/contact">{t("footer.contact")}</Link>
        </nav>
        <nav className="footer__col">
          <h4>{t("footer.help")}</h4>
          <Link href="/contact">{t("footer.contact")}</Link>
          <Link href="/livraison-retours">{t("footer.shipping")}</Link>
          <Link href="/guide-des-tailles">{t("footer.sizeGuide")}</Link>
        </nav>
        <nav className="footer__col">
          <h4>{t("footer.follow")}</h4>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://pinterest.com" target="_blank" rel="noreferrer">Pinterest</a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a>
        </nav>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} Madee. {t("footer.rights")}</span>
        <span>{t("footer.legal")}</span>
      </div>
    </footer>
  );
}
