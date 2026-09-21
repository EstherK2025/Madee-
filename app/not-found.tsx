import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <div className="confirm">
          <h1>Page introuvable</h1>
          <p>La page que vous cherchez n'existe pas ou a été déplacée.</p>
          <div className="hero__actions" style={{ justifyContent: "center" }}>
            <Link href="/" className="btn btn--solid">
              Retour à l'accueil
            </Link>
            <Link href="/boutique" className="btn btn--ghost">
              Voir la boutique
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
