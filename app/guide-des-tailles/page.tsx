"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n";

const ROWS = [
  { taille: "XS", fr: "34", poitrine: "82", tour: "64", hanches: "90" },
  { taille: "S", fr: "36", poitrine: "86", tour: "68", hanches: "94" },
  { taille: "M", fr: "38", poitrine: "90", tour: "72", hanches: "98" },
  { taille: "L", fr: "40", poitrine: "94", tour: "76", hanches: "102" },
  { taille: "XL", fr: "42", poitrine: "98", tour: "80", hanches: "106" },
];

export default function GuideDesTaillesPage() {
  const t = useT();
  return (
    <>
      <section className="pagehead">
        <div className="container">
          <p className="eyebrow">{t("guide.eyebrow")}</p>
          <h1>{t("guide.title")}</h1>
          <p>{t("guide.intro")}</p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <h2>{t("guide.tableTitle")}</h2>
          <div className="table-wrap">
            <table className="size-table">
              <thead>
                <tr>
                  <th>{t("guide.hSize")}</th>
                  <th>{t("guide.hFr")}</th>
                  <th>{t("guide.hBust")}</th>
                  <th>{t("guide.hWaist")}</th>
                  <th>{t("guide.hHips")}</th>
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

          <h2>{t("guide.howTitle")}</h2>
          <ul className="infolist">
            <li>{t("guide.m1")}</li>
            <li>{t("guide.m2")}</li>
            <li>{t("guide.m3")}</li>
          </ul>
          <p>{t("guide.doubt")}</p>
          <p style={{ marginTop: "2.4em" }}>
            <Link href="/contact" className="btn btn--solid">
              {t("guide.cta")}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
