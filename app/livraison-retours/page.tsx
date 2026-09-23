"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n";

export default function LivraisonRetoursPage() {
  const t = useT();
  return (
    <>
      <section className="pagehead">
        <div className="container">
          <p className="eyebrow">{t("ship.eyebrow")}</p>
          <h1>{t("ship.title")}</h1>
          <p>{t("ship.intro")}</p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <h2>{t("ship.h1")}</h2>
          <p>{t("ship.p1")}</p>
          <ul className="infolist">
            <li>{t("ship.l1")}</li>
            <li>{t("ship.l2")}</li>
            <li>{t("ship.l3")}</li>
            <li>{t("ship.l4")}</li>
          </ul>
          <p>{t("ship.p2")}</p>

          <h2>{t("ship.h2")}</h2>
          <p>{t("ship.p3")}</p>
          <ul className="infolist">
            <li>{t("ship.r1")}</li>
            <li>{t("ship.r2")}</li>
            <li>{t("ship.r3")}</li>
          </ul>
          <p>
            {t("ship.p4a")}{" "}
            <a className="inline-link" href="mailto:bonjour@madee.com">bonjour@madee.com</a>{" "}
            {t("ship.p4b")}
          </p>

          <p style={{ marginTop: "2.4em" }}>
            <Link href="/contact" className="btn btn--solid">
              {t("ship.cta")}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
