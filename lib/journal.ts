export type Article = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  swatch: "a" | "b" | "c" | "d" | "e" | "f";
  body: string[];
};

export const articles: Article[] = [
  {
    slug: "layering-modeste",
    category: "Style",
    title: "Superposer avec grâce : l'art du layering modeste",
    excerpt:
      "Trois façons d'habiller une abaya du matin au soir sans jamais perdre en élégance.",
    date: "Septembre 2026",
    swatch: "a",
    body: [
      "La superposition est le secret d'une garde-robe modeste qui ne se répète jamais. Une même abaya peut devenir dix tenues, selon ce qu'on glisse dessous, dessus et autour.",
      "Le matin, on garde les choses simples : l'abaya seule, ceinturée, avec un foulard en soie noué sur les cheveux. La ligne est nette, le geste rapide.",
      "L'après-midi, on ajoute une veste structurée aux épaules ou un gilet long qui prolonge la silhouette. Les matières dialoguent — un crêpe fluide sous une maille côtelée, un lin mat sous un satin discret.",
      "Le soir, on mise sur un accessoire fort : un foulard précieux, une broche, une couleur profonde. La modestie n'exclut jamais l'éclat ; elle le rend simplement plus intentionnel.",
    ],
  },
  {
    slug: "textiles-origines",
    category: "Culture",
    title: "Ces textiles qui racontent nos origines",
    excerpt:
      "Du bogolan au wax revisité : comment Madee tisse un dialogue entre les cultures.",
    date: "Août 2026",
    swatch: "c",
    body: [
      "Chaque tissu porte une mémoire. Chez Madee, nous puisons dans la richesse des textiles du monde pour créer des pièces qui rassemblent plutôt qu'elles ne cloisonnent.",
      "Le bogolan malien, teint à la boue fermentée, raconte une patience et un savoir-faire transmis de mère en fille. Le wax, adopté et réinventé à travers l'Afrique de l'Ouest, dit la circulation des motifs et des histoires.",
      "Nous ne copions pas ces héritages : nous les honorons, en travaillant avec des coupes contemporaines et des palettes sobres qui les laissent respirer. L'interculturel, pour nous, c'est un respect avant d'être une esthétique.",
      "Une pièce Madee peut ainsi réunir une drapé d'inspiration levantine, une couleur d'ocre saharien et une coupe résolument moderne. C'est cette conversation entre les mondes qui nous ressemble.",
    ],
  },
  {
    slug: "s-affirmer-en-douceur",
    category: "Femmes",
    title: "S'affirmer en douceur : portraits de nos clientes",
    excerpt:
      "Elles portent Madee et racontent ce que « se sentir soi » veut dire.",
    date: "Juillet 2026",
    swatch: "d",
    body: [
      "S'affirmer ne veut pas dire élever la voix. Pour beaucoup des femmes qui portent Madee, c'est d'abord se sentir en accord avec soi — pudique et puissante à la fois.",
      "« Longtemps, j'ai cru devoir choisir entre ma foi et mon style », nous confie l'une d'elles. « Madee m'a montré que je pouvais avoir les deux, sans compromis. »",
      "Une autre parle de confiance : celle de traverser une pièce sans se sentir jugée, parce que sa tenue dit exactement qui elle est. Ni plus, ni moins.",
      "Ces voix nous rappellent pourquoi nous créons. Habiller la femme noire pour qu'elle se sente décrite, vue et fière : c'est là toute notre raison d'être.",
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
