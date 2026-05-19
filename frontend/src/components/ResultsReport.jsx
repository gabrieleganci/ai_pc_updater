import BottleneckCard from "./BottleneckCard.jsx";
import DependentUpgradesCard from "./DependentUpgradesCard.jsx";
import DisclaimerBanner from "./DisclaimerBanner.jsx";
import RecommendationsCard from "./RecommendationsCard.jsx";
import WarningsCard from "./WarningsCard.jsx";
import styles from "./ResultsReport.module.css";

/**
 * @param {{
 *   data: {
 *     analisi_build_attuale: string;
 *     bottleneck_identificati: string[];
 *     upgrade_consigliati: Array<{ componente: string; opzioni: unknown[] }>;
 *     upgrade_dipendenti: Array<{ componente: string; motivo: string }>;
 *     avvertenze: string[];
 *   };
 *   buildSnapshot: Record<string, string | undefined>;
 * }} props
 */
export default function ResultsReport({ data, buildSnapshot }) {
  const chips = [
    ["CPU", buildSnapshot.cpu],
    ["GPU", buildSnapshot.gpu],
    ["RAM", buildSnapshot.ram],
    ["Motherboard", buildSnapshot.motherboard],
    ["PSU", buildSnapshot.psu],
    ["Storage", buildSnapshot.storage],
    ["Case", buildSnapshot.case],
  ].filter(([, v]) => v && String(v).trim());

  return (
    <section className={styles.wrap} aria-label="Analysis results">
      <h2 className={styles.pageTitle}>Analysis Report</h2>

      <article className={styles.card}>
        <h3 className={styles.cardTitle}>Current Build Assessment</h3>
        <div className={styles.chips} aria-label="Your components">
          {chips.map(([label, val]) => (
            <span key={label} className={styles.chip} title={String(val)}>
              <span className={styles.chipLabel}>{label}</span>
              <span className={styles.chipVal}>{val}</span>
            </span>
          ))}
        </div>
        <p className={styles.assessment}>{data.analisi_build_attuale}</p>
      </article>

      <div className={styles.grid2}>
        <BottleneckCard items={data.bottleneck_identificati} />
        <DependentUpgradesCard items={data.upgrade_dipendenti} />
      </div>

      <RecommendationsCard categories={data.upgrade_consigliati} />

      <WarningsCard items={data.avvertenze} />

      <DisclaimerBanner />
    </section>
  );
}
