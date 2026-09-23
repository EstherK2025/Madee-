"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useLocale, loc } from "@/lib/i18n";
import { Price } from "@/lib/currency";
import type { Product } from "@/lib/products";

export default function ProductDetail({ product }: { product: Product }) {
  const { add } = useCart();
  const { t, locale } = useLocale();
  const [colorIdx, setColorIdx] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const [size, setSize] = useState(
    product.sizes.length === 1 ? product.sizes[0] : ""
  );
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");

  const color = product.colors[colorIdx];
  const images = color.images;
  const current = images[imgIdx] ?? images[0];

  const selectColor = (i: number) => {
    setColorIdx(i);
    setImgIdx(0);
  };
  const go = (dir: number) =>
    setImgIdx((n) => (n + dir + images.length) % images.length);

  const onAdd = () => {
    if (!size) {
      setError(t("product.chooseSize"));
      return;
    }
    setError("");
    add(product.slug, size, color.name.fr, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 3500);
  };

  return (
    <>
      <p className="crumb">
        <Link href="/boutique">{t("product.crumbShop")}</Link> /{" "}
        {t(`cat.${product.category}.label`)} / {product.name}
      </p>

      <div className="product">
        {/* Galerie */}
        <div className="gallery">
          <div className="gallery__main">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current} alt={`${product.name} — ${loc(color.name, locale)}`} />
            {images.length > 1 && (
              <>
                <button
                  className="gallery__arrow gallery__arrow--prev"
                  onClick={() => go(-1)}
                  aria-label={t("product.prev")}
                >
                  ‹
                </button>
                <button
                  className="gallery__arrow gallery__arrow--next"
                  onClick={() => go(1)}
                  aria-label={t("product.next")}
                >
                  ›
                </button>
                <div className="gallery__dots">
                  {images.map((_, i) => (
                    <span
                      key={i}
                      className={i === imgIdx ? "is-on" : ""}
                      onClick={() => setImgIdx(i)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          {images.length > 1 && (
            <div className="gallery__thumbs">
              {images.map((src, i) => (
                <button
                  key={src}
                  className={`gallery__thumb ${i === imgIdx ? "is-on" : ""}`}
                  onClick={() => setImgIdx(i)}
                  aria-label={`${t("product.view")} ${i + 1}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Informations */}
        <div className="product__detail">
          <p className="product__cat">{t(`cat.${product.category}.label`)}</p>
          <h1 className="product__title">{product.name}</h1>
          <p className="product__price">
            <Price cents={product.price} />
          </p>
          <p className="product__desc">{loc(product.description, locale)}</p>

          <div className="field">
            <span className="field__label">
              {t("product.color")} —{" "}
              <em style={{ fontStyle: "normal", color: "var(--stone)" }}>
                {loc(color.name, locale)}
              </em>
            </span>
            <div className="swatches">
              {product.colors.map((c, i) => (
                <button
                  key={c.name.fr}
                  className={`swatch ${i === colorIdx ? "is-selected" : ""}`}
                  style={{ background: c.hex }}
                  onClick={() => selectColor(i)}
                  aria-label={loc(c.name, locale)}
                  aria-pressed={i === colorIdx}
                  title={loc(c.name, locale)}
                />
              ))}
            </div>
          </div>

          {product.sizes.length > 1 && (
            <div className="field">
              <span className="field__label">{t("product.size")}</span>
              <div className="sizes" role="group" aria-label={t("product.size")}>
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
            <span className="field__label">{t("product.quantity")}</span>
            <div className="qty">
              <button type="button" aria-label="-" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                −
              </button>
              <span aria-live="polite">{qty}</span>
              <button type="button" aria-label="+" onClick={() => setQty((q) => Math.min(20, q + 1))}>
                +
              </button>
            </div>
          </div>

          <button type="button" className="btn btn--solid btn--block" onClick={onAdd}>
            {added ? t("product.added") : t("product.add")}
          </button>
          {error && <p className="pay-error">{error}</p>}
          {added && (
            <p className="product__note">
              <Link href="/panier" className="link-arrow">
                {t("product.viewCart")} <span>→</span>
              </Link>
            </p>
          )}

          <div className="product__details">
            <h4>{t("product.details")}</h4>
            <ul>
              {product.details.map((d, i) => (
                <li key={i}>{loc(d, locale)}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
