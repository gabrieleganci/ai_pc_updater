"""PC Build Advisor — FastAPI application."""

from __future__ import annotations

import os

from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles

from models import AnalyzeErrorResponse, AnalyzeRequest, AnalyzeSuccessResponse, HealthResponse
from ollama_client import OllamaError, build_user_prompt, check_model_available, generate_analysis
from validators import parse_and_validate_model_json

load_dotenv()

OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434").rstrip("/")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "gemma4")
OLLAMA_TIMEOUT = float(os.getenv("OLLAMA_TIMEOUT_SECONDS", "60"))

app = FastAPI(title="PC Build Advisor API", version="1.0.0")

STATIC_DIR = Path(__file__).resolve().parent.parent / "frontend" / "dist"
if STATIC_DIR.is_dir():
    app.mount("/assets", StaticFiles(directory=str(STATIC_DIR / "assets")), name="assets")

    @app.get("/")
    async def index():
        return FileResponse(str(STATIC_DIR / "index.html"))

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content=AnalyzeErrorResponse(
            error="Invalid request: " + exc.errors().__repr__(),
            error_type="validation_error",
        ).model_dump(),
    )


@app.get("/api/health", response_model=HealthResponse)
async def health():
    reachable, available = await check_model_available(OLLAMA_BASE_URL, OLLAMA_MODEL)
    return HealthResponse(
        status="ok",
        ollama=reachable,
        model=OLLAMA_MODEL,
        available=available and reachable,
    )


@app.post("/api/analyze")
async def analyze(body: AnalyzeRequest):
    b = body.current_build
    budget_str = (
        str(int(body.budget_eur))
        if body.budget_eur is not None
        else "(not specified)"
    )
    prompt = build_user_prompt(
        cpu=b.cpu.strip(),
        gpu=b.gpu.strip(),
        ram=b.ram.strip(),
        motherboard=b.motherboard.strip(),
        psu=b.psu.strip(),
        storage=(b.storage or "").strip(),
        case=(b.case or "").strip(),
        upgrade_target=body.upgrade_target,
        use_case=(body.use_case or "").strip(),
        budget_eur=budget_str,
    )

    try:
        raw = await generate_analysis(
            OLLAMA_BASE_URL,
            OLLAMA_MODEL,
            prompt,
            timeout_seconds=OLLAMA_TIMEOUT,
        )
        data = parse_and_validate_model_json(raw)
    except OllamaError as e:
        return JSONResponse(
            status_code=502,
            content=AnalyzeErrorResponse(error=str(e), error_type=e.error_type).model_dump(),  # type: ignore[arg-type]
        )
    except ValueError as e:
        return JSONResponse(
            status_code=422,
            content=AnalyzeErrorResponse(
                error=str(e),
                error_type="invalid_output",
            ).model_dump(),
        )

    return AnalyzeSuccessResponse(data=data).model_dump()
