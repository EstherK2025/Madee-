"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";

export default function Header() {
  const { count, ready } = useCart();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  // Ferme le menu à chaque changement de page
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="nav container">
        <button
          className="nav__toggle"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className="nav__links nav__links--left">
          <li>
            <Link
              href="/boutique"
              className={isActive("/boutique") ? "is-active" : ""}
            >
              Boutique
            </Link>
          </li>
          <li>
            <Link
              href="/a-propos"
              className={isActive("/a-propos") ? "is-active" : ""}
            >
              La Maison
            </Link>
          </li>
          <li>
            <Link href="/#valeurs">Nos valeurs</Link>
          </li>
          <li>
            <Link
              href="/journal"
              className={isActive("/journal") ? "is-active" : ""}
            >
              Journal
            </Link>
          </li>
        </ul>

        <Link href="/" className="nav__logo" aria-label="Madee — accueil">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/madee-wordmark-green.png" alt="Madee" />
        </Link>

        <div className="nav__end">
          <Link href="/panier" className="nav__cart">
            Panier
            {ready && count > 0 && <b>{count}</b>}
          </Link>
        </div>
      </nav>
    </header>
  );
}
