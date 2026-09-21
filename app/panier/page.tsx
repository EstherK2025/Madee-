import type { Metadata } from "next";
import CartView from "../components/CartView";

export const metadata: Metadata = {
  title: "Mon panier",
  description: "Votre sélection Madee, prête à être commandée.",
};

export default function PanierPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head" style={{ marginBottom: "2.4rem" }}>
          <p className="eyebrow">Votre sélection</p>
          <h2>Mon panier</h2>
        </div>
        <CartView />
      </div>
    </section>
  );
}
