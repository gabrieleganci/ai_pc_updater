import styles from "./DisclaimerBanner.module.css";

export default function DisclaimerBanner() {
  return (
    <div className={styles.banner} role="note">
      <span className={styles.icon} aria-hidden>
        ⚠️
      </span>
      <p className={styles.text}>
        AI-generated recommendations. Always verify compatibility before purchasing.
      </p>
    </div>
  );
}
