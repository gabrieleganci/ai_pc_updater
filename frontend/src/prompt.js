const FORMAT_PROMPT = `Sei un consulente hardware che scrive in italiano. Il tuo compito è SOLO riscrivere in modo naturale la valutazione tecnica che ti viene fornita.

Non inventare nulla. Non aggiungere informazioni. Usa SOLO i dati che ricevi.

## OUTPUT JSON (sempre valido)

{
  "analisi_build_attuale": "testo riscritto in modo naturale",
  "avvertenze": ["testo"]
}

## INPUT
`;
export function buildUserPrompt({
  cpu, gpu, ram, motherboard, psu, storage, case: caseStr,
  upgrade_target, use_case, budget_eur,
  invalidFields, localAnalysis,
}) {
  const sections = [
    "--- CONFIGURAZIONE ATTUALE ---",
    `CPU: ${cpu}`,
    `GPU: ${gpu}`,
    `RAM: ${ram}`,
    `Motherboard: ${motherboard}`,
    `PSU: ${psu}`,
  ];
  if (storage) sections.push(`Storage: ${storage}`);
  if (caseStr) sections.push(`Case: ${caseStr}`);
  sections.push("");

  if (invalidFields && invalidFields.length > 0) {
    sections.push("--- COMPONENTI NON RICONOSCIUTI ---");
    for (const f of invalidFields) {
      sections.push(`${f.category}: "${f.value}" — non riconosciuto`);
    }
    sections.push("");
  }

  sections.push(`--- RICHIESTA ---`);
  sections.push(`Aggiornare: ${upgrade_target}`);
  if (use_case) sections.push(`Uso: ${use_case}`);
  if (budget_eur != null) sections.push(`Budget: ${budget_eur} EUR`);

  if (localAnalysis) {
    sections.push("");
    sections.push("--- VALUTAZIONE TECNICA (usa questi dati, non inventare) ---");
    sections.push(`Valutazione: ${localAnalysis.analisi_build_attuale}`);

    if (localAnalysis.bottleneck_identificati?.length > 0) {
      sections.push("Colli di bottiglia:");
      for (const b of localAnalysis.bottleneck_identificati) sections.push(`- ${b}`);
    }

    if (localAnalysis.upgrade_consigliati?.length > 0) {
      sections.push("Raccomandazioni:");
      for (const cat of localAnalysis.upgrade_consigliati) {
        for (const opt of cat.opzioni) {
          sections.push(`- ${cat.componente}: ${opt.nome} (${opt.fascia}) — ${opt.motivazione}`);
        }
      }
    }

    if (localAnalysis.upgrade_dipendenti?.length > 0) {
      sections.push("Upgrade dipendenti:");
      for (const d of localAnalysis.upgrade_dipendenti) sections.push(`- ${d.componente}: ${d.motivo}`);
    }

    if (localAnalysis.avvertenze?.length > 0) {
      sections.push("Avvertenze:");
      for (const w of localAnalysis.avvertenze) sections.push(`- ${w}`);
    }
  }

  return FORMAT_PROMPT + "\n" + sections.join("\n") + "\n\nOra riscrivi la valutazione in italiano naturale. Restituisci SOLO il JSON.";
}
