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

Nessun dato della tua configurazione lascia il tuo computer. Zero server backend. Zero API key.
Il modello AI viene scaricato una tantum da Hugging Face CDN; i font sono caricati da Google Fonts.
Dopo il primo download, l'app funziona offline.

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

### Test build produzione in locale

```bash
npm run build
npm run preview
```

Apri **`http://localhost:4173/`** nel browser. `vite preview` include gli header COOP/COEP necessari.

### Deploy produzione

Il contenuto della cartella `dist/` può essere deployato su **Vercel**, **Netlify**, **Cloudflare Pages** o qualsiasi web server che supporti header HTTP personalizzati.

> **⚠️ GitHub Pages non è supportato** perché non permette di impostare header HTTP personalizzati. L'app richiede gli header `Cross-Origin-Opener-Policy: same-origin` e `Cross-Origin-Embedder-Policy: require-corp` per funzionare.

I file di configurazione per gli header sono già inclusi nel progetto:
- **Netlify / Cloudflare Pages**: il file `_headers` nella cartella `dist/` viene riconosciuto automaticamente
- **Vercel**: il file `vercel.json` nella root del progetto configura gli header automaticamente

---

## Per sviluppatori

### Struttura del progetto

```
frontend/
├── index.html              # Entry point + WebGPU/COOP detection
├── vite.config.js          # Vite config (COOP/COEP in dev + preview)
├── vercel.json             # Header COOP/COEP per Vercel
├── public/_headers         # Header COOP/COEP per Netlify/Cloudflare Pages
├── package.json
└── src/
    ├── main.jsx            # React mount
    ├── App.jsx             # Root component con model loading state
    ├── App.module.css      # Stili root
    ├── api.js              # Orchestrazione: prompt → modello → validatore
    ├── detectSystem.js     # Rilevamento hardware browser (CPU/GPU/RAM)
    ├── llm.js              # WebLLM engine (caricamento + inferenza WebGPU)
    ├── prompt.js           # Prompt di sistema professionale (italiano)
    ├── validators.js       # Validatore JSON output AI
    ├── worker.js           # Web Worker MLCEngine
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
| `npm run dev` | Avvia server di sviluppo su `localhost:5173` (con COOP/COEP) |
| `npm run build` | Build di produzione in `dist/` |
| `npm run preview` | Server locale per testare la build (con COOP/COEP) |

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
