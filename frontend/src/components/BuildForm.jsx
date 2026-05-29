import {
  Box,
  Cpu,
  HardDrive,
  Layers,
  MemoryStick,
  MonitorPlay,
  Sparkles,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import styles from "./BuildForm.module.css";

const UPGRADE_OPTIONS = ["CPU", "GPU", "RAM", "Motherboard", "PSU", "Storage"];

const FIELDS = [
  { key: "cpu", label: "CPU", icon: Cpu, required: true },
  { key: "gpu", label: "GPU", icon: MonitorPlay, required: true },
  { key: "ram", label: "RAM", icon: MemoryStick, required: true },
  { key: "motherboard", label: "Motherboard", icon: Layers, required: true },
  { key: "psu", label: "PSU", icon: Zap, required: true },
  { key: "storage", label: "Storage", icon: HardDrive, required: false },
  { key: "case", label: "Case", icon: Box, required: false },
];

const initialForm = () => ({
  cpu: "",
  gpu: "",
  ram: "",
  motherboard: "",
  psu: "",
  storage: "",
  case: "",
  upgrade_target: "GPU",
  use_case: "",
  budget_eur: "",
});

/**
 * @param {{ onSubmit: (payload: import('../api.js').AnalyzePayload) => void; disabled?: boolean }} props
 */
export default function BuildForm({ onSubmit, disabled }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const fieldMap = useMemo(() => {
    const m = {};
    FIELDS.forEach((f) => {
      m[f.key] = f;
    });
    return m;
  }, []);

  function validate() {
    const next = {};
    FIELDS.forEach(({ key, label, required }) => {
      if (required && !String(form[key] || "").trim()) {
        next[key] = `${label} is required`;
      }
    });
    if (!form.upgrade_target) {
      next.upgrade_target = "Select a component to upgrade";
    }
    if (form.budget_eur !== "" && form.budget_eur != null) {
      const n = Number(form.budget_eur);
      if (Number.isNaN(n) || n < 0) {
        next.budget_eur = "Enter a valid budget (EUR)";
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleChange(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    const budgetRaw = form.budget_eur === "" ? undefined : Number(form.budget_eur);
    /** @type {import('../api.js').AnalyzePayload} */
    const payload = {
      current_build: {
        cpu: form.cpu.trim(),
        gpu: form.gpu.trim(),
        ram: form.ram.trim(),
        motherboard: form.motherboard.trim(),
        psu: form.psu.trim(),
        storage: form.storage.trim() || undefined,
        case: form.case.trim() || undefined,
      },
      upgrade_target: form.upgrade_target,
      use_case: form.use_case.trim() || undefined,
      budget_eur: budgetRaw,
    };
    onSubmit(payload);
  }

  return (
    <section className={styles.section} aria-labelledby="build-form-title">
      <div className={styles.card}>
        <h2 id="build-form-title" className={styles.cardTitle}>
          Your Current Build
        </h2>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.grid}>
            {FIELDS.map(({ key, label, icon: Icon, required }) => (
              <label key={key} className={styles.field}>
                <span className={styles.labelRow}>
                  <Icon className={styles.labelIcon} strokeWidth={1.75} aria-hidden />
                  <span className={styles.label}>
                    {label}
                    {required ? <span className={styles.req}>*</span> : null}
                  </span>
                </span>
                <input
                  className={styles.input}
                  type="text"
                  name={key}
                  value={form[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  disabled={disabled}
                  autoComplete="off"
                />
                {errors[key] ? (
                  <span className={styles.error} role="alert">
                    {errors[key]}
                  </span>
                ) : null}
              </label>
            ))}
          </div>

          <label className={styles.fieldFull}>
            <span className={styles.labelRow}>
              <Cpu className={styles.labelIcon} strokeWidth={1.75} aria-hidden />
              <span className={styles.label}>
                Component to upgrade<span className={styles.req}>*</span>
              </span>
            </span>
            <select
              className={styles.select}
              value={form.upgrade_target}
              onChange={(e) => handleChange("upgrade_target", e.target.value)}
              disabled={disabled}
            >
              {UPGRADE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.upgrade_target ? (
              <span className={styles.error} role="alert">
                {errors.upgrade_target}
              </span>
            ) : null}
          </label>

          <div className={styles.row2}>
            <label className={styles.fieldFull}>
              <span className={styles.label}>
                {form.upgrade_target} — scenario d'uso (opzionale)
              </span>
              <input
                className={styles.input}
                type="text"
                placeholder='es. Gaming 1440p, Montaggio video 4K, Sviluppo AI'
                value={form.use_case}
                onChange={(e) => handleChange("use_case", e.target.value)}
                disabled={disabled}
              />
            </label>
            <label className={styles.fieldFull}>
              <span className={styles.label}>Budget (EUR, optional)</span>
              <input
                className={styles.input}
                type="number"
                min={0}
                step={1}
                placeholder="800"
                value={form.budget_eur}
                onChange={(e) => handleChange("budget_eur", e.target.value)}
                disabled={disabled}
              />
              {errors.budget_eur ? (
                <span className={styles.error} role="alert">
                  {errors.budget_eur}
                </span>
              ) : null}
            </label>
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.submit} disabled={disabled}>
              <Sparkles className={styles.submitIcon} strokeWidth={2} aria-hidden />
              Analyze Upgrade
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
