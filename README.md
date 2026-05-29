# PC Build Advisor

> Analizza la tua configurazione PC e ricevi raccomandazioni di upgrade intelligenti — tutto nel browser tramite WebGPU, senza server né installazioni backend.

---

## Come funziona

Inserisci le specifiche del tuo PC, seleziona il componente da aggiornare, e un modello AI (Gemma 2 2B) eseguito interamente nel browser via WebGPU genera un report con:

- **Analisi compatibilità** — socket, TDP, spazio case, interfacce
- **Rilevamento bottleneck** — CPU bound, GPU bound, RAM, storage
- **Raccomandazioni motivate** — 2-3 opzioni per fascia budget/medio/alto
- **Upgrade dipendenti** — componenti da cambiare per supportare l'upgrade
- **Avvertenze** — rischi e informazioni mancanti

Nessun dato lascia il tuo computer. Zero server. Zero API key.

---

## Requisiti

- **Browser**: Chrome 113+, Edge 113+, Opera 99+ (WebGPU)
- **GPU**: 4+ GB VRAM raccomandati (il modello occupa ~2.5 GB di VRAM)
- **Spazio disco**: ~2 GB liberi per il download una tantum del modello
- **Internet**: solo per il primo avvio (download del modello); poi funziona offline

---

## Avvio rapido (su qualsiasi PC)

Clona o copia la cartella `frontend/`, poi:

```bash
cd frontend
npm install
npm run dev
```

Apri **`http://localhost:5173/`** nel browser.

Al primo avvio vedrai una schermata **"Preparazione PC Build Advisor"** con una barra di progresso — il modello AI (~2 GB) viene scaricato da Hugging Face e cachato nel browser. Le successive aperture saranno immediate.

### Build produzione (static hosting)

```bash
npm run build
```

Il contenuto della cartella `dist/` è un sito statico pronto per essere deployato su **GitHub Pages**, **Vercel**, **Netlify**, **Cloudflare Pages** o qualsiasi web server.

---

## Per sviluppatori

### Struttura del progetto

```
frontend/
├── index.html              # Entry point + WebGPU detection
├── vite.config.js          # Vite config
├── package.json
└── src/
    ├── main.jsx            # React mount
    ├── App.jsx             # Root component con model loading state
    ├── App.module.css      # Stili root
    ├── api.js              # Orchestrazione: prompt → modello → validatore
    ├── llm.js              # WebLLM engine (caricamento + inferenza WebGPU)
    ├── prompt.js           # Prompt di sistema professionale (italiano)
    ├── validators.js       # Validatore JSON output AI
    ├── styles/global.css   # Design tokens (dark theme)
    └── components/
        ├── BuildForm.jsx           # Form input configurazione
        ├── LoadingState.jsx        # Stato analisi in corso
        ├── ModelLoadingScreen.jsx  # Schermata download modello
        ├── ResultsReport.jsx       # Report risultati
        ├── BottleneckCard.jsx      # Card bottleneck
        ├── RecommendationsCard.jsx # Card raccomandazioni
        ├── DependentUpgradesCard.jsx # Card upgrade dipendenti
        ├── WarningsCard.jsx        # Card avvertenze
        ├── DisclaimerBanner.jsx    # Banner disclaimer
        ├── ErrorBoundary.jsx       # Gestione errori React
        └── Header.jsx              # Header app
```

### Comandi principali

| Comando | Cosa fa |
|---------|---------|
| `npm run dev` | Avvia server di sviluppo su `localhost:5173` |
| `npm run build` | Build di produzione in `dist/` |
| `npm run preview` | Server locale per testare la build |

### Flusso dati

```
BuildForm → api.js → prompt.js (costruisce prompt)
                    → llm.js (inferenza WebGPU su Gemma 2 2B)
                    → validators.js (valida output JSON)
                    → ResultsReport (render risultati)
```

### Tecnologie

- **Runtime AI**: [WebLLM](https://github.com/mlc-ai/web-llm) v0.2.84 (`@mlc-ai/web-llm`)
- **Modello**: `gemma-2-2b-it-q4f32_1-MLC` (Google Gemma 2 2B, q4f32, ~2 GB)
- **Frontend**: React 18 + Vite 6 + CSS Modules
- **Icone**: Lucide React
- **Hosting**: Statico (GitHub Pages, Vercel, Netlify, Cloudflare Pages)

---

## Troubleshooting

| Problema | Soluzione |
|----------|-----------|
| Schermata "WebGPU non supportato" | Usa Chrome/Edge 113+ o Opera 99+. Aggiorna il browser. |
| Download modello non parte | Controlla la connessione. Il modello viene da Hugging Face CDN. |
| Download modello fallito | Ricarica la pagina (Ctrl+F5). C'è un pulsante "Riprova". |
| Analisi molto lenta | Chiudi altre schede/app che usano la GPU. Attendere fino a 120s. |
| Pagina bianca all'apertura | Assicurati di usare `http://localhost:5173/` (non aprire il file diretto). |

---

## Licenza

MIT

---

*Built by Gabriele Ganci — AI Projects Development, ITS ICT Academy Roma*
