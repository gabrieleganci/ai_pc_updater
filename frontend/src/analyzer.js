import { getCpuMeta, getGpuMeta, extractWattage, detectDdrGen, BUDGET_RANGES, GPU_META, CPU_META, detectChipset, getSocketChipsets } from "./performance.js";

const CURRENT_YEAR = new Date().getFullYear();

const USECASE_RECOMMENDATIONS = {
  "gaming 1080p":    { gpuTier: [30, 50],  cpuTier: [40, 60] },
  "gaming 1440p":    { gpuTier: [45, 65],  cpuTier: [55, 75] },
  "gaming 4k":       { gpuTier: [65, 100], cpuTier: [65, 88] },
  "montaggio video": { gpuTier: [40, 100], cpuTier: [55, 88] },
  "rendering 3d":    { gpuTier: [45, 100], cpuTier: [55, 88] },
  "sviluppo ai":     { gpuTier: [45, 100], cpuTier: [50, 88] },
  "streaming":       { gpuTier: [40, 70],  cpuTier: [50, 80] },
  "produttivita":    { gpuTier: [20, 50],  cpuTier: [35, 65] },
  "ufficio":         { gpuTier: [0, 20],   cpuTier: [20, 40] },
  "programmazione":  { gpuTier: [10, 40],  cpuTier: [35, 60] },
};

function detectUseCase(useCaseStr) {
  if (!useCaseStr) return null;
  const lower = useCaseStr.toLowerCase();
  for (const key of Object.keys(USECASE_RECOMMENDATIONS)) {
    const words = key.split(/\s+/);
    if (words.every(w => lower.includes(w))) return key;
  }
  if (lower.includes("gaming") || lower.includes("gioco")) {
    if (lower.includes("4k")) return "gaming 4k";
    if (lower.includes("1440") || lower.includes("2k")) return "gaming 1440p";
    return "gaming 1080p";
  }
  if (lower.includes("video") || lower.includes("montaggio") || lower.includes("editing")) return "montaggio video";
  if (lower.includes("3d") || lower.includes("render") || lower.includes("blender")) return "rendering 3d";
  if (lower.includes("ai") || lower.includes("machine learning") || lower.includes("deep learning")) return "sviluppo ai";
  if (lower.includes("stream") || lower.includes("twitch")) return "streaming";
  return null;
}

const CPU_SCENARIO_SCORERS = {
  "gaming 1080p": (meta, name) => {
    let score = meta.tier * 0.6;
    if (name.includes("X3D")) score += 20;
    if (meta.cores > 12) score -= 3;
    return score;
  },
  "gaming 1440p": (meta, name) => {
    let score = meta.tier * 0.7;
    if (name.includes("X3D")) score += 15;
    if (meta.cores > 12) score -= 2;
    return score;
  },
  "gaming 4k": (meta, name) => {
    let score = meta.tier * 0.8;
    if (name.includes("X3D")) score += 10;
    return score;
  },
  "montaggio video": (meta, name) => meta.tier + Math.max(0, meta.cores - 6) * 1.5,
  "rendering 3d": (meta, name) => meta.tier + Math.max(0, meta.cores - 6) * 2,
  "sviluppo ai": (meta, name) => meta.tier + Math.max(0, meta.cores - 6),
  streaming: (meta, name) => meta.tier + (meta.cores >= 8 ? 5 : 0),
  produttivita: (meta, name) => meta.tier + Math.max(0, meta.cores - 4),
  ufficio: (meta, name) => meta.tier,
  programmazione: (meta, name) => meta.tier + Math.max(0, meta.cores - 4) * 0.5,
};

const GPU_SCENARIO_SCORERS = {
  "gaming 1080p": (meta) => meta.tier * 0.7 + (meta.vram >= 8 ? 5 : 0),
  "gaming 1440p": (meta) => meta.tier * 0.8 + (meta.vram >= 12 ? 5 : 0),
  "gaming 4k": (meta) => meta.tier * 0.9 + (meta.vram >= 16 ? 8 : 0),
  "montaggio video": (meta) => meta.tier + (meta.vram >= 12 ? 5 : 0),
  "rendering 3d": (meta) => meta.tier + meta.vram * 0.5,
  "sviluppo ai": (meta) => meta.tier + meta.vram,
  streaming: (meta) => meta.tier,
  produttivita: (meta) => meta.tier,
  ufficio: (meta) => meta.tier,
  programmazione: (meta) => meta.tier,
};

function formatFascia(tier) {
  if (tier >= 70) return "alto";
  if (tier >= 45) return "medio";
  return "budget";
}

function getGpuRecommendations(build, budgetEur, useCaseKey) {
  const oldGpuMeta = getGpuMeta(build.gpu);

  const useCaseReq = useCaseKey ? USECASE_RECOMMENDATIONS[useCaseKey] : null;
  const appMinTier = useCaseReq ? useCaseReq.gpuTier[0] : 0;
  const scorer = useCaseKey && GPU_SCENARIO_SCORERS[useCaseKey] ? (m) => GPU_SCENARIO_SCORERS[useCaseKey](m) : (m) => m.tier;

  if (!oldGpuMeta) {
    let targetTier;
    const bValid = budgetEur != null && budgetEur !== "";
    if (bValid) {
      const n = Number(budgetEur);
      const range = BUDGET_RANGES.GPU.find(r => n <= r.max) || BUDGET_RANGES.GPU[BUDGET_RANGES.GPU.length - 1];
      targetTier = Math.round((range.tiers[0] + range.tiers[1]) / 2);
    } else if (useCaseReq) {
      targetTier = Math.round((useCaseReq.gpuTier[0] + useCaseReq.gpuTier[1]) / 2);
    } else {
      targetTier = 50;
    }
    const popular = Object.entries(GPU_META)
      .filter(([_, m]) => Math.abs(m.tier - targetTier) <= 15)
      .map(([name, meta]) => [name, meta, scorer(meta)])
      .sort((a, b) => b[2] - a[2])
      .slice(0, 2);
    return popular.map(([name, meta]) => ({
      nome: name,
      fascia: formatFascia(meta.tier),
      motivazione: `GPU consigliata per la tua configurazione (tier ${meta.tier}). La GPU attuale non è stata riconosciuta.`,
      compatibilita: `Slot PCIe x16. PSU minima ${meta.minPsu}W.`,
    }));
  }

  let tierMin, tierMax;
  const bValid = budgetEur != null && budgetEur !== "";
  if (bValid) {
    const n = Number(budgetEur);
    const range = BUDGET_RANGES.GPU.find(r => n <= r.max) || BUDGET_RANGES.GPU[BUDGET_RANGES.GPU.length - 1];
    tierMin = range.tiers[0];
    tierMax = range.tiers[1];
  } else {
    tierMin = Math.max(oldGpuMeta.tier + 15, appMinTier);
    tierMax = 100;
  }
  const scored = Object.entries(GPU_META)
    .filter(([_, m]) => m.tier >= tierMin && m.tier <= tierMax && m.tier > oldGpuMeta.tier)
    .map(([name, meta]) => [name, meta, scorer(meta)])
    .sort((a, b) => b[2] - a[2])
    .slice(0, 4);

  const options = [];
  for (const [name, meta, score] of scored) {
    const tierDiff = meta.tier - oldGpuMeta.tier;
    options.push({
      nome: name,
      fascia: formatFascia(meta.tier),
      motivazione: tierDiff >= 25
        ? `Notevole incremento prestazionale (tier ${oldGpuMeta.tier} → ${meta.tier}). Ideale per ${useCaseKey || "applicazioni esigenti"} senza compromessi.`
        : tierDiff >= 15
          ? `Deciso miglioramento (tier ${oldGpuMeta.tier} → ${meta.tier}). Ottimo per ${useCaseKey || "gaming e produttività"}.`
          : `Miglioramento moderato (tier ${oldGpuMeta.tier} → ${meta.tier}). Adatto a ${useCaseKey || "uso generale"}.`,
      compatibilita: `Slot PCIe x16. Verifica ingombri e PSU minima ${meta.minPsu}W.`,
    });
    if (options.length >= 2) break;
  }

  if (options.length === 0) {
    const fallback = Object.entries(GPU_META)
      .filter(([_, m]) => m.tier > oldGpuMeta.tier)
      .map(([name, meta]) => [name, meta, scorer(meta)])
      .sort((a, b) => b[2] - a[2]);
    for (const [name, meta] of fallback) {
      options.push({
        nome: name,
        fascia: formatFascia(meta.tier),
        motivazione: `Upgrade (tier ${oldGpuMeta.tier} → ${meta.tier}).`,
        compatibilita: `Slot PCIe x16. PSU minima ${meta.minPsu}W.`,
      });
    }
    if (options.length > 2) options.length = 2;
  }

  if (options.length === 0) {
    options.push({
      nome: build.gpu,
      fascia: formatFascia(oldGpuMeta.tier),
      motivazione: `La ${build.gpu} (tier ${oldGpuMeta.tier}) è già una delle GPU più performanti disponibili. Nessun upgrade significativo al momento.`,
      compatibilita: "La configurazione GPU attuale è già ottimale.",
    });
  }

  return options;
}

function getCpuRecommendations(build, budgetEur, useCaseKey) {
  const oldCpuMeta = getCpuMeta(build.cpu);

  const useCaseReq = useCaseKey ? USECASE_RECOMMENDATIONS[useCaseKey] : null;
  const budgetCpu = budgetEur != null && budgetEur !== "" ? Number(budgetEur) : null;

  if (!oldCpuMeta) {
    let targetTier;
    if (budgetCpu != null) {
      const range = BUDGET_RANGES.CPU.find(r => budgetCpu <= r.max) || BUDGET_RANGES.CPU[BUDGET_RANGES.CPU.length - 1];
      targetTier = Math.round((range.tiers[0] + range.tiers[1]) / 2);
    } else if (useCaseReq) {
      targetTier = Math.round((useCaseReq.cpuTier[0] + useCaseReq.cpuTier[1]) / 2);
    } else {
      targetTier = 55;
    }
    const scorer = useCaseKey && CPU_SCENARIO_SCORERS[useCaseKey]
      ? (meta, name) => CPU_SCENARIO_SCORERS[useCaseKey](meta, name)
      : (meta, name) => meta.tier;
    const popular = Object.entries(CPU_META)
      .filter(([_, m]) => Math.abs(m.tier - targetTier) <= 15)
      .map(([name, meta]) => [name, meta, scorer(meta, name)])
      .sort((a, b) => b[2] - a[2])
      .slice(0, 2);
    return popular.map(([name, meta]) => ({
      nome: name,
      fascia: formatFascia(meta.tier),
      motivazione: `CPU consigliata per la tua configurazione (tier ${meta.tier}). La CPU attuale non è stata riconosciuta.`,
      compatibilita: `Socket ${meta.socket}. Verifica compatibilità con la motherboard.`,
    }));
  }

  let tierMin, tierMax;
  if (budgetCpu != null) {
    const range = BUDGET_RANGES.CPU.find(r => budgetCpu <= r.max) || BUDGET_RANGES.CPU[BUDGET_RANGES.CPU.length - 1];
    tierMin = range.tiers[0];
    tierMax = range.tiers[1];
  } else {
    tierMin = Math.max(oldCpuMeta.tier + 15, useCaseReq?.cpuTier[0] || 0);
    tierMax = 100;
  }

  const scorer = useCaseKey && CPU_SCENARIO_SCORERS[useCaseKey]
    ? (meta, name) => CPU_SCENARIO_SCORERS[useCaseKey](meta, name)
    : (meta, name) => meta.tier;

  const sameSocket = Object.entries(CPU_META)
    .filter(([_, m]) => m.socket === oldCpuMeta.socket && m.tier >= tierMin && m.tier <= tierMax && m.tier > oldCpuMeta.tier)
    .map(([name, meta]) => [name, meta, scorer(meta, name)])
    .sort((a, b) => b[2] - a[2]);

  const candidates = sameSocket.length > 0 ? sameSocket
    : Object.entries(CPU_META)
        .filter(([_, m]) => m.tier >= tierMin && m.tier <= tierMax && m.tier > oldCpuMeta.tier)
        .map(([name, meta]) => [name, meta, scorer(meta, name)])
        .sort((a, b) => b[2] - a[2]);

  const options = [];
  for (const [name, meta] of candidates) {
    const sameSock = meta.socket === oldCpuMeta.socket;
    const tierDiff = meta.tier - oldCpuMeta.tier;
    options.push({
      nome: name,
      fascia: formatFascia(meta.tier),
      motivazione: `Upgrade significativo (tier ${oldCpuMeta.tier} → ${meta.tier}, +${tierDiff}).${sameSock ? " Stesso socket, nessun cambio motherboard." : " Richiede cambio piattaforma."}`,
      compatibilita: sameSock
        ? `Socket ${oldCpuMeta.socket}. Verifica aggiornamento BIOS della motherboard.`
        : `Richiede motherboard socket ${meta.socket} e RAM DDR${meta.ddr}.`,
    });
    if (options.length >= 2) break;
  }

  if (options.length === 0) {
    const fallback = Object.entries(CPU_META)
      .filter(([_, m]) => m.tier > oldCpuMeta.tier)
      .map(([name, meta]) => [name, meta, scorer(meta, name)])
      .sort((a, b) => b[2] - a[2]);
    for (const [name, meta] of fallback) {
      const sameSock = meta.socket === oldCpuMeta.socket;
      options.push({
        nome: name,
        fascia: formatFascia(meta.tier),
        motivazione: `Upgrade (tier ${oldCpuMeta.tier} → ${meta.tier}).${sameSock ? " Stesso socket." : " Richiede cambio piattaforma."}`,
        compatibilita: sameSock
          ? `Socket ${oldCpuMeta.socket}. Verifica aggiornamento BIOS.`
          : `Richiede motherboard socket ${meta.socket} e RAM DDR${meta.ddr}.`,
      });
    }
    if (options.length > 2) options.length = 2;
  }

  if (options.length === 0) {
    options.push({
      nome: build.cpu,
      fascia: formatFascia(oldCpuMeta.tier),
      motivazione: `La ${build.cpu} (tier ${oldCpuMeta.tier}) è già una delle CPU più performanti disponibili. Nessun upgrade significativo al momento.`,
      compatibilita: "La configurazione CPU attuale è già ottimale.",
    });
  }

  return options;
}

function getMotherboardRecommendations(build, budgetEur, cpuMeta) {
  if (!cpuMeta) return [];
  const chipset = detectChipset(build.motherboard);
  const currentTier = chipset?.tier || 0;
  const socket = cpuMeta.socket;

  const available = getSocketChipsets(socket);
  const candidates = available.filter(([name, meta]) => meta.tier > currentTier + 3);

  const options = [];
  for (const [name, meta] of candidates) {
    const sameDdr = meta.ddr === cpuMeta.ddr;
    options.push({
      nome: `Motherboard ${name} (Socket ${socket}, DDR${meta.ddr}, PCIe ${meta.pcie}.0)`,
      fascia: meta.tier >= 65 ? "alto" : meta.tier >= 40 ? "medio" : "budget",
      motivazione: `Chipset ${name} — upgrade da ${chipset?.chipset || "sconosciuto"} (tier ${currentTier} → ${meta.tier}).${sameDdr ? " Stessa RAM DDR" + meta.ddr + ", mantieni la memoria." : " Richiede RAM DDR" + meta.ddr + "."}`,
      compatibilita: `Socket ${socket}. Verifica formato ATX/mATX/ITX, feature WiFi/BT, e fattore di alimentazione.`,
    });
    if (options.length >= 2) break;
  }

  if (options.length === 0) {
    const topChipset = available[0];
    if (topChipset) {
      const [name, meta] = topChipset;
      options.push({
        nome: `Motherboard ${name} (Socket ${socket}, DDR${meta.ddr}, PCIe ${meta.pcie}.0)`,
        fascia: meta.tier >= 65 ? "alto" : meta.tier >= 40 ? "medio" : "budget",
        motivazione: `La tua motherboard attuale (${chipset?.chipset || "non riconosciuta"}) è già tra le migliori per questo socket. Nessun upgrade significativo.`,
        compatibilita: `Socket ${socket}. Verifica formato ATX/mATX/ITX.`,
      });
    }
  }

  return options;
}

function estimatedLoad(cpuTdp, gpuTdp) {
  return (cpuTdp || 125) + (gpuTdp || 200) + 100;
}

function getGpuMetaFromList(name) {
  return getGpuMeta(name);
}

export function analyzeBuildLocal(build, upgradeTarget, useCase, budgetEur, invalidFields) {
  const cpuMeta = getCpuMeta(build.cpu);
  const gpuMeta = getGpuMeta(build.gpu);
  const psuW = extractWattage(build.psu);
  const ddrGen = detectDdrGen(build.ram);
  const useCaseKey = detectUseCase(useCase);

  const warnings = [];
  const bottlenecks = [];
  const dependentUpgrades = [];
  const upgradeCategories = [];

  // --- Warnings ---
  if (psuW != null) {
    const psuLow = psuW < 400;
    const psuForGpu = gpuMeta && psuW < gpuMeta.minPsu;
    if (psuLow && psuForGpu) {
      warnings.push(`PSU da ${psuW}W — insufficiente per la GPU (min ${gpuMeta.minPsu}W) e troppo bassa, possibile instabilità. Sostituiscila.`);
    } else if (psuForGpu) {
      warnings.push(`PSU da ${psuW}W — insufficiente per la GPU (min ${gpuMeta.minPsu}W). Sostituiscila prima di un upgrade GPU.`);
    } else if (psuLow) {
      warnings.push(`PSU da ${psuW}W — molto bassa, possibile instabilità sotto carico. Considera una sostituzione.`);
    }
  }

  if (cpuMeta && cpuMeta.year <= 2015) {
    warnings.push(`CPU del ${cpuMeta.year} — datata, potrebbe non supportare Windows 11 e limitare le prestazioni.`);
  }

  if (gpuMeta && gpuMeta.year <= 2016) {
    warnings.push(`GPU del ${gpuMeta.year} — nessun supporto a feature moderne (ray tracing, DLSS, mesh shader).`);
  }

  // --- Bottlenecks ---
  if (cpuMeta && gpuMeta) {
    const diff = gpuMeta.tier - cpuMeta.tier;
    if (diff > 20) {
      bottlenecks.push(`[CPU] ${build.cpu} (tier ${cpuMeta.tier}) è molto più debole della ${build.gpu} (tier ${gpuMeta.tier}). La CPU strozza la GPU in gaming e applicazioni grafiche.`);
    } else if (diff < -15) {
      bottlenecks.push(`[GPU] ${build.gpu} (tier ${gpuMeta.tier}) è debole per la CPU. La GPU limita le prestazioni in applicazioni grafiche.`);
    }
  }

  if (useCaseKey && gpuMeta) {
    const req = USECASE_RECOMMENDATIONS[useCaseKey];
    if (gpuMeta.tier < req.gpuTier[0]) {
      bottlenecks.push(`[GPU] ${build.gpu} (tier ${gpuMeta.tier}) è sotto il minimo consigliato per "${useCase}" (tier ${req.gpuTier[0]}+).`);
    }
    if (cpuMeta && cpuMeta.tier < req.cpuTier[0]) {
      bottlenecks.push(`[CPU] ${build.cpu} (tier ${cpuMeta.tier}) è sotto il minimo consigliato per "${useCase}" (tier ${req.cpuTier[0]}+).`);
    }
  }

  if (cpuMeta && cpuMeta.cores <= 4 && cpuMeta.year <= 2017) {
    if (!bottlenecks.some(b => b.startsWith("[CPU]"))) {
      bottlenecks.push(`[CPU] ${build.cpu} — ${cpuMeta.cores} core, anno ${cpuMeta.year}. Obsoleto per gaming moderno e multitasking.`);
    }
  }

  // --- Align assessment with bottlenecks ---
  const hasCpuBottleneck = bottlenecks.some(b => b.startsWith("[CPU]"));
  const hasGpuBottleneck = bottlenecks.some(b => b.startsWith("[GPU]"));

  // --- Upgrade Recommendations ---
  if (upgradeTarget === "Auto") {
    const scoredTargets = [];

    if (cpuMeta && gpuMeta) {
      const cpuGpuGap = gpuMeta.tier - cpuMeta.tier;
      if (cpuGpuGap > 10) {
        scoredTargets.push({ target: "CPU", score: cpuGpuGap, reason: `CPU (${cpuMeta.tier}) debole rispetto alla GPU (${gpuMeta.tier})` });
      } else if (cpuGpuGap < -10) {
        scoredTargets.push({ target: "GPU", score: Math.abs(cpuGpuGap), reason: `GPU (${gpuMeta.tier}) debole rispetto alla CPU (${cpuMeta.tier})` });
      }
    }

    if (useCaseKey && gpuMeta) {
      const req = USECASE_RECOMMENDATIONS[useCaseKey];
      if (gpuMeta.tier < req.gpuTier[0]) {
        scoredTargets.push({ target: "GPU", score: req.gpuTier[0] - gpuMeta.tier + 20, reason: `GPU sotto il minimo per "${useCase}"` });
      }
      if (cpuMeta && cpuMeta.tier < req.cpuTier[0]) {
        scoredTargets.push({ target: "CPU", score: req.cpuTier[0] - cpuMeta.tier + 20, reason: `CPU sotto il minima per "${useCase}"` });
      }
    }

    if (psuW != null && gpuMeta && psuW < gpuMeta.minPsu) {
      scoredTargets.push({ target: "PSU", score: 30, reason: `PSU da ${psuW}W insufficiente per la GPU (min ${gpuMeta.minPsu}W)` });
    }

    if (cpuMeta && cpuMeta.year <= 2015) {
      scoredTargets.push({ target: "CPU", score: 25, reason: `CPU datata (${cpuMeta.year})` });
    }
    if (gpuMeta && gpuMeta.year <= 2016) {
      scoredTargets.push({ target: "GPU", score: 25, reason: `GPU datata (${gpuMeta.year})` });
    }

    scoredTargets.sort((a, b) => b.score - a.score);

    const seen = new Set();
    for (const { target, reason } of scoredTargets) {
      if (seen.has(target)) continue;
      seen.add(target);
      if (target === "GPU") {
        const opts = getGpuRecommendations(build, budgetEur, useCaseKey);
        if (opts.length > 0) upgradeCategories.push({ componente: "GPU", opzioni: opts });
      } else if (target === "CPU") {
        const opts = getCpuRecommendations(build, budgetEur, useCaseKey);
        if (opts.length > 0) upgradeCategories.push({ componente: "CPU", opzioni: opts });
      } else if (target === "PSU") {
        const gpuMin = gpuMeta?.minPsu || 650;
        const cpuTdp = cpuMeta?.tdp || 125;
        const recommended = Math.max(gpuMin, cpuTdp + 300, 650);
        upgradeCategories.push({
          componente: "PSU", opzioni: [
            { nome: `Alimentatore ${recommended}W 80+ Gold modulare`, fascia: "medio", motivazione: `${reason}. Potenza adeguata per GPU (min ${gpuMin}W) e CPU (${cpuTdp}W).`, compatibilita: "Verifica formato ATX/SFX e spazio nel case." },
          ],
        });
      }
    }

    if (upgradeCategories.length === 0) {
      const gpuOpts = getGpuRecommendations(build, budgetEur, useCaseKey);
      if (gpuOpts.length > 0) upgradeCategories.push({ componente: "GPU", opzioni: gpuOpts });
      const cpuOpts = getCpuRecommendations(build, budgetEur, useCaseKey);
      if (cpuOpts.length > 0) upgradeCategories.push({ componente: "CPU", opzioni: cpuOpts });
    }
  }

  if (upgradeTarget === "GPU") {
    const options = getGpuRecommendations(build, budgetEur, useCaseKey);
    if (options.length > 0) {
      upgradeCategories.push({ componente: "GPU", opzioni: options });
      const recGpuMeta = getGpuMetaFromList(options[0].nome);
      const minForNew = recGpuMeta?.minPsu || gpuMeta?.minPsu || 550;
      if (psuW != null && psuW < minForNew) {
        upgradeCategories.push({
          componente: "PSU", opzioni: [{
            nome: `Alimentatore ${Math.max(650, minForNew)}W 80+ Gold modulare`,
            fascia: "medio",
            motivazione: `La PSU da ${psuW}W è insufficiente per la ${options[0].nome} (min ${minForNew}W).`,
            compatibilita: "Verifica formato ATX/SFX e spazio nel case.",
          }],
        });
      }
    }
    if (cpuMeta && gpuMeta && gpuMeta.tier - cpuMeta.tier > 12) {
      const cpuOpts = getCpuRecommendations(build, null, useCaseKey);
      if (cpuOpts.length > 0) {
        upgradeCategories.push({ componente: "CPU", opzioni: cpuOpts.slice(0, 1) });
      }
    }
  }

  if (upgradeTarget === "CPU") {
    const options = getCpuRecommendations(build, budgetEur, useCaseKey);
    if (options.length > 0) {
      upgradeCategories.push({ componente: "CPU", opzioni: options });
    }
    if (cpuMeta && gpuMeta && cpuMeta.tier - gpuMeta.tier > 10) {
      const gpuOpts = getGpuRecommendations(build, budgetEur, useCaseKey);
      if (gpuOpts.length > 0) {
        upgradeCategories.push({ componente: "GPU", opzioni: gpuOpts.slice(0, 1) });
      }
    }
  }

  if (upgradeTarget === "PSU") {
    const gpuMin = gpuMeta?.minPsu || 650;
    const cpuTdp = cpuMeta?.tdp || 125;
    const recommended = Math.max(gpuMin, cpuTdp + 300, 650);
    upgradeCategories.push({
      componente: "PSU", opzioni: [
        { nome: `Alimentatore ${recommended}W 80+ Gold modulare`, fascia: "medio", motivazione: `Potenza adeguata per GPU (min ${gpuMin}W) e CPU (${cpuTdp}W). Sostituisce un PSU insufficiente.`, compatibilita: "Verifica formato ATX/SFX e spazio nel case." },
        { nome: `Alimentatore ${recommended + 100}W 80+ Gold modulare`, fascia: "alto", motivazione: "Margine extra per GPU di fascia alta e upgrade futuri.", compatibilita: "Verifica formato ATX/SFX e spazio nel case." },
      ],
    });
  }

  if (upgradeTarget === "RAM") {
    const gen = ddrGen || (cpuMeta ? cpuMeta.ddr : 4);
    const freq = gen >= 5 ? "6000MHz" : gen === 4 ? "3600MHz" : "1600MHz";
    upgradeCategories.push({
      componente: "RAM", opzioni: [
        { nome: `Kit DDR${gen} 32GB (2x16GB) ${freq} CL${gen >= 5 ? "30" : "18"}`, fascia: "medio", motivazione: "32GB ideali per gaming e produttività.", compatibilita: `Verifica supporto DDR${gen} e profilo XMP/EXPO.` },
        { nome: `Kit DDR${gen} 64GB (2x32GB) ${freq} CL${gen >= 5 ? "30" : "18"}`, fascia: "alto", motivazione: "64GB per montaggio video, rendering e AI.", compatibilita: `Verifica supporto DDR${gen} e capacità massima.` },
      ],
    });
  }

  if (upgradeTarget === "Motherboard") {
    const options = getMotherboardRecommendations(build, budgetEur, cpuMeta);
    if (options.length > 0) {
      upgradeCategories.push({ componente: "Motherboard", opzioni: options });
    }
  }

  // --- Safety net: target must always have at least one recommendation ---
  if (upgradeTarget && !upgradeCategories.some(c => c.componente === upgradeTarget)) {
    const fallbackCategories = {
      GPU: () => {
        const top = Object.entries(GPU_META).sort((a, b) => b[1].tier - a[1].tier).slice(0, 2);
        return top.map(([name, meta]) => ({
          nome: name,
          fascia: formatFascia(meta.tier),
          motivazione: `GPU consigliata (tier ${meta.tier}).${gpuMeta ? ` Attuale ${build.gpu} (tier ${gpuMeta.tier}).` : " GPU attuale non riconosciuta."}`,
          compatibilita: `Slot PCIe x16. PSU minima ${meta.minPsu}W.`,
        }));
      },
      CPU: () => {
        const top = Object.entries(CPU_META).sort((a, b) => b[1].tier - a[1].tier).slice(0, 2);
        return top.map(([name, meta]) => ({
          nome: name,
          fascia: formatFascia(meta.tier),
          motivazione: `CPU consigliata (tier ${meta.tier}).${cpuMeta ? ` Attuale ${build.cpu} (tier ${cpuMeta.tier}).` : " CPU attuale non riconosciuta."}`,
          compatibilita: `Socket ${meta.socket}. Verifica compatibilità con la motherboard.`,
        }));
      },
      Motherboard: () => {
        if (!cpuMeta) return [];
        const top = getSocketChipsets(cpuMeta.socket).slice(0, 2);
        return top.map(([name, meta]) => ({
          nome: `Motherboard ${name} (Socket ${cpuMeta.socket}, DDR${meta.ddr}, PCIe ${meta.pcie}.0)`,
          fascia: meta.tier >= 65 ? "alto" : meta.tier >= 40 ? "medio" : "budget",
          motivazione: `Chipset ${name} (tier ${meta.tier}).${build.motherboard ? ` Attuale: ${build.motherboard}.` : " Motherboard attuale non riconosciuta."}`,
          compatibilita: `Socket ${cpuMeta.socket}. Verifica formato ATX/mATX/ITX.`,
        }));
      },
    };
    const fallbackFn = fallbackCategories[upgradeTarget];
    if (fallbackFn) {
      const fbOptions = fallbackFn();
      if (fbOptions.length > 0) {
        upgradeCategories.push({ componente: upgradeTarget, opzioni: fbOptions });
      }
    }
  }

  // --- Dependent Upgrades ---
  const upgradingGpu = upgradeTarget === "GPU" || upgradeCategories.some(c => c.componente === "GPU");
  const upgradingCpuCat = upgradeCategories.find(c => c.componente === "CPU");
  const gpuCat = upgradeCategories.find(c => c.componente === "GPU");

  if (upgradingGpu && psuW != null && gpuCat?.opzioni?.[0]?.nome) {
    const recGpuMeta = getGpuMetaFromList(gpuCat.opzioni[0].nome);
    if (recGpuMeta && psuW < recGpuMeta.minPsu) {
      dependentUpgrades.push({ componente: "PSU", motivo: `PSU da ${psuW}W insufficiente per la nuova GPU (min ${recGpuMeta.minPsu}W). Serve almeno ${Math.max(650, recGpuMeta.minPsu)}W 80+ Gold.` });
    }
  }

  if (upgradingGpu && psuW != null && gpuMeta && psuW < gpuMeta.minPsu && !dependentUpgrades.some(d => d.componente === "PSU")) {
    dependentUpgrades.push({ componente: "PSU", motivo: `PSU da ${psuW}W già insufficiente per la GPU attuale (min ${gpuMeta.minPsu}W). Sostituiscila prima dell'upgrade.` });
  }

  if (upgradingCpuCat && cpuMeta) {
    const optName = upgradingCpuCat.opzioni[0]?.nome;
    const optCpuMeta = getCpuMeta(optName);
    if (optCpuMeta && optCpuMeta.socket !== cpuMeta.socket) {
      dependentUpgrades.push({ componente: "Motherboard", motivo: `La nuova CPU richiede socket ${optCpuMeta.socket}, l'attuale è ${cpuMeta.socket}.` });
      if (optCpuMeta.ddr !== cpuMeta.ddr) {
        dependentUpgrades.push({ componente: "RAM", motivo: `Nuova piattaforma richiede DDR${optCpuMeta.ddr}, l'attuale è DDR${cpuMeta.ddr}.` });
        dependentUpgrades.push({ componente: "RAM (EXPO/XMP)", motivo: `Attiva il profilo EXPO/XMP nel BIOS per ottenere la frequenza nominale della nuova RAM.` });
      }
    }
    if (optCpuMeta && optCpuMeta.socket === cpuMeta.socket) {
      dependentUpgrades.push({ componente: "BIOS", motivo: `Aggiornamento BIOS probabilmente necessario per supportare ${optName} sulla scheda attuale. Verifica il sito del produttore.` });
      const tdpDiff = optCpuMeta.tdp - cpuMeta.tdp;
      if (tdpDiff >= 15) {
        dependentUpgrades.push({ componente: "Dissipatore", motivo: `TDP passa da ${cpuMeta.tdp}W a ${optCpuMeta.tdp}W (+${tdpDiff}W). Verifica che il dissipatore sia adeguato.` });
      }
      if (psuW != null) {
        const currentLoad = estimatedLoad(cpuMeta.tdp, gpuMeta?.tdp || 200);
        const newLoad = estimatedLoad(optCpuMeta.tdp, gpuMeta?.tdp || 200);
        if (newLoad > psuW * 0.85 && newLoad > currentLoad) {
          dependentUpgrades.push({ componente: "PSU", motivo: `Il carico stimato passa da ~${currentLoad}W a ~${newLoad}W con la nuova CPU. PSU da ${psuW}W potrebbe essere al limite.` });
        }
      }
    }
  }

  if (upgradeTarget === "RAM") {
    const gen = ddrGen || (cpuMeta ? cpuMeta.ddr : 4);
    dependentUpgrades.push({ componente: "RAM (EXPO/XMP)", motivo: `Attiva il profilo ${gen >= 5 ? "EXPO" : "XMP"} nel BIOS per ottenere la frequenza nominale di ${gen >= 5 ? "6000MHz" : gen === 4 ? "3600MHz" : "1600MHz"}.` });
  }

  // --- Assessment ---
  let assessment;
  const cpuAge = cpuMeta ? (CURRENT_YEAR - cpuMeta.year) : null;
  const gpuAge = gpuMeta ? (CURRENT_YEAR - gpuMeta.year) : null;

  if (hasCpuBottleneck && hasGpuBottleneck) {
    assessment = `Sia CPU che GPU creano colli di bottiglia. ${build.cpu} (tier ${cpuMeta.tier}) e ${build.gpu} (tier ${gpuMeta.tier}) sono entrambi sotto il livello per "${useCase || "le tue esigenze"}".`;
  } else if (hasCpuBottleneck) {
    assessment = `La CPU ${build.cpu} (tier ${cpuMeta.tier}) limita il sistema. ${gpuMeta ? `La GPU ${build.gpu} (tier ${gpuMeta.tier}) è ancora valida ma la CPU non tiene il passo.` : ""}`;
  } else if (hasGpuBottleneck) {
    assessment = `La GPU ${build.gpu} (tier ${gpuMeta.tier}) limita il sistema. ${cpuMeta ? `La CPU ${build.cpu} (tier ${cpuMeta.tier}) è adeguata ma la GPU non tiene il passo.` : ""}`;
  } else if (cpuMeta && gpuMeta && cpuAge >= 8 && gpuAge >= 6) {
    assessment = `Configurazione datata — CPU ${cpuMeta.year}, GPU ${gpuMeta.year}. Si consiglia un aggiornamento completo.`;
  } else if (cpuMeta && cpuAge >= 8) {
    assessment = `CPU molto datata (${cpuMeta.year}). Potrebbe non supportare Windows 11 e limitare le prestazioni.`;
  } else if (gpuMeta && gpuAge >= 8) {
    assessment = `GPU molto datata (${gpuMeta.year}). Nessun supporto a feature moderne (ray tracing, DLSS).`;
  } else if (cpuMeta && gpuMeta) {
    const tot = cpuMeta.tier + gpuMeta.tier;
    if (tot >= 140) assessment = `Configurazione di fascia alta, bilanciata per gaming e produttività.`;
    else if (tot >= 90) assessment = `Configurazione di fascia media, adatta a gaming 1080p/1440p e uso quotidiano.`;
    else if (tot >= 50) assessment = `Configurazione di fascia base, adatta a navigazione e ufficio. Limitata per gaming.`;
    else assessment = `Configurazione entry-level. Non adatta a gaming moderno o applicazioni pesanti.`;
  } else {
    assessment = `Configurazione con componenti non completamente riconosciuti. Verifica i nomi inseriti.`;
  }

  if (upgradeTarget) assessment += ` Target upgrade: ${upgradeTarget}.`;
  if (useCase) assessment += ` Uso previsto: "${useCase}".`;

  return {
    analisi_build_attuale: assessment,
    bottleneck_identificati: bottlenecks,
    upgrade_consigliati: upgradeCategories,
    upgrade_dipendenti: dependentUpgrades,
    avvertenze: warnings,
  };
}
