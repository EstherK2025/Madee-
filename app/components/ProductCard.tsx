import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import ProductVisual from "./ProductVisual";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/produit/${product.slug}`} className="card">
      <div className="card__media">
        {product.badge && <span className="card__badge">{product.badge}</span>}
        <ProductVisual product={product} />
        <span className="card__cta">Découvrir</span>
      </div>
      <div className="card__info">
        <span className="cat">{product.category}</span>
        <h3>{product.name}</h3>
        <span className="card__price">{formatPrice(product.price)}</span>
        <p>{product.tagline}</p>
      </div>
    </Link>
  );
}
