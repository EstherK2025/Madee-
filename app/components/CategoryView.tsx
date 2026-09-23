"use client";

import CategoryNav from "./CategoryNav";
import ProductGrid from "./ProductGrid";
import { productsByCategorySlug } from "@/lib/products";
import { useT } from "@/lib/i18n";

export default function CategoryView({ slug }: { slug: string }) {
  const t = useT();
  const list = productsByCategorySlug(slug);
  return (
    <>
      <section className="pagehead">
        <div className="container">
          <p className="eyebrow">{t("nav.boutique")}</p>
          <h1>{t(`cat.${slug}.label`)}</h1>
          <p>{t(`cat.${slug}.intro`)}</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <CategoryNav active={slug} />
          <ProductGrid products={list} />
        </div>
      </section>
    </>
  );
}
