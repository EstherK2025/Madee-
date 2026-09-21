"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function SuccesPage() {
  const { clear } = useCart();

  // La commande est passée : on vide le panier (utile après un retour Stripe).
  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <section className="section">
      <div className="container">
        <div className="confirm">
          <div className="confirm__mark">✓</div>
          <h1>Merci pour votre commande</h1>
          <p>
            Votre commande a bien été enregistrée. Vous recevrez un e-mail de
            confirmation avec le suivi de votre colis.
          </p>
          <p>
            Nous préparons vos pièces Madee avec le plus grand soin. Bienvenue
            dans le cercle.
          </p>
          <div className="hero__actions" style={{ justifyContent: "center" }}>
            <Link href="/boutique" className="btn btn--solid">
              Continuer mes achats
            </Link>
            <Link href="/" className="btn btn--ghost">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
