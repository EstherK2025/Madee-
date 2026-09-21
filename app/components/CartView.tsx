"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import ProductVisual from "./ProductVisual";
import CheckoutButtons from "./CheckoutButtons";

export default function CartView() {
  const { lines, subtotal, count, ready, setQty, remove } = useCart();

  if (!ready) {
    return (
      <div className="empty">
        <p>Chargement de votre panier…</p>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="empty">
        <h2>Votre panier est vide</h2>
        <p>
          Découvrez la collection Nour et laissez-vous envelopper de lumière.
        </p>
        <Link href="/boutique" className="btn btn--solid">
          Explorer la boutique
        </Link>
      </div>
    );
  }

  const SHIPPING_FREE_FROM = 15000;
  const freeShipping = subtotal >= SHIPPING_FREE_FROM;

  return (
    <div className="cart">
      <div className="cart__lines">
        {lines.map((l) => (
          <div className="cart__line" key={`${l.slug}-${l.size}-${l.color}`}>
            <Link href={`/produit/${l.slug}`} className="cart__thumb">
              <ProductVisual product={l.product} image={l.image} />
            </Link>
            <div>
              <Link href={`/produit/${l.slug}`}>
                <span className="cart__name">{l.product.name}</span>
              </Link>
              <div className="cart__meta">
                {l.color}
                {l.size ? ` · Taille ${l.size}` : ""}
              </div>
              <div className="qty" style={{ marginTop: ".7em" }}>
                <button
                  type="button"
                  aria-label="Diminuer"
                  onClick={() => setQty(l.slug, l.size, l.color, l.qty - 1)}
                >
                  −
                </button>
                <span>{l.qty}</span>
                <button
                  type="button"
                  aria-label="Augmenter"
                  onClick={() => setQty(l.slug, l.size, l.color, l.qty + 1)}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="cart__remove"
                onClick={() => remove(l.slug, l.size, l.color)}
              >
                Retirer
              </button>
            </div>
            <div className="cart__lineright">
              <span className="cart__lineprice">
                {formatPrice(l.lineTotal)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <aside className="summary">
        <h3>Récapitulatif</h3>
        <div className="summary__row">
          <span>
            Sous-total ({count} article{count > 1 ? "s" : ""})
          </span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="summary__row">
          <span>Livraison</span>
          <span>{freeShipping ? "Offerte" : "Calculée à l'étape suivante"}</span>
        </div>
        {!freeShipping && (
          <div className="summary__row" style={{ fontSize: ".8rem" }}>
            <span>
              Plus que {formatPrice(SHIPPING_FREE_FROM - subtotal)} pour la
              livraison offerte
            </span>
          </div>
        )}
        <div className="summary__row summary__row--total">
          <span>Total</span>
          <b>{formatPrice(subtotal)}</b>
        </div>

        <CheckoutButtons />

        <p style={{ marginTop: "1.2em" }}>
          <Link href="/boutique" className="link-arrow">
            Continuer mes achats <span>→</span>
          </Link>
        </p>
      </aside>
    </div>
  );
}
