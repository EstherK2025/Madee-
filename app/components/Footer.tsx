import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/madee-logo-cream.jpg"
            alt="Madee"
            className="footer__logo"
          />
          <p>
            L'élégance modeste, interculturelle et fière. Pensée pour la femme
            qui s'affirme.
          </p>
        </div>
        <nav className="footer__col">
          <h4>Boutique</h4>
          <Link href="/boutique">Nouveautés</Link>
          <Link href="/boutique">Abayas</Link>
          <Link href="/boutique">Ensembles</Link>
          <Link href="/boutique">Accessoires</Link>
        </nav>
        <nav className="footer__col">
          <h4>La Maison</h4>
          <Link href="/a-propos">Notre histoire</Link>
          <Link href="/#valeurs">Nos valeurs</Link>
          <Link href="/a-propos">Le manifeste</Link>
        </nav>
        <nav className="footer__col">
          <h4>Aide</h4>
          <Link href="/a-propos">Nous contacter</Link>
          <Link href="/a-propos">Livraison &amp; retours</Link>
          <Link href="/a-propos">Guide des tailles</Link>
        </nav>
        <nav className="footer__col">
          <h4>Suivez-nous</h4>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href="https://pinterest.com" target="_blank" rel="noreferrer">
            Pinterest
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer">
            TikTok
          </a>
        </nav>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} Madee. Tous droits réservés.</span>
        <span>Confidentialité · CGV · Mentions légales</span>
      </div>
    </footer>
  );
}
