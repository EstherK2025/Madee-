import { NextRequest, NextResponse } from "next/server";
import { sendEmail, emailConfigured } from "@/lib/email";
import { shippingClientEmail } from "@/lib/email-templates";

export const runtime = "nodejs";

// Génère un lien de suivi selon le transporteur.
function trackingUrl(carrier: string, n: string): string | undefined {
  const code = encodeURIComponent(n.trim());
  switch (carrier) {
    case "Colissimo":
    case "La Poste":
      return `https://www.laposte.fr/outils/suivre-vos-envois?code=${code}`;
    case "Chronopost":
      return `https://www.chronopost.fr/tracking-no-cms/suivi-page?listeNumerosLES=${code}`;
    case "Mondial Relay":
      return `https://www.mondialrelay.fr/suivi-de-colis/?numeroExpedition=${code}`;
    case "UPS":
      return `https://www.ups.com/track?tracknum=${code}`;
    case "DHL":
      return `https://www.dhl.com/fr-fr/home/tracking.html?tracking-id=${code}`;
    case "Chronopost Canada":
    case "Postes Canada":
      return `https://www.canadapost-postescanada.ca/track-reperage/fr#/search?searchFor=${code}`;
    default:
      return undefined;
  }
}

export async function POST(req: NextRequest) {
  let body: {
    password?: string;
    email?: string;
    name?: string;
    trackingNumber?: string;
    carrier?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json(
      {
        error:
          "Espace d'expédition non configuré : ajoutez la variable ADMIN_PASSWORD.",
      },
      { status: 503 }
    );
  }
  if (body.password !== adminPassword) {
    return NextResponse.json({ error: "Mot de passe incorrect." }, { status: 401 });
  }

  const email = (body.email || "").trim();
  const trackingNumber = (body.trackingNumber || "").trim();
  const carrier = (body.carrier || "").trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Adresse e-mail de la cliente invalide." },
      { status: 400 }
    );
  }
  if (!trackingNumber) {
    return NextResponse.json(
      { error: "Numéro de suivi manquant." },
      { status: 400 }
    );
  }

  if (!emailConfigured()) {
    return NextResponse.json(
      {
        error:
          "L'envoi d'e-mails n'est pas configuré (RESEND_API_KEY / EMAIL_FROM).",
      },
      { status: 503 }
    );
  }

  const result = await sendEmail({
    to: email,
    subject: "Votre commande Madee est en route ✨",
    html: shippingClientEmail({
      customerName: body.name || undefined,
      trackingNumber,
      carrier: carrier || undefined,
      trackingUrl: carrier ? trackingUrl(carrier, trackingNumber) : undefined,
    }),
  });

  if (!result.ok) {
    return NextResponse.json(
      { error: "L'e-mail n'a pas pu être envoyé. Réessayez." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
