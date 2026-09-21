"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";

declare global {
  interface Window {
    paypal?: any;
  }
}

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";
const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";

export default function CheckoutButtons() {
  const { items, clear } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const paypalBox = useRef<HTMLDivElement>(null);
  const paypalRendered = useRef(false);
  const itemsRef = useRef(items);
  itemsRef.current = items;

  const demoMode = !STRIPE_KEY && !PAYPAL_CLIENT_ID;

  // --- Paiement Stripe ---
  const payStripe = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur");
      if (data.url) {
        if (data.simulated) clear();
        window.location.href = data.url;
      }
    } catch (e: any) {
      setError(e.message || "Le paiement a échoué. Réessayez.");
      setLoading(false);
    }
  };

  // --- Paiement PayPal (simulation, sans clés) ---
  const payPaypalDemo = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/paypal/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur");
      clear();
      router.push("/commande/succes?sim=paypal");
    } catch (e: any) {
      setError(e.message || "Le paiement a échoué. Réessayez.");
      setLoading(false);
    }
  };

  // --- Boutons PayPal réels (SDK) ---
  useEffect(() => {
    if (!PAYPAL_CLIENT_ID || paypalRendered.current) return;

    const render = () => {
      if (paypalRendered.current || !window.paypal || !paypalBox.current)
        return;
      paypalRendered.current = true;
      window.paypal
        .Buttons({
          style: { color: "gold", shape: "rect", label: "paypal", height: 48 },
          createOrder: async () => {
            const res = await fetch("/api/paypal/create", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ items: itemsRef.current }),
            });
            const data = await res.json();
            if (!res.ok || !data.id)
              throw new Error(data.error || "Création impossible");
            return data.id;
          },
          onApprove: async (data: { orderID: string }) => {
            const res = await fetch("/api/paypal/capture", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderID: data.orderID }),
            });
            const out = await res.json();
            if (!res.ok) throw new Error(out.error || "Capture impossible");
            clear();
            router.push("/commande/succes?paypal=" + data.orderID);
          },
          onError: () => {
            setError("Le paiement PayPal a rencontré un problème.");
          },
        })
        .render(paypalBox.current);
    };

    if (window.paypal) {
      render();
      return;
    }
    const existing = document.getElementById("paypal-sdk");
    if (existing) {
      existing.addEventListener("load", render);
      return;
    }
    const script = document.createElement("script");
    script.id = "paypal-sdk";
    script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(
      PAYPAL_CLIENT_ID
    )}&currency=EUR&intent=capture`;
    script.async = true;
    script.onload = render;
    script.onerror = () => setError("PayPal n'a pas pu être chargé.");
    document.body.appendChild(script);
  }, [clear, router]);

  return (
    <div className="summary__pay">
      {demoMode && (
        <span className="sim-badge">Mode démonstration</span>
      )}

      <button
        type="button"
        className="btn btn--solid btn--block"
        onClick={payStripe}
        disabled={loading}
      >
        {loading ? "Redirection…" : "Payer par carte"}
      </button>

      <div className="paydivider">ou</div>

      {PAYPAL_CLIENT_ID ? (
        <div className="paypal-box" ref={paypalBox} />
      ) : (
        <button
          type="button"
          className="btn btn--ghost btn--block"
          onClick={payPaypalDemo}
          disabled={loading}
        >
          Payer avec PayPal
        </button>
      )}

      {error && <p className="pay-error">{error}</p>}

      <p className="pay-note">
        Paiement sécurisé. Vos coordonnées bancaires ne transitent jamais par
        nos serveurs.
        {demoMode &&
          " Aucune clé de paiement n'est encore configurée : les commandes sont simulées."}
      </p>
    </div>
  );
}
