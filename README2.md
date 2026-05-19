# PC Build Advisor

Full-stack app: **React (Vite)** frontend and **FastAPI** backend. It sends your build and upgrade target to **Ollama** (`gemma4`) and returns a structured upgrade report (Italian text from the model, English UI).

## Prerequisites

- Python 3.10+ (including 3.14; use the pinned `requirements.txt` so wheels match your interpreter)
- Node.js 18+
- [Ollama](https://ollama.ai) running locally
- Model pulled: `ollama pull gemma4`

## Project layout

```
pc-build-advisor/
├── frontend/     # Vite + React
├── backend/      # FastAPI
└── README.md
```

## Backend

```bash
cd pc-build-advisor/backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

Copy `backend/.env.example` to `backend/.env` and adjust if needed:

- `OLLAMA_BASE_URL` (default `http://localhost:11434`)
- `OLLAMA_MODEL` (default `gemma4`)
- `OLLAMA_TIMEOUT_SECONDS` (default `60`)

Run:

```bash
uvicorn app:app --reload --host 127.0.0.1 --port 8000
```

Endpoints:

- `GET /api/health` — Ollama reachability and model availability
- `POST /api/analyze` — analyze payload (see prompt in `ollama_client.py`)

## Frontend

```bash
cd pc-build-advisor/frontend
npm install
npm run dev
```

Vite proxies `/api` to `http://127.0.0.1:8000`. Open the printed local URL (usually `http://localhost:5173`).

Production build:

```bash
npm run build
npm run preview
```

Serve the built static files behind a reverse proxy that also forwards `/api` to the FastAPI service, or configure your production API base URL accordingly.

## License

MIT
