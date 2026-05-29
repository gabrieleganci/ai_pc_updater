const ALLOWED_FASCE = new Set(["budget", "medio", "alto"]);

const KNOWN_BRANDS = [
  "intel", "amd", "nvidia", "asus", "msi", "gigabyte", "asrock", "corsair",
  "seasonic", "evga", "noctua", "samsung", "wd", "western digital", "crucial",
  "kingston", "seagate", "nzxt", "lian li", "cooler master", "thermaltake",
  "phanteks", "deepcool", "fractal", "gskill", "g.skill", "sapphire",
  "powercolor", "zotac", "pny", "lexar", "adata", "patriot", "razer",
  "be quiet",
];

const HW_KEYWORDS = [
  "core", "i3", "i5", "i7", "i9", "ryzen", "threadripper", "xeon",
  "rtx", "gtx", "rx", "radeon", "geforce", "arc", "iris",
  "ddr", "mhz", "gb", "tb", "nvme", "sata", "pcie",
  "gaming", "pro", "wifi", "plus", "ultra", "ti", "super", "xt", "xtx",
  "gold", "bronze", "plat", "titanium", "modular", "atx", "matx", "itx",
  "led", "rgb", "argb", "liquid", "air", "fan",
];

function looksReasonable(text) {
  if (!text || text.length < 3) return false;
  const lower = text.toLowerCase();
  const hasBrand = KNOWN_BRANDS.some((b) => lower.includes(b));
  if (hasBrand) return true;
  const hasDigit = /\d/.test(text);
  const hasStructure = /[a-z]+\s*-?\s*\d{2,5}[a-z0-9]*/i.test(text);
  if (hasDigit && hasStructure) return true;
  if (/\d+\s*(gb|tb|mhz|w)\b/i.test(text)) return true;
  if (HW_KEYWORDS.some((k) => lower.includes(k)) && hasDigit) return true;
  return false;
}

function validateComponentName(name, category) {
  const issues = [];
  const trimmed = name.trim();

  if (trimmed.length < 4) {
    issues.push(`"${name}" — nome troppo corto per essere un componente reale`);
    return issues;
  }

  if (!looksReasonable(trimmed)) {
    issues.push(`"${name}" — non riconosciuto come componente hardware standard (possibile allucinazione)`);
  }

  const wordCount = trimmed.split(/\s+/).length;
  if (wordCount > 10) {
    issues.push(`"${name}" — nome eccessivamente lungo (${wordCount} parole), possibile allucinazione`);
  }

  return issues;
}

const FASCIA_ALIASES = {
  mid: "medio",
  "mid-range": "medio",
  medium: "medio",
  low: "budget",
  high: "alto",
  "high-end": "alto",
  premium: "alto",
};

function normalizeFascia(value) {
  const v = (value || "").trim().toLowerCase();
  if (ALLOWED_FASCE.has(v)) return v;
  if (v in FASCIA_ALIASES) return FASCIA_ALIASES[v];
  throw new Error(`Invalid fascia: "${value}"`);
}

function coerceStrList(value, field) {
  if (value == null) return [];
  if (Array.isArray(value)) {
    return value
      .map((item, i) => {
        if (typeof item !== "string") throw new Error(`${field}[${i}] must be a string`);
        return item.trim();
      })
      .filter(Boolean);
  }
  if (typeof value === "string") {
    const s = value.trim();
    return s ? [s] : [];
  }
  throw new Error(`${field} must be a list of strings or a string`);
}

function extractJsonObject(text) {
  text = text.trim();
  if (!text) throw new Error("Empty model response");

  try {
    const parsed = JSON.parse(text);
    if (typeof parsed === "object" && !Array.isArray(parsed)) return parsed;
  } catch {
  }

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("No JSON object found in model response");
  }
  const snippet = text.slice(start, end + 1);
  try {
    const parsed = JSON.parse(snippet);
    if (typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Parsed JSON is not an object");
    }
    return parsed;
  } catch (e) {
    throw new Error(`Invalid JSON: ${e.message}`);
  }
}

function parseUpgradeOptions(raw, ctx) {
  if (!Array.isArray(raw)) {
    if (typeof raw === "object" && raw !== null && raw.nome) {
      raw = [raw];
    } else {
      throw new Error(`${ctx}: opzioni must be a list`);
    }
  }

  return raw.map((item, i) => {
    if (typeof item !== "object" || item === null) {
      throw new Error(`${ctx}.opzioni[${i}] must be an object`);
    }
    const nome = String(item.nome || "").trim();
    if (!nome) throw new Error(`${ctx}.opzioni[${i}].nome is required`);
    const fascia = normalizeFascia(item.fascia);
    const motivazione = String(item.motivazione || "").trim();
    const compatibilita = String(item.compatibilita || "").trim();
    if (!motivazione) throw new Error(`${ctx}.opzioni[${i}].motivazione is required`);
    if (!compatibilita) throw new Error(`${ctx}.opzioni[${i}].compatibilita is required`);
    return { nome, fascia, motivazione, compatibilita };
  });
}

function parseUpgradeCategories(raw) {
  if (!Array.isArray(raw)) throw new Error("upgrade_consigliati must be a list");

  return raw.map((item, i) => {
    if (typeof item !== "object" || item === null) {
      throw new Error(`upgrade_consigliati[${i}] must be an object`);
    }
    const componente = String(item.componente || "").trim();
    if (!componente) throw new Error(`upgrade_consigliati[${i}].componente is required`);
    const ctx = `upgrade_consigliati[${i}]`;
    const opzioni = parseUpgradeOptions(item.opzioni, ctx);
    if (opzioni.length === 0) throw new Error(`${ctx}: at least one opzione is required`);
    return {
      componente,
      opzioni: opzioni.slice(0, 3),
    };
  });
}

function parseDependent(raw) {
  if (raw == null) return [];
  if (!Array.isArray(raw)) throw new Error("upgrade_dipendenti must be a list");

  return raw.map((item, i) => {
    if (typeof item !== "object" || item === null) {
      throw new Error(`upgrade_dipendenti[${i}] must be an object`);
    }
    const componente = String(item.componente || "").trim();
    const motivo = String(item.motivo || "").trim();
    if (!componente || !motivo) {
      throw new Error(`upgrade_dipendenti[${i}] requires componente and motivo strings`);
    }
    return { componente, motivo };
  });
}

const OBVIOUSLY_NOT_HARDWARE = [
  /chicken|sandwich|pizza|pasta|food|burger|lunch|dinner|breakfast|fruit|cake|candy/i,
  /shoe.?box|cardboard|trash|garbage|bucket|basket|soap|shampoo/i,
  /^no$/i, /^none$/i, /^n\/a$/i,
  /idk|dunno|lol|lmao|haha|hehe|jk|kekw|wtf|omg/i,
  /^0\s*w$/i,
  /test|testing|placeholder|asdf|qwerty|foobar/i,
  /^1\s*w$/i,
];

const POSITIVE_SIGNALS = [
  "ottima base", "buona configurazione", "solida build", "build solida",
  "ottima build", "configurazione eccellente", "ben bilanciata",
  "ottimo punto di partenza", "base eccellente",
];

function checkInputOutputContradiction(userBuild, analisiText) {
  if (!userBuild) return [];
  const warnings = [];
  const fields = { cpu: userBuild.cpu, gpu: userBuild.gpu, ram: userBuild.ram,
    motherboard: userBuild.motherboard, psu: userBuild.psu,
    storage: userBuild.storage, case: userBuild.case };

  let hasSuspiciousField = false;
  const suspiciousDetails = [];

  for (const [key, val] of Object.entries(fields)) {
    if (!val || !val.trim()) continue;
    const v = val.trim();

    for (const pat of OBVIOUSLY_NOT_HARDWARE) {
      if (pat.test(v)) {
        hasSuspiciousField = true;
        suspiciousDetails.push(`${key.toUpperCase()}: "${v}"`);

        if (/^1\s*w$/i.test(v) || /^0\s*w$/i.test(v)) {
          suspiciousDetails[suspiciousDetails.length - 1] += " (valore impossibile per un PSU)";
        }
        if (/no\s*(storage|ssd|hdd)?$/i.test(v)) {
          suspiciousDetails[suspiciousDetails.length - 1] += " (campo non compilato)";
        }
        break;
      }
    }
  }

  if (hasSuspiciousField) {
    const hasPositive = POSITIVE_SIGNALS.some((s) =>
      analisiText.toLowerCase().includes(s.toLowerCase())
    );

    if (hasPositive) {
      warnings.push(
        `L'analisi definisce la configurazione come positiva ma i seguenti campi contengono valori non realistici: ${suspiciousDetails.join(", ")}. Il modello AI potrebbe non aver riconosciuto input scherzosi.`
      );
    } else {
      warnings.push(
        `Rilevati valori non realistici nei campi: ${suspiciousDetails.join(", ")}. Presta attenzione alle raccomandazioni.`
      );
    }
  }

  return warnings;
}

export function parseAndValidateModelJson(rawText, userBuild) {
  let text = rawText.trim();
  const fenceMatch = text.match(/^```(?:json)?\s*\n?(.*?)\n?```\s*$/is);
  if (fenceMatch) {
    text = fenceMatch[1].trim();
  }

  const data = extractJsonObject(text);

  const analisi = String(data.analisi_build_attuale || "").trim();
  if (!analisi) throw new Error("analisi_build_attuale is required");

  const bottlenecks = coerceStrList(data.bottleneck_identificati, "bottleneck_identificati");
  const upgradeCats = parseUpgradeCategories(data.upgrade_consigliati);
  const dependents = parseDependent(data.upgrade_dipendenti);
  const warnings = coerceStrList(data.avvertenze, "avvertenze");

  const hallWarnings = [];
  for (const cat of upgradeCats) {
    for (const opt of cat.opzioni) {
      const issues = validateComponentName(opt.nome, cat.componente);
      hallWarnings.push(...issues);
    }
  }

  const contradictionWarnings = checkInputOutputContradiction(userBuild, analisi);
  const allWarnings = [...hallWarnings, ...contradictionWarnings, ...warnings];

  return {
    analisi_build_attuale: analisi,
    bottleneck_identificati: bottlenecks,
    upgrade_consigliati: upgradeCats,
    upgrade_dipendenti: dependents,
    avvertenze: allWarnings,
    _hallucination_flags: hallWarnings.length > 0 ? hallWarnings : undefined,
  };
}
