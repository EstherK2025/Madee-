"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products";

export default function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState(
    product.sizes.length === 1 ? product.sizes[0] : ""
  );
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");

  const onAdd = () => {
    if (!size) {
      setError("Merci de choisir une taille.");
      return;
    }
    setError("");
    add(product.slug, size, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 3500);
  };

  return (
    <div>
      {product.sizes.length > 1 && (
        <div className="field">
          <span className="field__label">Taille</span>
          <div className="sizes" role="group" aria-label="Choix de la taille">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                className={`size ${size === s ? "is-selected" : ""}`}
                onClick={() => {
                  setSize(s);
                  setError("");
                }}
                aria-pressed={size === s}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="field">
        <span className="field__label">Quantité</span>
        <div className="qty">
          <button
            type="button"
            aria-label="Diminuer"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
          >
            −
          </button>
          <span aria-live="polite">{qty}</span>
          <button
            type="button"
            aria-label="Augmenter"
            onClick={() => setQty((q) => Math.min(20, q + 1))}
          >
            +
          </button>
        </div>
      </div>

      <button type="button" className="btn btn--solid btn--block" onClick={onAdd}>
        {added ? "Ajouté au panier ✓" : "Ajouter au panier"}
      </button>

      {error && <p className="pay-error">{error}</p>}
      {added && (
        <p className="product__note">
          <Link href="/panier" className="link-arrow">
            Voir mon panier <span>→</span>
          </Link>
        </p>
      )}
    </div>
  );
}
