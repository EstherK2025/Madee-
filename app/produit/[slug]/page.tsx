import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import ProductVisual from "../../components/ProductVisual";
import AddToCart from "../../components/AddToCart";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Pièce introuvable" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <section className="section">
      <div className="container">
        <p className="crumb">
          <Link href="/boutique">Boutique</Link> / {product.category} /{" "}
          {product.name}
        </p>

        <div className="product">
          <div className="product__media">
            <ProductVisual product={product} />
          </div>

          <div className="product__detail">
            <p className="product__cat">{product.category}</p>
            <h1 className="product__title">{product.name}</h1>
            <p className="product__price">{formatPrice(product.price)}</p>
            <p className="product__desc">{product.description}</p>

            <AddToCart product={product} />

            <div className="product__details">
              <h4>Détails de la pièce</h4>
              <ul>
                {product.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
