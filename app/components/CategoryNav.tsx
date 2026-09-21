import Link from "next/link";
import { CATEGORIES } from "@/lib/products";

export default function CategoryNav({ active }: { active?: string }) {
  return (
    <nav className="catnav" aria-label="Catégories">
      <Link
        href="/boutique"
        className={`catnav__link ${!active ? "is-active" : ""}`}
      >
        Tout
      </Link>
      {CATEGORIES.map((c) => (
        <Link
          key={c.slug}
          href={`/boutique/${c.slug}`}
          className={`catnav__link ${active === c.slug ? "is-active" : ""}`}
        >
          {c.label}
        </Link>
      ))}
    </nav>
  );
}
