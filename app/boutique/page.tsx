import type { Metadata } from "next";
import CategoryNav from "../components/CategoryNav";
import ProductGrid from "../components/ProductGrid";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "Découvrez toute la collection Madee : abayas, ensembles, robes, manteaux et accessoires modestes et raffinés.",
};

export default function BoutiquePage() {
  return (
    <>
      <section className="pagehead">
        <div className="container">
          <p className="eyebrow">La collection</p>
          <h1>La Boutique</h1>
          <p>
            Des silhouettes qui parlent d'elles-mêmes. Nos modèles, imaginés
            pour celles qui recherchent une mode élégante, féminine et
            sophistiquée.
          </p>
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
