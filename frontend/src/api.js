import { loadModel, generateAnalysis } from "./llm.js";
import { buildUserPrompt } from "./prompt.js";
import { parseAndValidateModelJson } from "./validators.js";

export async function analyzeBuild(payload, signal) {
  const prompt = buildUserPrompt({
    cpu: payload.current_build.cpu,
    gpu: payload.current_build.gpu,
    ram: payload.current_build.ram,
    motherboard: payload.current_build.motherboard,
    psu: payload.current_build.psu,
    storage: payload.current_build.storage,
    case: payload.current_build.case,
    upgrade_target: payload.upgrade_target,
    use_case: payload.use_case,
    budget_eur: payload.budget_eur,
  });

  const raw = await generateAnalysis(prompt, signal);
  const data = parseAndValidateModelJson(raw, payload.current_build);

  if (data._hallucination_flags) {
    console.warn("[Hallucination Detected]", data._hallucination_flags);
  }
  const { _hallucination_flags, ...cleanData } = data;
  return { success: true, data: cleanData };
}
