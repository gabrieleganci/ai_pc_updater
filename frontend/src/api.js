import { loadModel, generateAnalysis } from "./llm.js";
import { buildUserPrompt } from "./prompt.js";
import { parseAndValidateModelJson, validateUserBuild, getAlternatives } from "./validators.js";
import { analyzeBuildLocal } from "./analyzer.js";

function extractTopics(text) {
  const t = text.toLowerCase();
  const topics = [];
  if (t.includes("psu") || t.includes("alimentatore") || t.includes("watt") || /\d+w/.test(t)) topics.push("psu");
  if (t.includes("gpu") || t.includes("scheda grafica") || t.includes("dx12") || t.includes("ray tracing") || t.includes("vram")) topics.push("gpu");
  if (/\bcpu\b/.test(t) || t.includes("processore") || t.includes("socket") || t.includes("core")) topics.push("cpu");
  if (t.includes("ram") || t.includes("memoria") || t.includes("ddr")) topics.push("ram");
  if (t.includes("motherboard") || t.includes("scheda madr") || t.includes("bios")) topics.push("mobo");
  if (t.includes("storage") || t.includes("ssd") || t.includes("hdd") || t.includes("nvme")) topics.push("storage");
  if (t.includes("dissipazion") || t.includes("raffreddamento") || t.includes("ventola")) topics.push("cooling");
  return topics;
}

export async function analyzeBuild(payload, signal) {
  const { cleaned: validBuild, warnings: userWarnings, invalidFields } = validateUserBuild(payload.current_build);

  // 1. Run local analysis — veloce, preciso, basato su metadata reali
  const local = analyzeBuildLocal(
    validBuild,
    payload.upgrade_target,
    payload.use_case,
    payload.budget_eur,
    invalidFields
  );

  // 2. Prompt compatto: chiediamo al LLM solo di riscrivere la valutazione in italiano naturale
  const prompt = buildUserPrompt({
    cpu: validBuild.cpu,
    gpu: validBuild.gpu,
    ram: validBuild.ram,
    motherboard: validBuild.motherboard,
    psu: validBuild.psu,
    storage: validBuild.storage,
    case: validBuild.case,
    upgrade_target: payload.upgrade_target,
    use_case: payload.use_case,
    budget_eur: payload.budget_eur,
    invalidFields,
    localAnalysis: local,
  });

  let cleanData = { ...local };

  // 3. Chiamata LLM — se fallisce, usiamo il testo locale
  try {
    const raw = await generateAnalysis(prompt, signal);
    const llmData = parseAndValidateModelJson(raw, validBuild, invalidFields);

    // Usa solo il testo dal LLM, tutto il resto resta locale
    if (llmData.analisi_build_attuale && llmData.analisi_build_attuale.length > 20) {
      cleanData.analisi_build_attuale = llmData.analisi_build_attuale;
    }
    if (llmData.avvertenze && llmData.avvertenze.length > 0) {
      // Preferisci le avvertenze LLM (piú naturali), salta quelle locali
      // solo se TUTTI i loro temi sono giá coperti dalle LLM
      const llmTopicSets = llmData.avvertenze.map(w => extractTopics(w));
      const filteredLocal = cleanData.avvertenze.filter(w => {
        const localTopics = extractTopics(w);
        if (localTopics.length === 0) return true; // tema sconosciuto, teniamo
        // Salta locale solo se ogni suo tema è coperto da almeno un LLM warning
        return !localTopics.every(t => llmTopicSets.some(ts => ts.includes(t)));
      });
      cleanData.avvertenze = [...new Set([...llmData.avvertenze, ...filteredLocal])];
    }
  } catch (err) {
    if (err.name === "AbortError") throw err;
    console.warn("LLM generation failed, using local analysis only:", err.message);
  }

  // 4. Suggerimenti per componenti non riconosciuti
  const suggerimenti = invalidFields.map(f => ({
    campo: f.field,
    valore_inserito: f.value,
    alternative: getAlternatives(f.category, f.value, 3),
  }));

  if (userWarnings.length > 0) {
    cleanData.avvertenze = [...new Set([...userWarnings, ...cleanData.avvertenze])];
  }

  return {
    success: true,
    data: cleanData,
    suggerimenti: suggerimenti.length > 0 ? suggerimenti : undefined,
  };
}
