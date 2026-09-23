"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n";

export default function AnnuleePage() {
  const t = useT();
  return (
    <section className="section">
      <div className="container">
        <div className="confirm">
          <div className="confirm__mark" style={{ background: "var(--green-700)" }}>
            ↺
          </div>
          <h1>{t("confirm.cancelTitle")}</h1>
          <p>{t("confirm.cancelP")}</p>
          <div className="hero__actions" style={{ justifyContent: "center" }}>
            <Link href="/panier" className="btn btn--solid">
              {t("confirm.backCart")}
            </Link>
            <Link href="/boutique" className="btn btn--ghost">
              {t("confirm.continue")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
