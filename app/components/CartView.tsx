"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useLocale, loc } from "@/lib/i18n";
import { Price } from "@/lib/currency";
import ProductVisual from "./ProductVisual";
import CheckoutButtons from "./CheckoutButtons";

const SHIPPING_FREE_FROM = 15000; // centimes EUR

export default function CartView() {
  const { lines, subtotal, count, ready, setQty, remove } = useCart();
  const { t, locale } = useLocale();

  if (!ready) {
    return (
      <div className="empty">
        <p>{t("cart.loading")}</p>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="empty">
        <h2>{t("cart.emptyTitle")}</h2>
        <p>{t("cart.emptyText")}</p>
        <Link href="/boutique" className="btn btn--solid">
          {t("cart.emptyCta")}
        </Link>
      </div>
    );
  }

  const freeShipping = subtotal >= SHIPPING_FREE_FROM;

  return (
    <div className="cart">
      <div className="cart__lines">
        {lines.map((l) => {
          const variant =
            l.product.colors.find((c) => c.name.fr === l.color) ||
            l.product.colors[0];
          return (
            <div className="cart__line" key={`${l.slug}-${l.size}-${l.color}`}>
              <Link href={`/produit/${l.slug}`} className="cart__thumb">
                <ProductVisual product={l.product} image={l.image} />
              </Link>
              <div>
                <Link href={`/produit/${l.slug}`}>
                  <span className="cart__name">{l.product.name}</span>
                </Link>
                <div className="cart__meta">
                  {loc(variant.name, locale)}
                  {l.size ? ` · ${l.size}` : ""}
                </div>
                <div className="qty" style={{ marginTop: ".7em" }}>
                  <button type="button" aria-label="-" onClick={() => setQty(l.slug, l.size, l.color, l.qty - 1)}>
                    −
                  </button>
                  <span>{l.qty}</span>
                  <button type="button" aria-label="+" onClick={() => setQty(l.slug, l.size, l.color, l.qty + 1)}>
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="cart__remove"
                  onClick={() => remove(l.slug, l.size, l.color)}
                >
                  {t("cart.remove")}
                </button>
              </div>
              <div className="cart__lineright">
                <span className="cart__lineprice">
                  <Price cents={l.lineTotal} />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <aside className="summary">
        <h3>{t("cart.summary")}</h3>
        <div className="summary__row">
          <span>
            {t("cart.subtotal")} ({count}{" "}
            {count > 1 ? t("cart.articles") : t("cart.article")})
          </span>
          <span>
            <Price cents={subtotal} />
          </span>
        </div>
        <div className="summary__row">
          <span>{t("cart.shipping")}</span>
          <span>{freeShipping ? t("cart.shippingFree") : t("cart.shippingCalc")}</span>
        </div>
        {!freeShipping && (
          <div className="summary__row" style={{ fontSize: ".8rem" }}>
            <span>
              {t("cart.freeFrom1")} <Price cents={SHIPPING_FREE_FROM - subtotal} />{" "}
              {t("cart.freeFrom2")}
            </span>
          </div>
        )}
        <div className="summary__row summary__row--total">
          <span>{t("cart.total")}</span>
          <b>
            <Price cents={subtotal} />
          </b>
        </div>

        <CheckoutButtons />

        <p style={{ marginTop: "1.2em" }}>
          <Link href="/boutique" className="link-arrow">
            {t("cart.continue")} <span>→</span>
          </Link>
        </p>
      </aside>
    </div>
  );
}
