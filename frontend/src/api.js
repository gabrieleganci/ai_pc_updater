import { loadModel, generateAnalysis, verifyComponents } from "./llm.js";
import { buildUserPrompt } from "./prompt.js";
import { parseAndValidateModelJson, validateUserBuild, getAlternatives } from "./validators.js";

export async function analyzeBuild(payload, signal) {
  const { cleaned: validBuild, warnings: userWarnings, invalidFields } = validateUserBuild(payload.current_build);

  const suggerimenti = invalidFields.map((f) => ({
    campo: f.field,
    valore_inserito: f.value,
    alternative: getAlternatives(f.category, 3),
  }));

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
  });

  const raw = await generateAnalysis(prompt, signal);
  const data = parseAndValidateModelJson(raw, validBuild);

  if (userWarnings.length > 0) {
    if (!data.avvertenze) data.avvertenze = [];
    data.avvertenze.push(...userWarnings);
  }

  if (data._unknown_components) {
    try {
      const verified = await verifyComponents(data._unknown_components);
      const fakeNames = new Set(verified.filter((v) => !v.verified).map((v) => v.name.toLowerCase()));

      for (const unk of data._unknown_components) {
        if (fakeNames.has(unk.name.toLowerCase())) {
          if (!data._hallucination_flags) data._hallucination_flags = [];
          data._hallucination_flags.push(unk.message);
          data.avvertenze.push(unk.message);
          suggerimenti.push({
            campo: unk.category,
            valore_inserito: unk.name,
            alternative: getAlternatives(unk.category, 3),
          });
        }
      }
    } catch (err) {
      for (const unk of data._unknown_components) {
        if (!data._hallucination_flags) data._hallucination_flags = [];
        data._hallucination_flags.push(unk.message);
        data.avvertenze.push(unk.message);
        suggerimenti.push({
          campo: unk.category,
          valore_inserito: unk.name,
          alternative: getAlternatives(unk.category, 3),
        });
      }
      console.warn("[LLM Verify] fallito, ripristinati warning originali", err);
    }
    delete data._unknown_components;
  }

  if (data._hallucination_flags) {
    console.warn("[Hallucination Detected]", data._hallucination_flags);
  }
  if (data._correzioni) {
    console.info("[Auto-Corrections]", data._correzioni);
  }
  const { _hallucination_flags, _correzioni, ...cleanData } = data;
  return { success: true, data: cleanData, correzioni: _correzioni, suggerimenti };
}
