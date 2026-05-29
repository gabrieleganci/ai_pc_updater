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

export async function generateAnalysis(prompt, signal) {
  if (!engine) throw new Error("Modello non caricato");

  const reply = await engine.chat.completions.create(
    {
      messages: [
        { role: "user", content: prompt },
      ],
      temperature: 0.1,
      max_tokens: 1536,
    },
    signal
  );

  const text = reply.choices[0].message.content;
  const lastBrace = text.lastIndexOf("}");
  if (lastBrace !== -1) {
    return text.slice(0, lastBrace + 1);
  }
  return text + "}";
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
