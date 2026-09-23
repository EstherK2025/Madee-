"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import ProductCard from "./ProductCard";
import { useT } from "@/lib/i18n";
import type { Product } from "@/lib/products";

export default function ProductGrid({ products }: { products: Product[] }) {
  const t = useT();
  if (products.length === 0) {
    return (
      <div className="empty">
        <h2>{t("boutique.soonTitle")}</h2>
        <p>{t("boutique.soonText")}</p>
        <Link href="/boutique" className="btn btn--solid">
          {t("boutique.soonCta")}
        </Link>
      </div>
    );
  }
  return (
    <div className="products-grid">
      {products.map((p, i) => (
        <Reveal key={p.slug} delay={(i % 3) * 0.06}>
          <ProductCard product={p} />
        </Reveal>
      ))}
    </div>
  );
}
