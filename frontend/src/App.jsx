import { useCallback, useEffect, useRef, useState } from "react";
import { analyzeBuild, fetchHealth } from "./api.js";
import BuildForm from "./components/BuildForm.jsx";
import DisclaimerBanner from "./components/DisclaimerBanner.jsx";
import { ErrorBoundary } from "./components/ErrorBoundary.jsx";
import Header from "./components/Header.jsx";
import LoadingState from "./components/LoadingState.jsx";
import ResultsReport from "./components/ResultsReport.jsx";
import styles from "./App.module.css";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [buildSnapshot, setBuildSnapshot] = useState(null);
  const [apiError, setApiError] = useState("");
  const [health, setHealth] = useState(null);
  const abortRef = useRef(null);

  useEffect(() => {
    fetchHealth()
      .then(setHealth)
      .catch(() => setHealth({ ollama: false, available: false, model: "gemma4" }));
  }, []);

  const onSubmit = useCallback(async (payload) => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    setApiError("");
    setResult(null);
    setBuildSnapshot({
      cpu: payload.current_build.cpu,
      gpu: payload.current_build.gpu,
      ram: payload.current_build.ram,
      motherboard: payload.current_build.motherboard,
      psu: payload.current_build.psu,
      storage: payload.current_build.storage,
      case: payload.current_build.case,
    });
    setLoading(true);
    try {
      const json = await analyzeBuild(payload, ac.signal);
      if (json.success && json.data) {
        setResult(json.data);
      } else {
        setApiError(json.error || "Analysis failed.");
      }
    } catch (e) {
      if (e.name === "AbortError") return;
      const msg =
        e?.payload?.error ||
        e?.message ||
        "Could not complete analysis. Check that Ollama is running with the gemma4 model.";
      setApiError(msg);
    } finally {
      if (abortRef.current === ac) abortRef.current = null;
      setLoading(false);
    }
  }, []);

  return (
    <ErrorBoundary>
      <div className={styles.app}>
        <Header />
        {health ? (
          <div className={styles.healthRow}>
            <span
              className={
                health.ollama && health.available
                  ? styles.healthOk
                  : styles.healthBad
              }
            >
              Ollama: {health.ollama ? "reachable" : "unreachable"}
              {" · "}
              Model {health.model}: {health.available ? "available" : "missing"}
            </span>
          </div>
        ) : null}

        <main className={styles.main}>
          <BuildForm onSubmit={onSubmit} disabled={loading} />

          {apiError ? (
            <div className={styles.errorBanner} role="alert">
              {apiError}
            </div>
          ) : null}

          {loading ? <LoadingState /> : null}

          {result && buildSnapshot ? (
            <ResultsReport data={result} buildSnapshot={buildSnapshot} />
          ) : null}

          {!loading && !result ? (
            <footer className={styles.footerNote}>
              <DisclaimerBanner />
            </footer>
          ) : null}
        </main>
      </div>
    </ErrorBoundary>
  );
}
