"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { products, type Product } from "./products";

export type CartItem = {
  slug: string;
  size: string;
  color: string;
  qty: number;
};

export type CartLine = CartItem & {
  product: Product;
  image: string;
  lineTotal: number;
};

type CartContextValue = {
  items: CartItem[];
  lines: CartLine[];
  count: number;
  subtotal: number;
  ready: boolean;
  add: (slug: string, size: string, color: string, qty?: number) => void;
  setQty: (slug: string, size: string, color: string, qty: number) => void;
  remove: (slug: string, size: string, color: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "madee.cart.v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  // Chargement depuis localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  // Sauvegarde
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, ready]);

  const sameLine = (it: CartItem, slug: string, size: string, color: string) =>
    it.slug === slug && it.size === size && it.color === color;

  const add = useCallback(
    (slug: string, size: string, color: string, qty = 1) => {
      setItems((prev) => {
        const i = prev.findIndex((it) => sameLine(it, slug, size, color));
        if (i >= 0) {
          const next = [...prev];
          next[i] = { ...next[i], qty: next[i].qty + qty };
          return next;
        }
        return [...prev, { slug, size, color, qty }];
      });
    },
    []
  );

  const setQty = useCallback(
    (slug: string, size: string, color: string, qty: number) => {
      setItems((prev) =>
        prev
          .map((it) => (sameLine(it, slug, size, color) ? { ...it, qty } : it))
          .filter((it) => it.qty > 0)
      );
    },
    []
  );

  const remove = useCallback((slug: string, size: string, color: string) => {
    setItems((prev) => prev.filter((it) => !sameLine(it, slug, size, color)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const lines: CartLine[] = useMemo(() => {
    return items
      .map((it) => {
        const product = products.find((p) => p.slug === it.slug);
        if (!product) return null;
        const variant =
          product.colors.find((c) => c.name === it.color) || product.colors[0];
        return {
          ...it,
          product,
          image: variant.images[0],
          lineTotal: product.price * it.qty,
        };
      })
      .filter(Boolean) as CartLine[];
  }, [items]);

  const count = useMemo(() => items.reduce((n, it) => n + it.qty, 0), [items]);
  const subtotal = useMemo(
    () => lines.reduce((s, l) => s + l.lineTotal, 0),
    [lines]
  );

  const value: CartContextValue = {
    items,
    lines,
    count,
    subtotal,
    ready,
    add,
    setQty,
    remove,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé dans <CartProvider>");
  return ctx;
}
