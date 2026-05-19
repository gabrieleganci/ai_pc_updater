import { ShieldAlert } from "lucide-react";
import styles from "./WarningsCard.module.css";

/**
 * @param {{ items: string[] }} props
 */
export default function WarningsCard({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <article className={styles.card} role="alert">
      <h3 className={styles.title}>
        <ShieldAlert className={styles.titleIcon} strokeWidth={2} aria-hidden />
        Warnings
      </h3>
      <ul className={styles.list}>
        {items.map((w, i) => (
          <li key={i} className={styles.item}>
            {w}
          </li>
        ))}
      </ul>
    </article>
  );
}
