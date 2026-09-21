import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { formatPrice } from "@/lib/format";
import { sendNewOrderEmails } from "@/lib/orders";
import type { EmailItem } from "@/lib/email-templates";

export const runtime = "nodejs";

function siteUrl(req: NextRequest): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || req.nextUrl.origin;
}

function formatAddress(details: any): string | undefined {
  const a = details?.address;
  if (!a) return undefined;
  const name = details?.name ? `${details.name}<br/>` : "";
  return (
    name +
    [a.line1, a.line2, [a.postal_code, a.city].filter(Boolean).join(" "), a.country]
      .filter(Boolean)
      .join("<br/>")
  );
}

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secret || !webhookSecret) {
    return NextResponse.json({ ignored: true }, { status: 200 });
  }

  const stripe = new Stripe(secret);
  const sig = req.headers.get("stripe-signature") || "";
  const raw = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, webhookSecret);
  } catch (err) {
    console.error("[stripe] Signature invalide", err);
    return NextResponse.json({ error: "signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ["data.price.product"],
        limit: 100,
      });

      const items: EmailItem[] = lineItems.data.map((li) => {
        const product = li.price?.product as Stripe.Product | undefined;
        const rawSize =
          product && typeof product === "object" ? product.description : undefined;
        const size = rawSize ? rawSize.replace(/^Taille\s*:\s*/i, "") : undefined;
        return {
          name: li.description || "Article",
          qtyLabel: String(li.quantity ?? 1),
          priceLabel: formatPrice(li.amount_total ?? 0),
          size,
        };
      });

      await sendNewOrderEmails({
        paymentMethod: "Carte (Stripe)",
        customerName: session.customer_details?.name || undefined,
        customerEmail: session.customer_details?.email || undefined,
        items,
        totalLabel: formatPrice(session.amount_total ?? 0),
        shippingText: formatAddress((session as any).shipping_details),
        siteUrl: siteUrl(req),
      });
    } catch (err) {
      console.error("[stripe] Traitement commande échoué", err);
    }
  }

  return NextResponse.json({ received: true });
}
