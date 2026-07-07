import { loadModel, generateAnalysis } from "./llm.js";
import { buildUserPrompt } from "./prompt.js";
import { parseAndValidateModelJson, validateUserBuild, getAlternatives } from "./validators.js";

export async function analyzeBuild(payload, signal) {
  const { cleaned: validBuild, warnings: userWarnings, invalidFields } = validateUserBuild(payload.current_build);

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
  });

  const raw = await generateAnalysis(prompt, signal);
  const data = parseAndValidateModelJson(raw, validBuild, invalidFields);

  const suggerimenti = invalidFields.map(f => ({
    campo: f.field,
    valore_inserito: f.value,
    alternative: getAlternatives(f.category, f.value, 3),
  }));

  if (userWarnings.length > 0) {
    if (!data.avvertenze) data.avvertenze = [];
    data.avvertenze.push(...userWarnings);
  }

  if (data._unknown_components) {
    for (const unk of data._unknown_components) {
      if (!data._hallucination_flags) data._hallucination_flags = [];
      data._hallucination_flags.push(unk.message);
      data.avvertenze.push(unk.message);
    }
    delete data._unknown_components;
  }

  if (data._hallucination_flags) {
    console.warn("[Hallucination Detected]", data._hallucination_flags);
  }
  const { _hallucination_flags, ...cleanData } = data;
  return { success: true, data: cleanData, suggerimenti: suggerimenti.length > 0 ? suggerimenti : undefined };
}
