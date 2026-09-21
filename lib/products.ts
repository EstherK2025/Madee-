// =============================================================
//  Catalogue Madee
//  Prix en CENTIMES d'euro (18900 = 189,00 €).
//  Chaque produit a un ou plusieurs coloris ; chaque coloris a
//  une ou plusieurs images (photo portée, vue détail, packshot…).
//  Pour ajouter un coloris : dupliquez un objet dans `colors`
//  avec son nom, sa pastille `hex` et ses `images` (dans /public).
// =============================================================

export type ColorVariant = {
  name: string;
  hex: string;
  images: string[];
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  price: number; // centimes
  category: "Ensembles" | "Hauts" | "Robes" | "Pantalons" | "Accessoires";
  badge?: string;
  sizes: string[];
  description: string;
  details: string[];
  colors: ColorVariant[];
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "ensemble-nour",
    name: "Ensemble Nour",
    tagline: "Chemise oversize & pantalon large",
    price: 21500,
    category: "Ensembles",
    badge: "Nouveauté",
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: true,
    description:
      "L'ensemble signature de la collection : une chemise oversize au tombé fluide et un pantalon large assorti, dans une gaze de coton froissée d'une douceur rare. Couvrant, aérien, pensé pour vous accompagner du matin au soir.",
    details: [
      "Gaze de coton froissée",
      "Chemise oversize + pantalon large",
      "Se porte ensemble ou séparément",
      "Coupe couvrante et fluide",
      "Entretien : lavage à froid, séchage à plat",
    ],
    colors: [
      {
        name: "Crème",
        hex: "#e9e2d3",
        images: ["/produits/ensemble-nour.jpg", "/produits/ensemble-nour-detail.jpg"],
      },
    ],
  },
  {
    slug: "ensemble-sahar",
    name: "Ensemble Sahar",
    tagline: "Veste ceinturée & pantalon palazzo",
    price: 24500,
    category: "Ensembles",
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: true,
    description:
      "Une veste-chemise structurée à la taille ceinturée, portée sur un pantalon palazzo aux plis profonds. L'allure d'un tailleur, la liberté d'une tenue fluide. Une pièce forte pour s'affirmer avec élégance.",
    details: [
      "Tissu à reflets subtils",
      "Veste ceinturée + pantalon palazzo",
      "Épaules structurées, taille marquée",
      "Grandes jambes plissées",
    ],
    colors: [
      {
        name: "Anthracite",
        hex: "#565049",
        images: ["/produits/ensemble-sahar.jpg", "/produits/ensemble-sahar-detail.jpg"],
      },
    ],
  },
  {
    slug: "ensemble-amara",
    name: "Ensemble Amara",
    tagline: "Veste col montant & pantalon large",
    price: 23500,
    category: "Ensembles",
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: true,
    description:
      "Une veste à col montant et taille resserrée par un jeu de fronces, associée à un pantalon large impeccablement tombant. Le raffinement d'une ligne épurée, dans une teinte chocolat profonde qui sublime toutes les carnations.",
    details: [
      "Sergé mat de qualité supérieure",
      "Veste col montant, fronces à la taille",
      "Pantalon large taille haute",
      "Doublure satinée",
    ],
    colors: [
      {
        name: "Chocolat",
        hex: "#4a3a2d",
        images: ["/produits/ensemble-amara.jpg", "/produits/ensemble-amara-detail.jpg"],
      },
    ],
  },
  {
    slug: "haut-amina",
    name: "Haut Amina",
    tagline: "Maille drapée asymétrique",
    price: 12900,
    category: "Hauts",
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Un haut en maille fine au drapé asymétrique qui glisse sur la silhouette et crée un mouvement sculptural. Manches courtes, col montant : la simplicité élevée au rang de statement. Superbe sur un pantalon large.",
    details: [
      "Maille fine extensible",
      "Drapé asymétrique",
      "Col montant, manches courtes",
      "Se porte rentré ou sur le pantalon",
    ],
    colors: [
      {
        name: "Rouge",
        hex: "#c8452b",
        images: ["/produits/haut-amina.jpg", "/produits/haut-amina-detail.jpg"],
      },
    ],
  },
  {
    slug: "haut-yara",
    name: "Haut Yara",
    tagline: "Tunique longue, détail dentelle",
    price: 13900,
    category: "Hauts",
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Une tunique longue en satin lavé, fendue et rehaussée d'un empiècement de dentelle qui apporte une touche de délicatesse. Manches amples, longueur enveloppante : à porter sur un jean large ou un pantalon fluide.",
    details: [
      "Satin lavé, empiècement dentelle",
      "Manches amples, longueur tunique",
      "Fente latérale",
      "Coupe couvrante",
    ],
    colors: [
      {
        name: "Jaune tendre",
        hex: "#e7d98f",
        images: ["/produits/haut-yara.jpg", "/produits/haut-yara-detail.jpg"],
      },
    ],
  },
];

export function primaryImage(p: Product): string {
  return p.colors[0].images[0];
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function featuredProducts(): Product[] {
  return products.filter((p) => p.featured);
}

// --- Catégories ---
export type Category = { slug: string; label: string; intro: string };

export const CATEGORIES: Category[] = [
  {
    slug: "nouveautes",
    label: "Nouveautés",
    intro: "Les dernières pièces de la collection, tout juste arrivées.",
  },
  {
    slug: "ensembles",
    label: "Ensembles",
    intro: "Deux pièces, une allure — coordonnées et faciles à porter.",
  },
  {
    slug: "hauts",
    label: "Hauts",
    intro: "Tuniques, hauts drapés et pièces qui subliment le quotidien.",
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function productsByCategorySlug(slug: string): Product[] {
  if (slug === "nouveautes") return products;
  const cat = getCategory(slug);
  if (!cat) return [];
  return products.filter((p) => p.category === cat.label);
}
