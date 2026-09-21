"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const CARRIERS = [
  "Colissimo",
  "La Poste",
  "Chronopost",
  "Mondial Relay",
  "UPS",
  "DHL",
  "Postes Canada",
  "Autre",
];

function ExpeditionForm() {
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [carrier, setCarrier] = useState("Colissimo");
  const [tracking, setTracking] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    setEmail(params.get("email") || "");
    setName(params.get("name") || "");
    try {
      const saved = localStorage.getItem("madee.admin.pw");
      if (saved) setPassword(saved);
    } catch {
      /* ignore */
    }
  }, [params]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setMessage("");
    try {
      localStorage.setItem("madee.admin.pw", password);
    } catch {
      /* ignore */
    }
    try {
      const res = await fetch("/api/expedition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          email,
          name,
          carrier,
          trackingNumber: tracking,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur");
      setStatus("ok");
      setMessage(`E-mail de suivi envoyé à ${email}.`);
      setTracking("");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Échec de l'envoi.");
    }
  };

  return (
    <div style={{ maxWidth: 520, margin: "0 auto" }}>
      <p className="eyebrow">Espace boutique</p>
      <h1 style={{ fontSize: "2.2rem", margin: ".2em 0 .3em" }}>
        Envoyer un numéro de suivi
      </h1>
      <p style={{ color: "var(--muted)", marginBottom: "2rem" }}>
        Renseignez le numéro de suivi une fois le colis déposé : la cliente
        reçoit aussitôt son e-mail d'expédition, avec le lien de suivi.
      </p>

      <form onSubmit={submit}>
        <div className="field">
          <label className="field__label" htmlFor="pw">
            Mot de passe boutique
          </label>
          <input
            id="pw"
            type="password"
            className="admin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label className="field__label" htmlFor="email">
            E-mail de la cliente
          </label>
          <input
            id="email"
            type="email"
            className="admin-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label className="field__label" htmlFor="name">
            Nom de la cliente (facultatif)
          </label>
          <input
            id="name"
            type="text"
            className="admin-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="field">
          <label className="field__label" htmlFor="carrier">
            Transporteur
          </label>
          <select
            id="carrier"
            className="admin-input"
            value={carrier}
            onChange={(e) => setCarrier(e.target.value)}
          >
            {CARRIERS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label className="field__label" htmlFor="tracking">
            Numéro de suivi
          </label>
          <input
            id="tracking"
            type="text"
            className="admin-input"
            value={tracking}
            onChange={(e) => setTracking(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn--solid btn--block"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Envoi…" : "Envoyer le suivi à la cliente"}
        </button>

        {message && (
          <p
            style={{
              marginTop: "1.2em",
              color: status === "ok" ? "var(--green)" : "#b3402e",
            }}
          >
            {message}
          </p>
        )}
      </form>

      <style>{`
        .admin-input{
          width:100%;padding:14px 16px;border:1px solid var(--line);
          border-radius:10px;background:#fff;font-family:var(--font-sans);
          font-size:.95rem;color:var(--green-900);
        }
        .admin-input:focus{outline:none;border-color:var(--green)}
      `}</style>
    </div>
  );
}

export default function ExpeditionPage() {
  return (
    <section className="section">
      <div className="container">
        <Suspense fallback={<p style={{ textAlign: "center" }}>Chargement…</p>}>
          <ExpeditionForm />
        </Suspense>
      </div>
    </section>
  );
}
