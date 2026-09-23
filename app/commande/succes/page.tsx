"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useT } from "@/lib/i18n";

export default function SuccesPage() {
  const { clear } = useCart();
  const t = useT();

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <section className="section">
      <div className="container">
        <div className="confirm">
          <div className="confirm__mark">✓</div>
          <h1>{t("confirm.successTitle")}</h1>
          <p>{t("confirm.successP1")}</p>
          <p>{t("confirm.successP2")}</p>
          <div className="hero__actions" style={{ justifyContent: "center" }}>
            <Link href="/boutique" className="btn btn--solid">
              {t("confirm.continue")}
            </Link>
            <Link href="/" className="btn btn--ghost">
              {t("confirm.home")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
