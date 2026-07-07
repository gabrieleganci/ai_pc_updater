import { useCallback, useEffect, useRef, useState } from "react";
import { analyzeBuild } from "./api.js";
import { loadModel, unloadModel, clearModelCache, isModelCached } from "./llm.js";
import BuildForm from "./components/BuildForm.jsx";
import DisclaimerBanner from "./components/DisclaimerBanner.jsx";
import { ErrorBoundary } from "./components/ErrorBoundary.jsx";
import Header from "./components/Header.jsx";
import LoadingState from "./components/LoadingState.jsx";
import ModelLoadingScreen from "./components/ModelLoadingScreen.jsx";
import ResultsReport from "./components/ResultsReport.jsx";
import styles from "./App.module.css";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [suggerimenti, setSuggerimenti] = useState(null);
  const [buildSnapshot, setBuildSnapshot] = useState(null);
  const [apiError, setApiError] = useState("");
  const [modelReady, setModelReady] = useState(false);
  const [modelProgress, setModelProgress] = useState(null);
  const [modelError, setModelError] = useState(null);
  const [pendingPayload, setPendingPayload] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [modelCached, setModelCached] = useState(false);
  const abortRef = useRef(null);

  useEffect(() => {
    isModelCached().then(setModelCached);
  }, []);

  async function startModelLoad() {
    setShowWelcome(false);
    setModelError(null);
    setModelProgress(null);
    if (!navigator.gpu) {
      setModelError("WebGPU non è supportato da questo browser. Usa Chrome 113+, Edge 113+ o Opera 99+.");
      return;
    }
    if (!window.crossOriginIsolated) {
      setModelError("Cross-Origin Isolation non attiva. Avvia con `npm run dev` dalla cartella frontend/ oppure consulta il README per il deploy.");
      return;
    }
    loadModel((report) => {
      setModelProgress({ ...report });
    })
      .then(() => {
        setModelReady(true);
        setModelProgress(null);
        isModelCached().then(setModelCached);
      })
      .catch((err) => {
        console.error("WebLLM error:", err);
        let msg = err?.message || "Errore sconosciuto durante il caricamento.";
        const ua = navigator.userAgent.toLowerCase();
        const isFlatpak = ua.includes("flatpak") || ua.includes("snap");
        if (isFlatpak) msg += " [Rilevato Flatpak/Snap — installa Chrome dal sito ufficiale https://www.google.com/chrome/]";
        else if (ua.includes("linux")) msg += " [Su Linux WebGPU richiede Vulkan. Apri terminale: vulkaninfo --summary. Se fallisce: sudo pacman -S vulkan-icd-loader (Arch) o sudo apt install mesa-vulkan-drivers vulkan-tools (Debian/Ubuntu)]";
        setModelError(msg);
        setModelProgress(null);
      });
  }

  async function handleUnloadModel() {
    unloadModel();
    await clearModelCache();
    setModelReady(false);
    setModelProgress(null);
    setModelError(null);
    setShowWelcome(true);
    setResult(null);
    setSuggerimenti(null);
    setBuildSnapshot(null);
    setApiError("");
    setModelCached(false);
  }

  useEffect(() => {
    if (modelReady && pendingPayload) {
      const payload = pendingPayload;
      setPendingPayload(null);
      runAnalysis(payload);
    }
  }, [modelReady, pendingPayload]);

  const runAnalysis = useCallback(async (payload) => {
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
        setSuggerimenti(json.suggerimenti?.length > 0 ? json.suggerimenti : null);
      } else {
        setApiError(json.error || "Analisi fallita.");
      }
    } catch (e) {
      if (e.name === "AbortError") return;
      const msg =
        e?.payload?.error ||
        e?.message ||
        "Errore durante l'analisi. Tieni aperta la scheda e riprova.";
      setApiError(msg);
    } finally {
      if (abortRef.current === ac) abortRef.current = null;
      setLoading(false);
    }
  }, []);

  const onSubmit = useCallback(async (payload) => {
    if (!modelReady) {
      setPendingPayload(payload);
      return;
    }
    runAnalysis(payload);
  }, [modelReady, runAnalysis]);

  if (showWelcome) {
    return <ModelLoadingScreen welcome modelCached={modelCached} onStart={startModelLoad} />;
  }

  if (!modelReady) {
    return (
      <ModelLoadingScreen
        progress={modelProgress}
        error={modelError}
        onRetry={modelError ? startModelLoad : null}
      />
    );
  }

  return (
    <ErrorBoundary>
      <div className={styles.app}>
        <Header />

        <main className={styles.main}>
          <BuildForm onSubmit={onSubmit} disabled={loading} />

          {apiError ? (
            <div className={styles.errorBanner} role="alert">
              {apiError}
            </div>
          ) : null}

          {loading ? <LoadingState /> : null}

          {result && buildSnapshot ? (
            <ResultsReport data={result} buildSnapshot={buildSnapshot} suggerimenti={suggerimenti} />
          ) : null}

          {!loading && !result ? (
            <footer className={styles.footerNote}>
              <DisclaimerBanner />
            </footer>
          ) : null}
        </main>

        <div className={styles.footerActions}>
          <button
            type="button"
            className={styles.deleteBtn}
            onClick={handleUnloadModel}
          >
            Elimina modello
          </button>
        </div>
      </div>
    </ErrorBoundary>
  );
}
