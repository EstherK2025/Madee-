import { NextRequest, NextResponse } from "next/server";
import { sendEmail, emailConfigured, shopEmail } from "@/lib/email";
import { escapeHtml } from "@/lib/email-templates";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: { name?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Merci de renseigner votre nom, un e-mail valide et un message." },
      { status: 400 }
    );
  }

  // Sans e-mail configuré : on accepte quand même (mode démonstration).
  const shop = shopEmail();
  if (!emailConfigured() || !shop) {
    return NextResponse.json({ ok: true, simulated: true });
  }

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:14px;color:#20271a;line-height:1.6">
      <h2 style="font-family:Georgia,serif;color:#33402a">Nouveau message — site Madee</h2>
      <p><strong>Nom :</strong> ${escapeHtml(name)}<br/>
      <strong>E-mail :</strong> ${escapeHtml(email)}</p>
      <p style="white-space:pre-wrap;border-left:3px solid #dcdad0;padding-left:14px">${escapeHtml(
        message
      )}</p>
    </div>`;

  const result = await sendEmail({
    to: shop,
    subject: `✉️ Message de ${name} — Madee`,
    html,
    replyTo: email,
  });

  if (!result.ok) {
    return NextResponse.json(
      { error: "L'envoi a échoué. Réessayez ou écrivez-nous directement." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
