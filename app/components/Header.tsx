"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useT } from "@/lib/i18n";
import Switchers from "./Switchers";

export default function Header() {
  const { count, ready } = useCart();
  const t = useT();
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
          aria-label={t("nav.menu")}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className="nav__links nav__links--left">
          <li>
            <Link href="/boutique" className={isActive("/boutique") ? "is-active" : ""}>
              {t("nav.boutique")}
            </Link>
          </li>
          <li>
            <Link href="/a-propos" className={isActive("/a-propos") ? "is-active" : ""}>
              {t("nav.maison")}
            </Link>
          </li>
          <li>
            <Link href="/#valeurs">{t("nav.valeurs")}</Link>
          </li>
          <li>
            <Link href="/contact" className={isActive("/contact") ? "is-active" : ""}>
              {t("footer.contact")}
            </Link>
          </li>
          <li className="nav__links-switch">
            <Switchers className="switchers--menu" />
          </li>
        </ul>

        <Link href="/" className="nav__logo" aria-label="Madee">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/madee-wordmark-green.png" alt="Madee" />
        </Link>

        <div className="nav__end">
          <Switchers className="switchers--bar" />
          <Link href="/panier" className="nav__cart" aria-label={t("nav.cart")}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 8h12l-1 12H7L6 8Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            {ready && count > 0 && <b>{count}</b>}
          </Link>
        </div>
      </nav>
    </header>
  );
}
