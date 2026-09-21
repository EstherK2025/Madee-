import { NextRequest, NextResponse } from "next/server";
import {
  PAYPAL_BASE,
  getPaypalAccessToken,
  paypalConfigured,
} from "@/lib/paypal";

export const runtime = "nodejs";

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
      console.error("PayPal capture error", data);
      return NextResponse.json(
        { error: "Le paiement PayPal n'a pas pu être finalisé." },
        { status: 500 }
      );
    }
    return NextResponse.json({ status: data.status });
  } catch (err) {
    console.error("PayPal capture exception", err);
    return NextResponse.json(
      { error: "PayPal momentanément indisponible." },
      { status: 500 }
    );
  }
}
