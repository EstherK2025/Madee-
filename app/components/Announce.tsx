"use client";

import { useT } from "@/lib/i18n";

export default function Announce() {
  const t = useT();
  const msg = t("announce");
  return (
    <div className="announce">
      <div className="announce__track">
        <span>{msg}&nbsp;&nbsp;—&nbsp;&nbsp;</span>
        <span aria-hidden="true">{msg}&nbsp;&nbsp;—&nbsp;&nbsp;</span>
      </div>
    </div>
  );
}
