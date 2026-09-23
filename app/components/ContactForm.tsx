"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n";

export default function ContactForm() {
  const t = useT();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [note, setNote] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setNote("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur");
      setStatus("ok");
      setNote(t("contact.fok"));
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setStatus("error");
      setNote(err.message || t("contact.ferror"));
    }
  };

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="field">
        <label className="field__label" htmlFor="c-name">{t("contact.fname")}</label>
        <input id="c-name" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="field">
        <label className="field__label" htmlFor="c-email">{t("contact.femail")}</label>
        <input id="c-email" type="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="field">
        <label className="field__label" htmlFor="c-message">{t("contact.fmessage")}</label>
        <textarea id="c-message" className="form-input" rows={6} value={message} onChange={(e) => setMessage(e.target.value)} required />
      </div>
      <button type="submit" className="btn btn--solid" disabled={status === "sending"}>
        {status === "sending" ? t("contact.fsending") : t("contact.fsend")}
      </button>
      {note && (
        <p style={{ marginTop: "1.2em", color: status === "ok" ? "var(--green)" : "#b3402e" }}>
          {note}
        </p>
      )}
    </form>
  );
}
