"use client";

import CategoryNav from "../components/CategoryNav";
import ProductGrid from "../components/ProductGrid";
import { products } from "@/lib/products";
import { useT } from "@/lib/i18n";

export default function BoutiquePage() {
  const t = useT();
  return (
    <>
      <section className="pagehead">
        <div className="container">
          <p className="eyebrow">{t("boutique.eyebrow")}</p>
          <h1>{t("boutique.title")}</h1>
          <p>{t("boutique.intro")}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <CategoryNav />
          <ProductGrid products={products} />
        </div>
      </section>
    </>
  );
}
