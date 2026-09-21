// =============================================================
//  Modèles d'e-mails Madee (HTML inline, compatibles messageries)
//  Les montants sont passés déjà formatés (chaînes) pour éviter
//  toute ambiguïté entre Stripe (centimes) et PayPal (euros).
// =============================================================

export type EmailItem = {
  name: string;
  qtyLabel: string;
  priceLabel: string;
  size?: string;
};

const GREEN = "#34412b";
const GREEN_DARK = "#242e1c";
const CREAM = "#f4f1e7";
const GOLD = "#b3925a";
const INK = "#20271a";
const MUTED = "#6a7360";

function layout(inner: string): string {
  return `
  <div style="margin:0;padding:0;background:${CREAM};font-family:Georgia,'Times New Roman',serif;color:${INK};">
    <div style="max-width:560px;margin:0 auto;padding:0 0 40px;">
      <div style="background:${GREEN};padding:28px;text-align:center;">
        <span style="font-family:Georgia,serif;font-style:italic;font-size:30px;color:${CREAM};letter-spacing:.5px;">Madee.</span>
      </div>
      <div style="background:#ffffff;padding:36px 32px;">
        ${inner}
      </div>
      <div style="padding:22px 32px;text-align:center;color:${MUTED};font-size:12px;font-family:Arial,Helvetica,sans-serif;">
        Madee — L'élégance modeste, interculturelle et fière.<br/>
        Cet e-mail vous est envoyé suite à votre commande.
      </div>
    </div>
  </div>`;
}

function itemsTable(items: EmailItem[]): string {
  const rows = items
    .map(
      (it) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #eee;font-family:Arial,sans-serif;font-size:14px;color:${INK};">
        ${escapeHtml(it.name)}${it.size ? ` <span style="color:${MUTED};">· ${escapeHtml(it.size)}</span>` : ""}
        <span style="color:${MUTED};"> × ${escapeHtml(it.qtyLabel)}</span>
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #eee;font-family:Georgia,serif;font-size:14px;color:${GREEN};text-align:right;white-space:nowrap;">
        ${escapeHtml(it.priceLabel)}
      </td>
    </tr>`
    )
    .join("");
  return `<table style="width:100%;border-collapse:collapse;margin:8px 0 4px;">${rows}</table>`;
}

function button(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;background:${GREEN};color:${CREAM};text-decoration:none;font-family:Arial,sans-serif;font-size:13px;letter-spacing:1px;text-transform:uppercase;padding:14px 28px;border-radius:999px;">${escapeHtml(label)}</a>`;
}

export function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// --- 1. Confirmation de commande (client) ---
export function confirmationClientEmail(args: {
  customerName?: string;
  items: EmailItem[];
  totalLabel: string;
}): string {
  const hi = args.customerName ? `Bonjour ${escapeHtml(args.customerName)},` : "Bonjour,";
  return layout(`
    <h1 style="font-family:Georgia,serif;font-weight:normal;font-size:24px;color:${GREEN};margin:0 0 16px;">Merci pour votre commande</h1>
    <p style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:${INK};margin:0 0 8px;">${hi}</p>
    <p style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:${MUTED};margin:0 0 20px;">
      Nous avons bien reçu votre commande et la préparons avec le plus grand soin.
      Vous recevrez un second e-mail avec votre numéro de suivi dès l'expédition
      de votre colis (sous 2 jours ouvrés).
    </p>
    ${itemsTable(args.items)}
    <table style="width:100%;border-collapse:collapse;margin-top:6px;">
      <tr>
        <td style="padding:12px 0;font-family:Arial,sans-serif;font-size:15px;color:${INK};">Total</td>
        <td style="padding:12px 0;font-family:Georgia,serif;font-size:18px;color:${GREEN};text-align:right;">${escapeHtml(args.totalLabel)}</td>
      </tr>
    </table>
    <p style="font-family:Arial,sans-serif;font-size:13px;line-height:1.6;color:${MUTED};margin:22px 0 0;">
      Bienvenue dans le cercle Madee. 🌿
    </p>
  `);
}

// --- 2. Notification (vendeuse) ---
export function notificationSellerEmail(args: {
  items: EmailItem[];
  totalLabel: string;
  customerName?: string;
  customerEmail?: string;
  shippingText?: string;
  expeditionUrl: string;
  paymentMethod: string;
}): string {
  return layout(`
    <h1 style="font-family:Georgia,serif;font-weight:normal;font-size:22px;color:${GREEN};margin:0 0 6px;">Nouvelle commande à expédier</h1>
    <p style="font-family:Arial,sans-serif;font-size:13px;color:${GOLD};letter-spacing:1px;text-transform:uppercase;margin:0 0 18px;">Payée via ${escapeHtml(args.paymentMethod)}</p>
    ${itemsTable(args.items)}
    <table style="width:100%;border-collapse:collapse;margin-top:6px;">
      <tr>
        <td style="padding:12px 0;font-family:Arial,sans-serif;font-size:15px;color:${INK};">Total</td>
        <td style="padding:12px 0;font-family:Georgia,serif;font-size:18px;color:${GREEN};text-align:right;">${escapeHtml(args.totalLabel)}</td>
      </tr>
    </table>
    <div style="background:${CREAM};border-radius:8px;padding:18px 20px;margin:18px 0;font-family:Arial,sans-serif;font-size:13px;line-height:1.7;color:${INK};">
      <strong>Cliente</strong><br/>
      ${escapeHtml(args.customerName || "—")}<br/>
      ${escapeHtml(args.customerEmail || "—")}<br/>
      ${args.shippingText ? `<br/><strong>Adresse de livraison</strong><br/>${args.shippingText}` : ""}
    </div>
    <p style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:${INK};margin:0 0 18px;">
      📦 <strong>Expédiez le colis sous 48h.</strong> Une fois déposé au bureau de poste,
      récupérez le numéro de suivi puis cliquez ci-dessous pour l'envoyer automatiquement à la cliente :
    </p>
    <p style="margin:0 0 8px;">${button(args.expeditionUrl, "Envoyer le numéro de suivi")}</p>
  `);
}

// --- 3. Expédition / suivi (client) ---
export function shippingClientEmail(args: {
  customerName?: string;
  trackingNumber: string;
  carrier?: string;
  trackingUrl?: string;
}): string {
  const hi = args.customerName ? `Bonjour ${escapeHtml(args.customerName)},` : "Bonjour,";
  const carrier = args.carrier ? escapeHtml(args.carrier) : "le transporteur";
  return layout(`
    <h1 style="font-family:Georgia,serif;font-weight:normal;font-size:24px;color:${GREEN};margin:0 0 16px;">Votre commande est en route ✨</h1>
    <p style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:${INK};margin:0 0 8px;">${hi}</p>
    <p style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:${MUTED};margin:0 0 20px;">
      Bonne nouvelle : votre colis Madee vient d'être expédié via ${carrier}.
      Voici votre numéro de suivi :
    </p>
    <div style="background:${CREAM};border-radius:8px;padding:22px;text-align:center;margin:0 0 20px;">
      <div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${GOLD};margin-bottom:8px;">Numéro de suivi</div>
      <div style="font-family:Georgia,serif;font-size:22px;color:${GREEN};letter-spacing:1px;">${escapeHtml(args.trackingNumber)}</div>
    </div>
    ${
      args.trackingUrl
        ? `<p style="text-align:center;margin:0 0 22px;">${button(args.trackingUrl, "Suivre mon colis")}</p>`
        : ""
    }
    <p style="font-family:Arial,sans-serif;font-size:13px;line-height:1.6;color:${MUTED};margin:0;">
      Merci de votre confiance. Portez-le avec fierté. 🌿<br/>— L'équipe Madee
    </p>
  `);
}
