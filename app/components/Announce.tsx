function Message() {
  return (
    <>
      Livraison offerte dès 150&nbsp;€ · <em>Première collection</em>{" "}
      disponible · Retours gratuits sous 30 jours · Fait avec soin, porté avec
      fierté&nbsp;&nbsp;—&nbsp;&nbsp;
    </>
  );
}

export default function Announce() {
  return (
    <div className="announce">
      <div className="announce__track">
        <span>
          <Message />
        </span>
        <span aria-hidden="true">
          <Message />
        </span>
      </div>
    </div>
  );
}
