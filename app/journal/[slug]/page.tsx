import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/lib/journal";
import ArticleView from "../../components/ArticleView";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return { title: "Article" };
  return { title: a.title.fr, description: a.excerpt.fr };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  if (!getArticle(slug)) notFound();
  return <ArticleView slug={slug} />;
}
