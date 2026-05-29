import { Cpu, CpuIcon, Download, Loader2, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./ModelLoadingScreen.module.css";

const TIPS = [
  "Tutto avviene nel tuo browser — nessun dato lascia il tuo PC",
  "Dopo il primo download, l'app funziona anche offline",
  "PC Build Advisor non ha server backend — solo tu e la GPU",
  "Gemma 2 2B esegue l'analisi direttamente sulla tua scheda grafica",
  "WebGPU sfrutta la GPU per AI veloce e privata",
  "Le analisi successive saranno immediate grazie alla cache",
  "Nessuna API key, nessun abbonamento, nessun account",
  "I tuoi dati hardware non vengono mai inviati a server esterni",
  "Progettato per appassionati di PC gaming e tecnici IT",
];

const ICONS = [Cpu, Zap, Download, CpuIcon, Loader2];

function formatBytes(bytes) {
  if (!bytes || bytes <= 0) return "0 MB";
  const mb = bytes / (1024 * 1024);
  if (mb < 1) return "< 1 MB";
  return `${Math.round(mb)} MB`;
}

export default function ModelLoadingScreen({ progress, error, onRetry }) {
  const [tipIndex, setTipIndex] = useState(0);
  const [tipFade, setTipFade] = useState(true);
  const [particles] = useState(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 4 + Math.random() * 8,
      speed: 0.3 + Math.random() * 0.7,
      delay: Math.random() * 5,
    }))
  );

  useEffect(() => {
    const id = setInterval(() => {
      setTipFade(false);
      setTimeout(() => {
        setTipIndex((i) => (i + 1) % TIPS.length);
        setTipFade(true);
      }, 300);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  if (error) {
    return (
      <div className={styles.overlay}>
        <div className={styles.gridBg} />
        {particles.map((p) => (
          <div
            key={p.id}
            className={styles.particle}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${4 / p.speed}s`,
            }}
          />
        ))}
        <div className={styles.card}>
          <div className={styles.iconError}>
            <Cpu strokeWidth={1.5} />
          </div>
          <h1 className={styles.title}>Download fallito</h1>
          <p className={styles.errorText}>{error}</p>
          <p className={styles.hint}>
            Verifica la connessione a Internet e che il browser supporti WebGPU (Chrome 113+).
          </p>
          {onRetry ? (
            <button className={styles.retryBtn} onClick={onRetry}>
              Riprova
            </button>
          ) : null}
        </div>
      </div>
    );
  }

  const pct = progress && progress.total > 0
    ? Math.min(100, Math.round((progress.loaded / progress.total) * 100))
    : 0;

  const label = progress?.text || "Avvio WebGPU...";
  const isDownloading = progress && progress.total > 0;
  const loadedMb = progress ? formatBytes(progress.loaded) : "0 MB";
  const totalMb = progress ? formatBytes(progress.total) : "0 MB";

  return (
    <div className={styles.overlay}>
      <div className={styles.gridBg} />
      {particles.map((p) => (
        <div
          key={p.id}
          className={styles.particle}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${4 / p.speed}s`,
          }}
        />
      ))}

      <div className={styles.card}>
        <div className={styles.iconWrap}>
          <div className={styles.pulseRing} />
          <div className={styles.pulseRingOuter} />
          <Download className={styles.icon} strokeWidth={1.5} />
        </div>

        <h1 className={styles.title}>PC Build Advisor</h1>
        <p className={styles.subtitle}>Caricamento modello AI in corso...</p>

        <p className={styles.step}>{label}</p>

        {isDownloading ? (
          <>
            <div className={styles.barOuter}>
              <div className={styles.barGlow} style={{ left: `${pct}%` }} />
              <div
                className={styles.barInner}
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className={styles.size}>
              {loadedMb} / {totalMb}
              <span className={styles.pct}> — {pct}%</span>
            </p>
          </>
        ) : (
          <div className={styles.spinnerRow}>
            <Loader2 className={styles.spinner} strokeWidth={2} />
          </div>
        )}

        <div className={styles.tipWrap}>
          <span className={styles.tipIcon}>💡</span>
          <p className={`${styles.tip} ${tipFade ? styles.tipVisible : styles.tipHidden}`}>
            {TIPS[tipIndex]}
          </p>
        </div>

        <p className={styles.disclaimer}>
          Download una tantum ~2 GB. Le analisi successive saranno immediate.
        </p>
      </div>
    </div>
  );
}
