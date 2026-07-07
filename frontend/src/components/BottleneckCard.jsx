import styles from "./BottleneckCard.module.css";
import { AlertTriangle, Cpu, MonitorPlay, MemoryStick, Layers, Zap, HardDrive, Box } from "lucide-react";

const COMPONENT_TAG_RE = /^\[([A-Za-z0-9_ /]+)\]\s*(.*)$/s;

const TAG_ICONS = {
  cpu: Cpu,
  gpu: MonitorPlay,
  ram: MemoryStick,
  motherboard: Layers,
  psu: Zap,
  storage: HardDrive,
  case: Box,
};

function parseItem(text) {
  const m = text.match(COMPONENT_TAG_RE);
  if (m) {
    return { tag: m[1].trim(), text: m[2].trim(), raw: text };
  }
  return { tag: null, text, raw: text };
}

const TAG_COLORS = {
  cpu: "#00d4ff",
  gpu: "#a855f7",
  ram: "#22c55e",
  motherboard: "#f59e0b",
  psu: "#ef4444",
  storage: "#3b82f6",
  case: "#ec4899",
};

function getTagStyle(tag) {
  if (!tag) return { color: "#f59e0b", borderColor: "rgba(245, 158, 11, 0.4)" };
  const lower = tag.toLowerCase();
  for (const [key, color] of Object.entries(TAG_COLORS)) {
    if (lower.includes(key)) return { color, borderColor: color + "66" };
  }
  return { color: "#f59e0b", borderColor: "rgba(245, 158, 11, 0.4)" };
}

function TagIcon({ tag }) {
  if (!tag) return null;
  const lower = tag.toLowerCase();
  const IconComponent = Object.entries(TAG_ICONS).find(([key]) => lower.includes(key))?.[1];
  if (!IconComponent) return null;
  return <IconComponent className={styles.tagIcon} strokeWidth={2} aria-hidden />;
}

/**
 * @param {{ items: string[] }} props
 */
export default function BottleneckCard({ items }) {
  const has = items && items.length > 0;

  return (
    <article className={styles.card}>
      <h3 className={styles.title}>
        <AlertTriangle className={styles.titleIcon} strokeWidth={2} aria-hidden />
        Bottleneck Detection
      </h3>
      {has ? (
        <ul className={styles.list}>
          {items.map((raw, i) => {
            const { tag, text } = parseItem(raw);
            const tagStyle = getTagStyle(tag);
            return (
              <li key={i} className={styles.row}>
                <span className={styles.badge} style={{ borderColor: tagStyle.borderColor, color: tagStyle.color }}>
                  <TagIcon tag={tag} />
                  {tag || "Componente"}
                </span>
                <span className={styles.desc}>{text}</span>
              </li>
            );
          })}
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
