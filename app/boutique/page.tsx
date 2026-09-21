import type { Metadata } from "next";
import Reveal from "../components/Reveal";
import ProductCard from "../components/ProductCard";
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
          <p className="eyebrow">La Collection Nour</p>
          <h1>La Boutique</h1>
          <p>
            Chaque pièce est pensée pour vous couvrir avec grâce et vous
            révéler avec fierté. Des matières nobles, des coupes fluides, une
            élégance qui vous ressemble.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="products-grid">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.08}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
