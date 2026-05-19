import styles from "./RecommendationsCard.module.css";

const FASCIA_MAP = {
  budget: { label: "Budget", className: styles.badgeBudget },
  medio: { label: "Mid-range", className: styles.badgeMid },
  alto: { label: "High-end", className: styles.badgeHigh },
};

function badgeFor(fascia) {
  const key = String(fascia || "").toLowerCase();
  return FASCIA_MAP[key] || { label: fascia, className: styles.badgeMid };
}

/**
 * @param {{ categories: Array<{ componente: string; opzioni: Array<{ nome: string; fascia: string; motivazione: string; compatibilita: string }> }> }} props
 */
export default function RecommendationsCard({ categories }) {
  return (
    <section className={styles.section} aria-labelledby="rec-title">
      <h3 id="rec-title" className={styles.sectionTitle}>
        Upgrade Recommendations
      </h3>
      <div className={styles.stack}>
        {categories.map((cat, ci) => (
          <article key={ci} className={styles.category}>
            <header className={styles.catHeader}>{cat.componente}</header>
            <div className={styles.options}>
              {cat.opzioni.map((opt, oi) => {
                const b = badgeFor(opt.fascia);
                return (
                  <div key={oi} className={styles.option}>
                    <div className={styles.optionTop}>
                      <h4 className={styles.optionName}>{opt.nome}</h4>
                      <span className={b.className}>{b.label}</span>
                    </div>
                    <p className={styles.motiv}>{opt.motivazione}</p>
                    <p className={styles.compat}>
                      <span className={styles.compatLabel}>Compatibility</span>
                      {opt.compatibilita}
                    </p>
                  </div>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
