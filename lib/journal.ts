import type { L } from "./i18n";

export type Article = {
  slug: string;
  category: L;
  title: L;
  excerpt: L;
  date: L;
  swatch: "a" | "b" | "c" | "d" | "e" | "f";
  body: L[];
};

export const articles: Article[] = [
  {
    slug: "layering-modeste",
    category: { fr: "Style", en: "Style", ar: "أناقة" },
    date: { fr: "Septembre 2026", en: "September 2026", ar: "سبتمبر 2026" },
    title: {
      fr: "Superposer avec grâce : l'art du layering",
      en: "Layering with grace: the art of dressing in layers",
      ar: "التنسيق بأناقة: فنّ الطبقات",
    },
    excerpt: {
      fr: "Trois façons d'habiller une silhouette du matin au soir sans jamais perdre en élégance.",
      en: "Three ways to style a silhouette from morning to evening without losing any elegance.",
      ar: "ثلاث طرق لتنسيق إطلالتك من الصباح إلى المساء دون أن تفقدي أناقتك.",
    },
    swatch: "a",
    body: [
      {
        fr: "La superposition est le secret d'une garde-robe qui ne se répète jamais. Une même pièce peut devenir dix tenues, selon ce qu'on glisse dessous, dessus et autour.",
        en: "Layering is the secret of a wardrobe that never repeats itself. A single piece can become ten outfits, depending on what you slip under, over and around it.",
        ar: "التنسيق بالطبقات هو سرّ خزانة لا تتكرّر أبدًا. قطعة واحدة يمكن أن تصبح عشر إطلالات، حسب ما ترتدينه تحتها وفوقها وحولها.",
      },
      {
        fr: "Le matin, on garde les choses simples : une pièce fluide, ceinturée, avec un foulard en soie. La ligne est nette, le geste rapide.",
        en: "In the morning, keep it simple: a fluid piece, belted, with a silk scarf. The line is clean, the gesture quick.",
        ar: "في الصباح، أبقي الأمور بسيطة: قطعة انسيابية بحزام ووشاح حريري. الخط صافٍ والحركة سريعة.",
      },
      {
        fr: "Le soir, on mise sur un accessoire fort : un foulard précieux, une couleur profonde. La modestie n'exclut jamais l'éclat ; elle le rend plus intentionnel.",
        en: "In the evening, bet on a strong accessory: a precious scarf, a deep colour. Modesty never excludes radiance; it makes it more intentional.",
        ar: "في المساء، راهني على إكسسوار قوي: وشاح ثمين أو لون غامق. الاحتشام لا يمنع التألّق أبدًا؛ بل يجعله أكثر قصدًا.",
      },
    ],
  },
  {
    slug: "matieres-nobles",
    category: { fr: "Matières", en: "Fabrics", ar: "أقمشة" },
    date: { fr: "Août 2026", en: "August 2026", ar: "أغسطس 2026" },
    title: {
      fr: "Ces matières qui font la différence",
      en: "The fabrics that make the difference",
      ar: "الأقمشة التي تصنع الفرق",
    },
    excerpt: {
      fr: "Du crêpe au lin lavé : comment le choix des tissus définit une élégance durable.",
      en: "From crêpe to washed linen: how the choice of fabrics defines a lasting elegance.",
      ar: "من الكريب إلى الكتان المغسول: كيف يحدّد اختيار الأقمشة أناقة تدوم.",
    },
    swatch: "c",
    body: [
      {
        fr: "Une belle pièce commence par une belle matière. Chez Madee, nous choisissons des tissus au tombé maîtrisé, agréables sur la peau et pensés pour durer.",
        en: "A beautiful piece begins with a beautiful fabric. At Madee, we choose materials with a mastered drape, pleasant on the skin and made to last.",
        ar: "القطعة الجميلة تبدأ بقماش جميل. في مادي، نختار أقمشة بانسدال متقن، لطيفة على البشرة ومصمّمة لتدوم.",
      },
      {
        fr: "Le crêpe apporte du mouvement, le lin lavé une nonchalance chic, le satin une lumière discrète. Chaque matière raconte une intention.",
        en: "Crêpe brings movement, washed linen a chic nonchalance, satin a discreet glow. Every fabric tells an intention.",
        ar: "الكريب يمنح الحركة، والكتان المغسول أناقة عفوية، والساتان بريقًا خفيًا. كل قماش يروي نيّة.",
      },
      {
        fr: "Investir dans la matière, c'est investir dans le temps : des pièces qui vieillissent bien et se transmettent.",
        en: "To invest in fabric is to invest in time: pieces that age well and are passed on.",
        ar: "الاستثمار في القماش هو استثمار في الزمن: قطع تتقادم بجمال وتُتوارث.",
      },
    ],
  },
  {
    slug: "s-affirmer-en-douceur",
    category: { fr: "Femmes", en: "Women", ar: "نساء" },
    date: { fr: "Juillet 2026", en: "July 2026", ar: "يوليو 2026" },
    title: {
      fr: "S'affirmer en douceur : portraits de nos clientes",
      en: "Quiet confidence: portraits of our clients",
      ar: "ثقة هادئة: صور من عميلاتنا",
    },
    excerpt: {
      fr: "Elles portent Madee et racontent ce que « se sentir soi » veut dire.",
      en: "They wear Madee and share what “feeling like yourself” means.",
      ar: "يرتدين مادي ويروين ما يعنيه «الشعور بأنك أنت».",
    },
    swatch: "d",
    body: [
      {
        fr: "S'affirmer ne veut pas dire élever la voix. Pour beaucoup des femmes qui portent Madee, c'est d'abord se sentir en accord avec soi.",
        en: "Confidence doesn't mean raising your voice. For many of the women who wear Madee, it first means feeling at peace with themselves.",
        ar: "الثقة لا تعني رفع الصوت. بالنسبة لكثير من النساء اللواتي يرتدين مادي، تعني أولًا الانسجام مع الذات.",
      },
      {
        fr: "« Je me sens élégante sans effort », nous confie l'une d'elles. « Comme si le vêtement me laissait toute la place. »",
        en: "“I feel effortlessly elegant,” one of them tells us. “As if the garment left all the space to me.”",
        ar: "«أشعر بأناقة دون عناء»، تخبرنا إحداهنّ. «وكأن الثوب يترك لي كل المساحة.»",
      },
      {
        fr: "Ces voix nous rappellent pourquoi nous créons : habiller chaque femme pour qu'elle se sente vue, belle et pleinement elle-même.",
        en: "These voices remind us why we create: to dress every woman so she feels seen, beautiful and fully herself.",
        ar: "هذه الأصوات تذكّرنا لماذا نبدع: أن نُلبس كل امرأة لتشعر بأنها مرئية وجميلة وهي بالكامل.",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
