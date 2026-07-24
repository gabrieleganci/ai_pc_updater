const FORMAT_PROMPT = `Sei un consulente hardware che scrive in italiano. Riscrivi la valutazione tecnica in modo naturale e conciso.

Regole:
- Usa SOLO i dati forniti, non inventare
- Massimo 3-4 frasi per l'analisi, 1 frase per avvertenza
- Menziona sempre il componente target dell'upgrade

## OUTPUT JSON

{
  "analisi_build_attuale": "analisi concisa (max 4 frasi)",
  "avvertenze": ["max 3 avvertenze"]
}`;
export function buildUserPrompt({
  cpu, gpu, ram, motherboard, psu, storage, case: caseStr,
  upgrade_target, use_case, budget_eur,
  invalidFields, localAnalysis,
}) {
  const sections = [
    "--- CONFIGURAZIONE ---",
    `CPU: ${cpu} | GPU: ${gpu} | RAM: ${ram} | Mobo: ${motherboard} | PSU: ${psu}`,
  ];
  if (storage) sections[0] += ` | Storage: ${storage}`;
  if (caseStr) sections[0] += ` | Case: ${caseStr}`;

  sections.push(`Target: ${upgrade_target}${use_case ? ` | Uso: ${use_case}` : ""}${budget_eur ? ` | Budget: ${budget_eur}€` : ""}`);

  if (invalidFields && invalidFields.length > 0) {
    sections.push(`Non riconosciuti: ${invalidFields.map(f => `${f.category}="${f.value}"`).join(", ")}`);
  }

  sections.push("");

  if (localAnalysis) {
    sections.push(`Analisi: ${localAnalysis.analisi_build_attuale}`);

    const topBottlenecks = (localAnalysis.bottleneck_identificati || []).slice(0, 2);
    if (topBottlenecks.length > 0) {
      sections.push(`Bottleneck: ${topBottlenecks.join("; ")}`);
    }

    const topRecs = (localAnalysis.upgrade_consigliati || [])
      .flatMap(cat => cat.opzioni.slice(0, 1).map(o => `${cat.componente}: ${o.nome}`))
      .slice(0, 3);
    if (topRecs.length > 0) {
      sections.push(`Upgrade: ${topRecs.join("; ")}`);
    }

    const topDeps = (localAnalysis.upgrade_dipendenti || []).slice(0, 2);
    if (topDeps.length > 0) {
      sections.push(`Dipendenti: ${topDeps.map(d => `${d.componente}: ${d.motivo}`).join("; ")}`);
    }

    const topWarnings = (localAnalysis.avvertenze || []).slice(0, 3);
    if (topWarnings.length > 0) {
      sections.push(`Avvertenze: ${topWarnings.join("; ")}`);
    }
  }

  return FORMAT_PROMPT + "\n\n" + sections.join("\n") + "\n\nRiscrivi in italiano naturale. Solo JSON.";
}
