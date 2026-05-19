# PC Build Advisor

> An AI-powered hardware upgrade advisor that analyzes your current PC configuration and provides intelligent upgrade recommendations with compatibility analysis and detailed reasoning — all running locally via Ollama and Gemma 4.

---

## Overview

PC Build Advisor helps PC enthusiasts and IT technicians make informed hardware upgrade decisions. Instead of manually scouring forums, review sites, and compatibility checkers, users simply input their current build, select a component to upgrade, and receive a structured report with:

- **Compatibility analysis** — checks if the new component works with existing hardware
- **Bottleneck detection** — identifies performance-limiting components
- **Dependent upgrades** — flags other components that may also need upgrading
- **Motivated recommendations** — 2–3 upgrade options across budget/medium/high tiers
- **Warnings & disclaimers** — compatibility risks clearly called out

---

## How It Works

```
[User enters build specs + upgrade target]
       ↓
[React frontend sends JSON payload]
       ↓
[Python backend structures the request]
       ↓
[Ollama / Gemma 4 analyzes compatibility]
       ↓
[Validator checks AI output format & coherence]
       ↓
[Formatted report returned to user]
```

---

## Tech Stack

| Area             | Choice                        | Rationale                              |
| ---------------- | ----------------------------- | -------------------------------------- |
| Frontend         | React                         | Mature ecosystem, component-based UI   |
| Backend          | Python (Flask/FastAPI)        | Native Ollama client integration       |
| AI Provider      | Ollama (local)                | Zero API costs, data stays local       |
| AI Model         | Gemma 4 (Q4_K_M quantized)    | Best accuracy/resource tradeoff        |
| Database         | JSON (local file)             | Lightweight, no DBMS required          |

All data stays **local** — no personal information is collected or sent to external services.

---

## MVP Features

- **Build input form** — CPU, GPU, RAM, motherboard, PSU, storage, case
- **Upgrade target selection** — choose which component to analyze
- **AI-powered analysis** — compatibility, bottlenecks, and dependencies via Gemma 4
- **Structured output** — recommendations with motivations and compatibility notes
- **Disclaimer** — clear warning to verify compatibility before purchasing

### Out of Scope (v1)

- User accounts & build saving
- E-commerce integration
- Performance benchmarking
- Mobile app (responsive design covers mobile)
- Community reviews
- Price history tracking

---

## Getting Started

### Prerequisites

- [Ollama](https://ollama.ai) installed and running
- Gemma 4 model pulled (`ollama pull gemma4`)
- Python 3.10+
- Node.js 18+

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/pc-build-advisor.git
cd pc-build-advisor

# Backend setup
cd backend
pip install -r requirements.txt

# Frontend setup
cd ../frontend
npm install
```

### Running

```bash
# Start Ollama (if not already running)
ollama serve

# Start backend
cd backend
python app.py

# Start frontend (separate terminal)
cd frontend
npm start
```

Set `OLLAMA_HOST=http://localhost:11434` in your environment if needed.

---

## API Payload Example

```json
{
  "current_build": {
    "cpu": "Intel i5-12400F",
    "gpu": "NVIDIA RTX 3060",
    "ram": "16GB DDR4 3200MHz",
    "motherboard": "MSI B660M-A Pro",
    "psu": "Corsair CV650 650W",
    "storage": "Samsung 970 EVO 1TB",
    "case": "NZXT H510"
  },
  "upgrade_target": "GPU",
  "use_case": "Gaming 1440p",
  "budget_eur": 800
}
```

---

## Validation & Quality

- **JSON schema validation** — AI output must match the expected structure
- **Hallucination checking** — component names verified against a grounding database
- **80% accuracy target** — manual review on a test set of 10 configurations
- **Max 60s response time** — enforced timeout with retry logic

---

## Error Handling

| Scenario                    | Behavior                              |
| --------------------------- | ------------------------------------- |
| Ollama unreachable          | Clear instructions to start Ollama    |
| Model not found             | Command to pull the model             |
| Invalid AI output           | Retry with reinforced prompt (max 2)  |
| Missing required input      | Field-specific validation error       |
| Request timeout (>60s)      | Retry suggestion                      |

---

## Roadmap

- **v1** — MVP with core upgrade analysis (current)
- **v2** — User accounts, build saving, e-commerce links
- **v3** — Performance benchmarking, price history tracking

---

## License

MIT

---

*Built with ❤️ by Gabriele Ganci — AI Projects Development, ITS ICT Academy Roma*
