import styles from "./BottleneckCard.module.css";
import { AlertTriangle } from "lucide-react";

/**
 * @param {{ items: string[] }} props
 */
export default function BottleneckCard({ items }) {
  const has = items && items.length > 0;

  return (
    <article className={styles.card}>
      <h3 className={styles.title}>Bottleneck Detection</h3>
      {has ? (
        <ul className={styles.list}>
          {items.map((text, i) => (
            <li key={i} className={styles.row}>
              <AlertTriangle className={styles.icon} strokeWidth={2} aria-hidden />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.none}>
          <span className={styles.dot} aria-hidden />
          No significant bottlenecks detected
        </p>
      )}
    </article>
  );
}
