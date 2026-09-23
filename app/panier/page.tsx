"use client";

import CartView from "../components/CartView";
import { useT } from "@/lib/i18n";

export default function PanierPage() {
  const t = useT();
  return (
    <section className="section">
      <div className="container">
        <div className="section-head" style={{ marginBottom: "2.4rem" }}>
          <p className="eyebrow">{t("cart.eyebrow")}</p>
          <h2>{t("cart.title")}</h2>
        </div>
        <CartView />
      </div>
    </section>
  );
}
