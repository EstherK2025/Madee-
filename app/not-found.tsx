"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n";

export default function NotFound() {
  const t = useT();
  return (
    <section className="section">
      <div className="container">
        <div className="confirm">
          <h1>{t("notfound.title")}</h1>
          <p>{t("notfound.text")}</p>
          <div className="hero__actions" style={{ justifyContent: "center" }}>
            <Link href="/" className="btn btn--solid">{t("notfound.home")}</Link>
            <Link href="/boutique" className="btn btn--ghost">{t("notfound.shop")}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
