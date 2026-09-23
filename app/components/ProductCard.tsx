"use client";

import Link from "next/link";
import type { Product } from "@/lib/products";
import { useLocale, loc } from "@/lib/i18n";
import { Price } from "@/lib/currency";
import ProductVisual from "./ProductVisual";

export default function ProductCard({ product }: { product: Product }) {
  const { t, locale } = useLocale();
  return (
    <Link href={`/produit/${product.slug}`} className="card">
      <div className="card__media">
        {product.isNew && <span className="card__badge">{t("common.new")}</span>}
        <ProductVisual product={product} />
        <span className="card__cta">{t("common.viewProduct")}</span>
      </div>
      <div className="card__info">
        <span className="cat">{t(`cat.${product.category}.label`)}</span>
        <h3>{product.name}</h3>
        <span className="card__price">
          <Price cents={product.price} />
        </span>
        <p>{loc(product.tagline, locale)}</p>
      </div>
    </Link>
  );
}
