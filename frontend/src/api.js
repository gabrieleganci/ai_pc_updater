/**
 * @typedef {Object} CurrentBuild
 * @property {string} cpu
 * @property {string} gpu
 * @property {string} ram
 * @property {string} motherboard
 * @property {string} psu
 * @property {string} [storage]
 * @property {string} [case]
 */

/**
 * @typedef {Object} AnalyzePayload
 * @property {CurrentBuild} current_build
 * @property {string} upgrade_target
 * @property {string} [use_case]
 * @property {number} [budget_eur]
 */

/**
 * @param {AnalyzePayload} payload
 * @param {AbortSignal} [signal]
 */
export async function analyzeBuild(payload, signal) {
  const res = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal,
  });
  let json = {};
  try {
    json = await res.json();
  } catch {
    json = {};
  }
  if (!res.ok) {
    const err = new Error(json.error || res.statusText || "Request failed");
    err.cause = json;
    /** @type {any} */ (err).errorType = json.error_type;
    /** @type {any} */ (err).payload = json;
    throw err;
  }
  return json;
}

/**
 * @returns {Promise<{ status: string; ollama: boolean; model: string; available: boolean }>}
 */
export async function fetchHealth() {
  const res = await fetch("/api/health");
  if (!res.ok) throw new Error("Health check failed");
  return res.json();
}
