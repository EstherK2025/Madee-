// =============================================================
//  Envoi d'e-mails via Resend (https://resend.com) — API REST,
//  sans dépendance. Gratuit jusqu'à 3 000 e-mails/mois.
//
//  Requiert :
//   - RESEND_API_KEY : votre clé API Resend
//   - EMAIL_FROM     : l'expéditeur, ex. « Madee <commandes@votredomaine.com> »
//                      (le domaine doit être vérifié dans Resend pour
//                       écrire à vos clientes ; sinon, seuls vos propres
//                       e-mails de test passent).
//   - SHOP_EMAIL     : votre adresse (reçoit les notifications de commande)
//
//  Si RESEND_API_KEY ou EMAIL_FROM ne sont pas configurés, l'envoi est
//  simplement ignoré (le site continue de fonctionner).
// =============================================================

export function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

export function shopEmail(): string | undefined {
  return process.env.SHOP_EMAIL || undefined;
}

type SendArgs = {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
};

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: SendArgs): Promise<{ ok: boolean; skipped?: boolean; error?: string }> {
  if (!emailConfigured()) {
    console.warn("[email] Resend non configuré — envoi ignoré :", subject);
    return { ok: false, skipped: true };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("[email] Échec Resend", res.status, text);
      return { ok: false, error: text };
    }
    return { ok: true };
  } catch (err: any) {
    console.error("[email] Exception Resend", err);
    return { ok: false, error: String(err?.message || err) };
  }
}
