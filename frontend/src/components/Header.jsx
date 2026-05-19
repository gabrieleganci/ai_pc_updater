import { Cpu } from "lucide-react";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.iconWrap} aria-hidden>
            <Cpu className={styles.icon} strokeWidth={1.75} />
          </span>
          <div>
            <h1 className={styles.title}>PC Build Advisor</h1>
            <p className={styles.subtitle}>
              Smart hardware upgrade analysis powered by AI
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
