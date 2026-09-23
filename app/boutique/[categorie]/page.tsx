import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORY_SLUGS, isCategorySlug } from "@/lib/products";
import { DICT } from "@/lib/dictionaries";
import CategoryView from "../../components/CategoryView";

type Params = { params: Promise<{ categorie: string }> };

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((c) => ({ categorie: c }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { categorie } = await params;
  const c = (DICT.fr as any).cat?.[categorie];
  if (!c) return { title: "Catégorie" };
  return { title: c.label, description: c.intro };
}

export default async function CategoriePage({ params }: Params) {
  const { categorie } = await params;
  if (!isCategorySlug(categorie)) notFound();
  return <CategoryView slug={categorie} />;
}
