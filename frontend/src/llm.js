import { CreateWebWorkerMLCEngine } from "@mlc-ai/web-llm";

const MODEL_ID = "gemma-2-2b-it-q4f32_1-MLC";

let engine = null;
let worker = null;
let loadProgress = { loaded: 0, total: 0, text: "" };

export function getLoadProgress() {
  return loadProgress;
}

export function isModelLoaded() {
  return engine !== null;
}

export async function loadModel(onProgress) {
  if (engine) return engine;

  worker = new Worker(new URL("./worker.js", import.meta.url), {
    type: "module",
  });

  engine = await CreateWebWorkerMLCEngine(worker, MODEL_ID, {
    initProgressCallback: (report) => {
      loadProgress = {
        loaded: report.loaded,
        total: report.total,
        text: report.text,
      };
      onProgress?.(loadProgress);
    },
  });

  return engine;
}

function braceBalancedTruncate(text) {
  let depth = 0;
  let inString = false;
  let escape = false;
  let lastBrace = -1;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (escape) { escape = false; continue; }
    if (inString) {
      if (ch === '\\') { escape = true; }
      else if (ch === '"') { inString = false; }
      continue;
    }
    if (ch === '"') { inString = true; continue; }
    if (ch === '{') { depth++; lastBrace = i; }
    else if (ch === '}') { depth--; if (depth === 0) lastBrace = i; }
  }
  if (lastBrace !== -1) {
    return text.slice(0, lastBrace + 1);
  }
  return text;
}

export async function generateAnalysis(prompt, signal) {
  if (!engine) throw new Error("Modello non caricato");

  const reply = await engine.chat.completions.create(
    {
      messages: [
        { role: "user", content: prompt },
      ],
      temperature: 0.1,
      max_tokens: 4096,
    },
    signal
  );

  return braceBalancedTruncate(reply.choices[0].message.content);
}

export async function unloadModel() {
  if (engine) {
    try {
      await engine.unload();
    } catch {
    }
    engine = null;
  }
  if (worker) {
    worker.terminate();
    worker = null;
  }
}

export async function clearModelCache() {
  const keys = await caches.keys();
  for (const key of keys) {
    if (key.includes("webllm") || key.includes("mlc")) {
      await caches.delete(key);
    }
  }
}

export async function verifyComponents(components) {
  if (!engine) throw new Error("Modello non caricato");
  if (!components || components.length === 0) return [];

  const lines = components.map((c, i) => `[${i + 1}] "${c.name}" (categoria: ${c.category || "generico"})`);
  const prompt = `Sei un esperto di hardware PC. Identifica se ogni nome è un componente hardware REALE in commercio.

Regole:
- YES = nome di un prodotto specifico esistente con marca e modello riconoscibile
- NO = nome inventato, insulto, gibberish, marca senza modello, o roba non hardware

Esempio di nomi REALI (YES):
- "NVIDIA GeForce RTX 4090" (marca + modello specifico)
- "AMD Ryzen 7 7800X3D" (marca + modello specifico)
- "Corsair Vengeance DDR5 32GB" (marca + specifiche)
- "Samsung 990 Pro 1TB" (marca + modello + capacità)

Esempio di nomi FALSI (NO):
- "Gozilla" (non è una GPU reale, nome inventato)
- "As Rock Gay" (insulto, non un prodotto reale)
- "Intel" (solo marca, nessun modello specifico)
- "RTX 9090" (modello inesistente)
- "Super Mega Ultra GPU 99999" (nome palesemente inventato)

${lines.join("\n")}

Rispondi SOLO con i numeri e YES/NO, uno per riga, nient'altro.
Esempio risposta:
1. YES
2. NO
3. YES`;

  const reply = await engine.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    temperature: 0.01,
    max_tokens: 256,
  });

  const text = reply.choices[0].message.content;
  const results = components.map((c, i) => {
    const re = new RegExp(`${i + 1}[.\\s]+(YES|NO)`, "i");
    const match = text.match(re);
    const verified = match ? match[1].toUpperCase() === "YES" : false;
    return { ...c, verified };
  });

  return results;
}

export async function isModelCached() {
  try {
    const keys = await caches.keys();
    return keys.some(key => key.includes("webllm") || key.includes("mlc"));
  } catch {
    return false;
  }
}
