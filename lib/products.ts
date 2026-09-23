import type { L } from "./i18n";

// =============================================================
//  Catalogue Madee — contenus localisés (fr / en / ar).
//  Prix en CENTIMES d'EURO (base de conversion multi-devises).
// =============================================================

export type ColorVariant = {
  name: L;
  hex: string;
  images: string[];
};

export type CategorySlug = "ensembles" | "hauts";

export type Product = {
  slug: string;
  name: string; // nom de marque, non traduit
  tagline: L;
  price: number; // centimes EUR
  category: CategorySlug;
  isNew?: boolean;
  sizes: string[];
  description: L;
  details: L[];
  colors: ColorVariant[];
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "ensemble-nour",
    name: "Ensemble Nour",
    tagline: {
      fr: "Chemise oversize & pantalon large",
      en: "Oversized shirt & wide-leg trousers",
      ar: "قميص واسع وبنطال فضفاض",
    },
    price: 21500,
    category: "ensembles",
    isNew: true,
    featured: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: {
      fr: "L'ensemble signature de la collection : une chemise oversize au tombé fluide et un pantalon large assorti, dans une gaze de coton froissée d'une douceur rare. Couvrant, aérien, pensé pour vous accompagner du matin au soir.",
      en: "The collection's signature set: an oversized shirt with a fluid drape and matching wide-leg trousers, in a rare, soft crinkled cotton gauze. Covering, airy, made to take you from morning to evening.",
      ar: "طقم المجموعة المميّز: قميص واسع بانسيابية ناعمة وبنطال فضفاض مطابق، من شاش قطني مجعّد بنعومة نادرة. ساتر وخفيف، مصمّم ليرافقك من الصباح إلى المساء.",
    },
    details: [
      { fr: "Gaze de coton froissée", en: "Crinkled cotton gauze", ar: "شاش قطني مجعّد" },
      { fr: "Chemise oversize + pantalon large", en: "Oversized shirt + wide-leg trousers", ar: "قميص واسع + بنطال فضفاض" },
      { fr: "Se porte ensemble ou séparément", en: "Wear together or separately", ar: "يُرتدى معًا أو منفصلًا" },
      { fr: "Coupe couvrante et fluide", en: "Covering, fluid cut", ar: "قصّة ساترة وانسيابية" },
    ],
    colors: [
      { name: { fr: "Crème", en: "Cream", ar: "كريمي" }, hex: "#e9e2d3", images: ["/produits/ensemble-nour.jpg", "/produits/ensemble-nour-detail.jpg"] },
    ],
  },
  {
    slug: "ensemble-sahar",
    name: "Ensemble Sahar",
    tagline: {
      fr: "Veste ceinturée & pantalon palazzo",
      en: "Belted jacket & palazzo trousers",
      ar: "سترة بحزام وبنطال بالازو",
    },
    price: 24500,
    category: "ensembles",
    featured: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: {
      fr: "Une veste-chemise structurée à la taille ceinturée, portée sur un pantalon palazzo aux plis profonds. L'allure d'un tailleur, la liberté d'une tenue fluide.",
      en: "A structured shirt-jacket cinched at the waist, worn over deep-pleated palazzo trousers. The look of a suit, the freedom of a fluid outfit.",
      ar: "سترة-قميص منسّقة مشدودة عند الخصر، تُرتدى فوق بنطال بالازو بطيّات عميقة. أناقة البدلة وحرّية الإطلالة الانسيابية.",
    },
    details: [
      { fr: "Tissu à reflets subtils", en: "Fabric with subtle sheen", ar: "قماش بلمعان خفيف" },
      { fr: "Veste ceinturée + pantalon palazzo", en: "Belted jacket + palazzo trousers", ar: "سترة بحزام + بنطال بالازو" },
      { fr: "Épaules structurées, taille marquée", en: "Structured shoulders, marked waist", ar: "أكتاف منسّقة وخصر محدّد" },
      { fr: "Grandes jambes plissées", en: "Wide pleated legs", ar: "أرجل واسعة مطويّة" },
    ],
    colors: [
      { name: { fr: "Anthracite", en: "Charcoal", ar: "فحمي" }, hex: "#565049", images: ["/produits/ensemble-sahar.jpg", "/produits/ensemble-sahar-detail.jpg"] },
    ],
  },
  {
    slug: "ensemble-amara",
    name: "Ensemble Amara",
    tagline: {
      fr: "Veste col montant & pantalon large",
      en: "High-neck jacket & wide-leg trousers",
      ar: "سترة برقبة عالية وبنطال فضفاض",
    },
    price: 23500,
    category: "ensembles",
    featured: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: {
      fr: "Une veste à col montant et taille resserrée par un jeu de fronces, associée à un pantalon large impeccablement tombant. Le raffinement d'une ligne épurée, dans une teinte chocolat profonde.",
      en: "A high-neck jacket gathered at the waist, paired with impeccably draping wide-leg trousers. The refinement of a clean line, in a deep chocolate tone.",
      ar: "سترة برقبة عالية وخصر مجمّع بطيّات، مع بنطال فضفاض بانسدال متقن. رقيّ الخط الصافي بدرجة شوكولاتة غامقة.",
    },
    details: [
      { fr: "Sergé mat de qualité supérieure", en: "Premium matte twill", ar: "تويل مطفأ فاخر" },
      { fr: "Veste col montant, fronces à la taille", en: "High-neck jacket, gathered waist", ar: "سترة برقبة عالية وخصر مجمّع" },
      { fr: "Pantalon large taille haute", en: "High-waisted wide trousers", ar: "بنطال فضفاض بخصر عالٍ" },
      { fr: "Doublure satinée", en: "Satin lining", ar: "بطانة ساتان" },
    ],
    colors: [
      { name: { fr: "Chocolat", en: "Chocolate", ar: "شوكولاتة" }, hex: "#4a3a2d", images: ["/produits/ensemble-amara.jpg", "/produits/ensemble-amara-detail.jpg"] },
    ],
  },
  {
    slug: "haut-amina",
    name: "Haut Amina",
    tagline: {
      fr: "Maille drapée asymétrique",
      en: "Asymmetric draped knit",
      ar: "تريكو منسدل غير متماثل",
    },
    price: 12900,
    category: "hauts",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: {
      fr: "Un haut en maille fine au drapé asymétrique qui glisse sur la silhouette et crée un mouvement sculptural. Manches courtes, col montant : la simplicité élevée au rang de statement.",
      en: "A fine-knit top with an asymmetric drape that glides over the silhouette and creates a sculptural movement. Short sleeves, high neck: simplicity turned into a statement.",
      ar: "بلوزة تريكو ناعمة بانسدال غير متماثل تنساب على القوام وتخلق حركة نحتية. أكمام قصيرة ورقبة عالية: بساطة ترتقي إلى بيان أناقة.",
    },
    details: [
      { fr: "Maille fine extensible", en: "Fine stretch knit", ar: "تريكو ناعم مطّاطي" },
      { fr: "Drapé asymétrique", en: "Asymmetric drape", ar: "انسدال غير متماثل" },
      { fr: "Col montant, manches courtes", en: "High neck, short sleeves", ar: "رقبة عالية وأكمام قصيرة" },
      { fr: "Se porte rentré ou sur le pantalon", en: "Wear tucked or over trousers", ar: "يُرتدى داخل البنطال أو فوقه" },
    ],
    colors: [
      { name: { fr: "Rouge", en: "Red", ar: "أحمر" }, hex: "#c8452b", images: ["/produits/haut-amina.jpg", "/produits/haut-amina-detail.jpg"] },
    ],
  },
  {
    slug: "haut-yara",
    name: "Haut Yara",
    tagline: {
      fr: "Tunique longue, détail dentelle",
      en: "Long tunic, lace detail",
      ar: "تونيك طويل بتفصيل دانتيل",
    },
    price: 13900,
    category: "hauts",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: {
      fr: "Une tunique longue en satin lavé, fendue et rehaussée d'un empiècement de dentelle qui apporte une touche de délicatesse. Manches amples, longueur enveloppante.",
      en: "A long washed-satin tunic, side-slit and enhanced with a lace panel that adds a delicate touch. Full sleeves, an enveloping length.",
      ar: "تونيك طويل من الساتان المغسول، بفتحة جانبية ومزيّن بقطعة دانتيل تضيف لمسة رقيقة. أكمام واسعة وطول يغلّف القوام.",
    },
    details: [
      { fr: "Satin lavé, empiècement dentelle", en: "Washed satin, lace panel", ar: "ساتان مغسول وقطعة دانتيل" },
      { fr: "Manches amples, longueur tunique", en: "Full sleeves, tunic length", ar: "أكمام واسعة بطول تونيك" },
      { fr: "Fente latérale", en: "Side slit", ar: "فتحة جانبية" },
      { fr: "Coupe couvrante", en: "Covering cut", ar: "قصّة ساترة" },
    ],
    colors: [
      { name: { fr: "Jaune tendre", en: "Soft yellow", ar: "أصفر فاتح" }, hex: "#e7d98f", images: ["/produits/haut-yara.jpg", "/produits/haut-yara-detail.jpg"] },
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

// Catégories : slugs uniquement (les libellés/intros sont traduits via le dictionnaire).
export const CATEGORY_SLUGS = ["nouveautes", "ensembles", "hauts"] as const;
export type NavCategory = (typeof CATEGORY_SLUGS)[number];

export function isCategorySlug(slug: string): slug is NavCategory {
  return (CATEGORY_SLUGS as readonly string[]).includes(slug);
}

export function productsByCategorySlug(slug: string): Product[] {
  if (slug === "nouveautes") return products;
  return products.filter((p) => p.category === slug);
}
