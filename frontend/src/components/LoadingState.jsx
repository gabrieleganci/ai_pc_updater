import styles from "./LoadingState.module.css";

const BUBBLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  size: 12 + Math.random() * 28,
  left: Math.random() * 100,
  delay: Math.random() * 4,
  duration: 3 + Math.random() * 4,
  opacity: 0.15 + Math.random() * 0.35,
}));

export default function LoadingState() {
  return (
    <section className={styles.section} aria-busy="true" aria-live="polite">
      <div className={styles.container}>
        <div className={styles.bubbleField}>
          {BUBBLES.map((b) => (
            <div
              key={b.id}
              className={styles.bubble}
              style={{
                width: b.size,
                height: b.size,
                left: `${b.left}%`,
                animationDelay: `${b.delay}s`,
                animationDuration: `${b.duration}s`,
                opacity: b.opacity,
              }}
            />
          ))}
        </div>
        <div className={styles.textWrap}>
          <p className={styles.label}>Analisi in corso</p>
          <p className={styles.sub}>Gemma sta elaborando la tua build</p>
        </div>
      </div>
    </section>
  );
}
