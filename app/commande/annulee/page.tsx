import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Commande annulée",
};

export default function AnnuleePage() {
  return (
    <section className="section">
      <div className="container">
        <div className="confirm">
          <div className="confirm__mark" style={{ background: "var(--gold)" }}>
            ↺
          </div>
          <h1>Paiement annulé</h1>
          <p>
            Aucun montant n'a été débité. Votre panier vous attend toujours,
            intact.
          </p>
          <div className="hero__actions" style={{ justifyContent: "center" }}>
            <Link href="/panier" className="btn btn--solid">
              Revenir au panier
            </Link>
            <Link href="/boutique" className="btn btn--ghost">
              Continuer mes achats
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
