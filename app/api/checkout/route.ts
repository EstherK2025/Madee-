import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { products } from "@/lib/products";
import { convert, paymentCurrency, isCurrency } from "@/lib/rates";

export const runtime = "nodejs";

type IncomingItem = { slug: string; size: string; qty: number; color?: string };

function siteUrl(req: NextRequest): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    req.nextUrl.origin
  );
}

// Reconstruit les lignes à partir du catalogue serveur (jamais les prix du client).
function buildLines(items: IncomingItem[]) {
  const lines = [];
  for (const it of items) {
    const product = products.find((p) => p.slug === it.slug);
    const qty = Math.max(1, Math.min(20, Math.floor(Number(it.qty) || 0)));
    if (!product || qty <= 0) continue;
    lines.push({
      product,
      size: String(it.size || ""),
      color: String(it.color || ""),
      qty,
    });
  }
  return lines;
}

export async function POST(req: NextRequest) {
  let body: { items?: IncomingItem[]; currency?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const lines = buildLines(body.items || []);
  if (lines.length === 0) {
    return NextResponse.json({ error: "Panier vide" }, { status: 400 });
  }

  const display = isCurrency(body.currency || "") ? (body.currency as any) : "CAD";
  const cur = paymentCurrency(display);
  const base = siteUrl(req);
  const secret = process.env.STRIPE_SECRET_KEY;

  // --- Mode simulation (aucune clé Stripe configurée) ---
  if (!secret) {
    return NextResponse.json({
      simulated: true,
      url: `${base}/commande/succes?sim=stripe`,
    });
  }

  try {
    const stripe = new Stripe(secret);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "pay",
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: ["FR", "BE", "CH", "LU", "CA", "US", "GB", "DE"],
      },
      phone_number_collection: { enabled: true },
      line_items: lines.map((l) => ({
        quantity: l.qty,
        price_data: {
          currency: cur.toLowerCase(),
          unit_amount: Math.round(convert(l.product.price, cur) * 100),
          product_data: {
            name: l.product.name,
            description:
              [l.color && `Coloris : ${l.color}`, l.size && `Taille : ${l.size}`]
                .filter(Boolean)
                .join(" · ") || undefined,
          },
        },
      })),
      success_url: `${base}/commande/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/commande/annulee`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error", err);
    return NextResponse.json(
      { error: "Le paiement Stripe est momentanément indisponible." },
      { status: 500 }
    );
  }
}
