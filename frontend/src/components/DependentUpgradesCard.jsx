import { Link2 } from "lucide-react";
import styles from "./DependentUpgradesCard.module.css";

/**
 * @param {{ items: Array<{ componente: string; motivo: string }> }} props
 */
export default function DependentUpgradesCard({ items }) {
  if (!items || items.length === 0) {
    return (
      <article className={styles.card}>
        <h3 className={styles.title}>Dependent Upgrades</h3>
        <p className={styles.empty}>No additional dependent upgrades flagged.</p>
      </article>
    );
  }

  return (
    <article className={styles.card}>
      <h3 className={styles.title}>Dependent Upgrades</h3>
      <ul className={styles.list}>
        {items.map((row, i) => (
          <li key={i} className={styles.row}>
            <Link2 className={styles.icon} strokeWidth={2} aria-hidden />
            <div>
              <div className={styles.comp}>{row.componente}</div>
              <div className={styles.reason}>{row.motivo}</div>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
