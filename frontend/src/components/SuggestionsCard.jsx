import styles from "./SuggestionsCard.module.css";

export default function SuggestionsCard({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="sug-title">
      <h3 id="sug-title" className={styles.sectionTitle}>
        Componenti non riconosciuti — suggerimenti
      </h3>
      <div className={styles.stack}>
        {items.map((s, i) => (
          <article key={i} className={styles.group}>
            <header className={styles.groupHeader}>
              <span className={styles.fieldLabel}>{s.campo.toUpperCase()}</span>
              <span className={styles.userValue}>&ldquo;{s.valore_inserito}&rdquo;</span>
              <span className={styles.notRecognized}>non riconosciuto</span>
            </header>
            <div className={styles.alternatives}>
              <span className={styles.sugLabel}>Alternative reali:</span>
              {s.alternative.map((alt, j) => (
                <div key={j} className={styles.altCard}>
                  <span className={styles.altName}>{alt.nome}</span>
                  <span className={styles.altDesc}>{alt.descrizione}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
