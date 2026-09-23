"use client";

import Link from "next/link";
import { CATEGORY_SLUGS } from "@/lib/products";
import { useT } from "@/lib/i18n";

export default function CategoryNav({ active }: { active?: string }) {
  const t = useT();
  return (
    <nav className="catnav" aria-label="Catégories">
      <Link
        href="/boutique"
        className={`catnav__link ${!active ? "is-active" : ""}`}
      >
        {t("cat.all")}
      </Link>
      {CATEGORY_SLUGS.map((slug) => (
        <Link
          key={slug}
          href={`/boutique/${slug}`}
          className={`catnav__link ${active === slug ? "is-active" : ""}`}
        >
          {t(`cat.${slug}.label`)}
        </Link>
      ))}
    </nav>
  );
}
