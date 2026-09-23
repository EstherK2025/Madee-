import { NextRequest, NextResponse } from "next/server";
import { products } from "@/lib/products";
import {
  PAYPAL_BASE,
  getPaypalAccessToken,
  paypalConfigured,
} from "@/lib/paypal";

export const runtime = "nodejs";

type IncomingItem = { slug: string; size: string; qty: number; color?: string };

// PayPal encaisse en EUR (le SDK et la commande doivent partager la devise).
const cur = "EUR";

export async function POST(req: NextRequest) {
  let body: { items?: IncomingItem[]; currency?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const money = (cents: number) => (cents / 100).toFixed(2);

  // Recalcul serveur à partir du catalogue
  const items = [];
  let totalCents = 0;
  for (const it of body.items || []) {
    const product = products.find((p) => p.slug === it.slug);
    const qty = Math.max(1, Math.min(20, Math.floor(Number(it.qty) || 0)));
    if (!product) continue;
    totalCents += product.price * qty;
    const label = [product.name, it.color, it.size].filter(Boolean).join(" · ");
    items.push({
      name: label.slice(0, 127),
      quantity: String(qty),
      unit_amount: { currency_code: cur, value: money(product.price) },
    });
  }

  if (items.length === 0) {
    return NextResponse.json({ error: "Panier vide" }, { status: 400 });
  }

  // --- Mode simulation ---
  if (!paypalConfigured()) {
    return NextResponse.json({ simulated: true });
  }

  try {
    const token = await getPaypalAccessToken();
    const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: cur,
              value: money(totalCents),
              breakdown: {
                item_total: { currency_code: cur, value: money(totalCents) },
              },
            },
            items,
          },
        ],
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("PayPal create error", data);
      return NextResponse.json(
        { error: "Création de la commande PayPal impossible." },
        { status: 500 }
      );
    }
    return NextResponse.json({ id: data.id });
  } catch (err) {
    console.error("PayPal create exception", err);
    return NextResponse.json(
      { error: "PayPal momentanément indisponible." },
      { status: 500 }
    );
  }
}
