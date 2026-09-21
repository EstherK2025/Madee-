import { NextRequest, NextResponse } from "next/server";
import {
  PAYPAL_BASE,
  getPaypalAccessToken,
  paypalConfigured,
} from "@/lib/paypal";
import { sendNewOrderEmails } from "@/lib/orders";
import type { EmailItem } from "@/lib/email-templates";

export const runtime = "nodejs";

function siteUrl(req: NextRequest): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || req.nextUrl.origin;
}

function euro(n: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(n);
}

// Construit les e-mails à partir de la réponse de capture PayPal.
async function emailsFromOrder(order: any, req: NextRequest) {
  const pu = order?.purchase_units?.[0] || {};
  const payer = order?.payer || {};
  const name = payer?.name
    ? [payer.name.given_name, payer.name.surname].filter(Boolean).join(" ")
    : undefined;

  const items: EmailItem[] = Array.isArray(pu.items)
    ? pu.items.map((it: any) => {
        const unit = parseFloat(it?.unit_amount?.value || "0");
        const qty = parseInt(it?.quantity || "1", 10);
        return {
          name: it?.name || "Article",
          qtyLabel: String(qty),
          priceLabel: euro(unit * qty),
        };
      })
    : [{ name: "Commande Madee", qtyLabel: "1", priceLabel: "" }];

  const captured =
    pu?.payments?.captures?.[0]?.amount?.value || pu?.amount?.value || "0";

  const ship = pu?.shipping;
  let shippingText: string | undefined;
  if (ship?.address) {
    const a = ship.address;
    const who = ship?.name?.full_name ? `${ship.name.full_name}<br/>` : "";
    shippingText =
      who +
      [
        a.address_line_1,
        a.address_line_2,
        [a.postal_code, a.admin_area_2].filter(Boolean).join(" "),
        a.country_code,
      ]
        .filter(Boolean)
        .join("<br/>");
  }

  await sendNewOrderEmails({
    paymentMethod: "PayPal",
    customerName: name,
    customerEmail: payer?.email_address,
    items,
    totalLabel: euro(parseFloat(captured)),
    shippingText,
    siteUrl: siteUrl(req),
  });
}

export async function POST(req: NextRequest) {
  let body: { orderID?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const orderID = body.orderID;
  if (!orderID) {
    return NextResponse.json({ error: "Commande manquante" }, { status: 400 });
  }

  if (!paypalConfigured()) {
    return NextResponse.json({ simulated: true, status: "COMPLETED" });
  }

  try {
    const token = await getPaypalAccessToken();
    const res = await fetch(
      `${PAYPAL_BASE}/v2/checkout/orders/${orderID}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      console.error("[paypal] capture error", data);
      return NextResponse.json(
        { error: "Le paiement PayPal n'a pas pu être finalisé." },
        { status: 500 }
      );
    }

    // Envoi des e-mails (n'interrompt jamais la réponse au client).
    try {
      await emailsFromOrder(data, req);
    } catch (err) {
      console.error("[paypal] envoi e-mails échoué", err);
    }

    return NextResponse.json({ status: data.status });
  } catch (err) {
    console.error("[paypal] capture exception", err);
    return NextResponse.json(
      { error: "PayPal momentanément indisponible." },
      { status: 500 }
    );
  }
}
