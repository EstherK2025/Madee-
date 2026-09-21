import { sendEmail, shopEmail } from "./email";
import {
  confirmationClientEmail,
  notificationSellerEmail,
  type EmailItem,
} from "./email-templates";

export type NewOrder = {
  paymentMethod: string; // "Carte (Stripe)" | "PayPal"
  customerName?: string;
  customerEmail?: string;
  items: EmailItem[];
  totalLabel: string;
  shippingText?: string;
  siteUrl: string;
};

// Envoie l'e-mail de confirmation à la cliente + la notification à la boutique.
// Ne lève jamais d'erreur : un souci d'e-mail ne doit pas casser le paiement.
export async function sendNewOrderEmails(order: NewOrder): Promise<void> {
  const {
    paymentMethod,
    customerName,
    customerEmail,
    items,
    totalLabel,
    shippingText,
    siteUrl,
  } = order;

  try {
    if (customerEmail) {
      await sendEmail({
        to: customerEmail,
        subject: "Votre commande Madee est confirmée 🌿",
        html: confirmationClientEmail({ customerName, items, totalLabel }),
      });
    }

    const shop = shopEmail();
    if (shop) {
      const base = siteUrl.replace(/\/$/, "");
      const params = new URLSearchParams();
      if (customerEmail) params.set("email", customerEmail);
      if (customerName) params.set("name", customerName);
      const expeditionUrl = `${base}/admin/expedition?${params.toString()}`;

      await sendEmail({
        to: shop,
        subject: "🛍️ Nouvelle commande Madee à expédier",
        html: notificationSellerEmail({
          items,
          totalLabel,
          customerName,
          customerEmail,
          shippingText,
          expeditionUrl,
          paymentMethod,
        }),
        replyTo: customerEmail,
      });
    }
  } catch (err) {
    console.error("[orders] Envoi des e-mails de commande échoué", err);
  }
}
