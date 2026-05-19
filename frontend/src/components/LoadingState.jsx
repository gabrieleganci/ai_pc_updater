import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./LoadingState.module.css";

const MAX_SECONDS = 60;

export default function LoadingState() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      const target = Math.min(92, (elapsed / MAX_SECONDS) * 100);
      setProgress((p) => (target > p ? target : p));
    }, 400);
    return () => clearInterval(id);
  }, []);

  return (
    <section className={styles.section} aria-busy="true" aria-live="polite">
      <div className={styles.card}>
        <div className={styles.skeletonTop}>
          <div className={styles.skLine} />
          <div className={styles.skLineShort} />
        </div>
        <div className={styles.pulseWrap}>
          <div className={styles.pulseRing} />
          <Loader2 className={styles.spinner} strokeWidth={2} aria-hidden />
        </div>
        <p className={styles.message}>Gemma 4 is analyzing your build...</p>
        <div className={styles.barOuter}>
          <div
            className={styles.barInner}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className={styles.hint}>
          This can take up to {MAX_SECONDS} seconds. Please keep this tab open.
        </p>
        <div className={styles.skeletonGrid}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.skBlock} />
          ))}
        </div>
      </div>
    </section>
  );
}
