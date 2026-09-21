import Link from "next/link";
import Reveal from "./Reveal";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/products";

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="empty">
        <h2>Bientôt disponible</h2>
        <p>Cette catégorie s'enrichit très prochainement. Revenez vite !</p>
        <Link href="/boutique" className="btn btn--solid">
          Voir toute la boutique
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
