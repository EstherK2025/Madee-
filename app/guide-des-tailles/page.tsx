import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guide des tailles",
  description:
    "Trouvez votre taille Madee grâce à notre tableau de mensurations et nos conseils.",
};

const ROWS = [
  { taille: "XS", fr: "34", poitrine: "82", tour: "64", hanches: "90" },
  { taille: "S", fr: "36", poitrine: "86", tour: "68", hanches: "94" },
  { taille: "M", fr: "38", poitrine: "90", tour: "72", hanches: "98" },
  { taille: "L", fr: "40", poitrine: "94", tour: "76", hanches: "102" },
  { taille: "XL", fr: "42", poitrine: "98", tour: "80", hanches: "106" },
];

export default function GuideDesTaillesPage() {
  return (
    <>
      <section className="pagehead">
        <div className="container">
          <p className="eyebrow">Aide</p>
          <h1>Guide des tailles</h1>
          <p>
            Nos coupes sont pensées amples et couvrantes. En cas d'hésitation
            entre deux tailles, choisissez la plus petite pour un tombé ajusté,
            la plus grande pour un port très fluide.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <h2>Mensurations (en centimètres)</h2>
          <div className="table-wrap">
            <table className="size-table">
              <thead>
                <tr>
                  <th>Taille</th>
                  <th>FR</th>
                  <th>Poitrine</th>
                  <th>Tour de taille</th>
                  <th>Hanches</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.taille}>
                    <td data-strong>{r.taille}</td>
                    <td>{r.fr}</td>
                    <td>{r.poitrine}</td>
                    <td>{r.tour}</td>
                    <td>{r.hanches}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Comment se mesurer</h2>
          <ul className="infolist">
            <li>
              <strong>Poitrine</strong> — mesurez à l'endroit le plus fort, le
              mètre bien horizontal.
            </li>
            <li>
              <strong>Tour de taille</strong> — au creux de la taille, sans
              serrer.
            </li>
            <li>
              <strong>Hanches</strong> — à l'endroit le plus large, pieds
              joints.
            </li>
          </ul>
          <p>
            Un doute subsiste ? Écrivez-nous votre taille habituelle et vos
            mensurations, nous vous conseillons la coupe idéale.
          </p>

          <p style={{ marginTop: "2.4em" }}>
            <Link href="/contact" className="btn btn--solid">
              Demander conseil
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
