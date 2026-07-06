import { CheckCircle } from "lucide-react";
import styles from "./CorrectionsCard.module.css";

export default function CorrectionsCard({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <article className={styles.card} role="status">
      <h3 className={styles.title}>
        <CheckCircle className={styles.titleIcon} strokeWidth={2} aria-hidden />
        Nomi corretti automaticamente
      </h3>
      <ul className={styles.list}>
        {items.map((c, i) => (
          <li key={i} className={styles.item}>
            <span className={styles.cat}>{c.category}:</span>{" "}
            <span className={styles.from}>&ldquo;{c.from}&rdquo;</span>
            {" → "}
            <span className={styles.to}>&ldquo;{c.to}&rdquo;</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
