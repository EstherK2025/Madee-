// =============================================================
//  Catalogue Madee
//  Les prix sont en CENTIMES d'euro (ex. 18900 = 189,00 €).
//  `swatch` = variante visuelle de la vignette (dégradé) en
//  attendant de vraies photos produit dans /public.
//  Pour utiliser une vraie photo : renseignez `image` avec le
//  chemin du fichier placé dans /public (ex. "/produits/nour.jpg").
// =============================================================

export type Swatch = "a" | "b" | "c" | "d" | "e" | "f";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  price: number; // centimes
  category: "Abayas" | "Ensembles" | "Robes" | "Accessoires" | "Manteaux";
  swatch: Swatch;
  image?: string;
  badge?: string;
  sizes: string[];
  description: string;
  details: string[];
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "abaya-nour",
    name: "Abaya Nour",
    tagline: "Crêpe fluide, ceinture amovible",
    price: 18900,
    category: "Abayas",
    swatch: "a",
    badge: "Nouveauté",
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: true,
    description:
      "L'abaya signature de la collection Nour. Une coupe droite et enveloppante en crêpe fluide, rehaussée d'une ceinture amovible qui souligne la silhouette avec pudeur. Une pièce qui accompagne toutes vos journées, du matin au soir.",
    details: [
      "Crêpe de qualité supérieure, tombé fluide",
      "Ceinture assortie amovible",
      "Manches longues, coupe couvrante",
      "Longueur cheville",
      "Entretien : lavage à froid, séchage à plat",
    ],
  },
  {
    slug: "ensemble-sahar",
    name: "Ensemble Sahar",
    tagline: "Tunique & pantalon large assorti",
    price: 21500,
    category: "Ensembles",
    swatch: "b",
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: true,
    description:
      "Deux pièces, une allure. La tunique longue Sahar se porte sur un pantalon large assorti pour une élégance sans effort. Un ensemble pensé pour voyager entre les cultures et les occasions.",
    details: [
      "Tunique longue + pantalon large",
      "Tissu léger et respirant",
      "Coupe ample et couvrante",
      "Se porte ensemble ou séparément",
    ],
  },
  {
    slug: "robe-amara",
    name: "Robe Amara",
    tagline: "Lin lavé, manches longues plissées",
    price: 16800,
    category: "Robes",
    swatch: "c",
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: true,
    description:
      "La robe Amara célèbre la matière : un lin lavé aux reflets chauds, des manches longues délicatement plissées et une longueur maxi qui glisse à chaque pas. Modeste et lumineuse.",
    details: [
      "100 % lin lavé",
      "Manches longues plissées",
      "Longueur maxi",
      "Col montant boutonné",
    ],
  },
  {
    slug: "foulard-soie",
    name: "Foulard Soie",
    tagline: "Twill de soie, bords roulottés main",
    price: 5900,
    category: "Accessoires",
    swatch: "d",
    sizes: ["Taille unique"],
    description:
      "Un carré de twill de soie aux bords roulottés à la main. Le geste final qui sublime chaque tenue et se porte de mille façons — sur les cheveux, autour du cou, noué au sac.",
    details: [
      "100 % twill de soie",
      "Bords roulottés à la main",
      "90 × 90 cm",
      "Coffret cadeau offert",
    ],
  },
  {
    slug: "manteau-layla",
    name: "Manteau Layla",
    tagline: "Laine mélangée, coupe cocon",
    price: 29500,
    category: "Manteaux",
    swatch: "e",
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: true,
    description:
      "Le manteau Layla vous enveloppe d'une chaleur feutrée. Une coupe cocon en laine mélangée, des lignes épurées et une longueur généreuse pour rester élégante quand le froid s'installe.",
    details: [
      "Laine mélangée, doublure satinée",
      "Coupe cocon oversize",
      "Longueur mi-mollet",
      "Deux poches latérales",
    ],
  },
  {
    slug: "ensemble-jour",
    name: "Ensemble Jour",
    tagline: "Maille côtelée, essentiel du quotidien",
    price: 14200,
    category: "Ensembles",
    swatch: "f",
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "L'essentiel confortable qui ne quitte plus votre garde-robe. Un ensemble en maille côtelée douce, à la fois couvrant et près du corps sans jamais serrer. Le confort élevé au rang d'élégance.",
    details: [
      "Maille côtelée extensible",
      "Haut manches longues + jupe longue",
      "Douceur seconde peau",
      "Se coordonne avec toute la collection",
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function featuredProducts(): Product[] {
  return products.filter((p) => p.featured);
}
