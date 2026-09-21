import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryNav from "../../components/CategoryNav";
import ProductGrid from "../../components/ProductGrid";
import {
  CATEGORIES,
  getCategory,
  productsByCategorySlug,
} from "@/lib/products";

type Params = { params: Promise<{ categorie: string }> };

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ categorie: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { categorie } = await params;
  const cat = getCategory(categorie);
  if (!cat) return { title: "Catégorie introuvable" };
  return { title: cat.label, description: cat.intro };
}

export default async function CategoriePage({ params }: Params) {
  const { categorie } = await params;
  const cat = getCategory(categorie);
  if (!cat) notFound();

  const list = productsByCategorySlug(categorie);

  return (
    <>
      <section className="pagehead">
        <div className="container">
          <p className="eyebrow">Boutique</p>
          <h1>{cat.label}</h1>
          <p>{cat.intro}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <CategoryNav active={cat.slug} />
          <ProductGrid products={list} />
        </div>
      </section>
    </>
  );
}
