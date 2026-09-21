import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products, primaryImage } from "@/lib/products";
import ProductDetail from "../../components/ProductDetail";

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
    openGraph: { images: [primaryImage(product)] },
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
        <ProductDetail product={product} />
      </div>
    </section>
  );
}
