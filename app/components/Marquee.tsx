const WORDS = [
  "Modestie",
  "Élégance",
  "Affirmation",
  "Interculturel",
  "Confiance",
];

export default function Marquee() {
  const run = (
    <>
      {WORDS.map((w, i) => (
        <span key={i}>
          {w}
          <i> ✦ </i>
        </span>
      ))}
    </>
  );
  return (
    <section className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {run}
        {run}
      </div>
    </section>
  );
}
