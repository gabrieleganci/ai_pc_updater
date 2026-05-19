"""HTTP client for Ollama generate API."""

from __future__ import annotations

import json
from typing import Any

import httpx


class OllamaError(Exception):
    def __init__(self, message: str, error_type: str):
        super().__init__(message)
        self.error_type = error_type


SYSTEM_PROMPT_TEMPLATE = """## Role
You are a hardware consultant specialized in PC configurations. Help users choose the right upgrades for their system.

## Task
You receive the user's current PC configuration and the component they want to upgrade. You must:
1. Analyze the current configuration
2. Identify potential bottlenecks
3. Verify upgrade compatibility with other components
4. Suggest 2-3 upgrade options with different price tiers
5. Report if other components must be upgraded as a consequence

## User's Current Build
- CPU: {cpu}
- GPU: {gpu}
- RAM: {ram}
- Motherboard: {motherboard}
- PSU: {psu}
- Storage: {storage}
- Case: {case}

## Upgrade Target
{upgrade_target}

## Use Case
{use_case}

## Budget
{budget_eur} EUR

## Rules (MANDATORY)
- Only suggest REAL components currently on the market
- Always verify CPU socket and motherboard chipset compatibility
- Always verify PSU wattage supports the total TDP
- If unsure about a compatibility, state it explicitly
- Do NOT recommend unnecessary upgrades

## Output Format
Respond ONLY with valid JSON, no text before or after:
{{
  "analisi_build_attuale": "brief evaluation of current build (in Italian)",
  "bottleneck_identificati": ["list of identified bottlenecks (in Italian)"],
  "upgrade_consigliati": [
    {{
      "componente": "component type",
      "opzioni": [
        {{
          "nome": "real product name currently on the market",
          "fascia": "budget | medio | alto",
          "motivazione": "why this upgrade (in Italian)",
          "compatibilita": "compatibility checks performed (in Italian)"
        }}
      ]
    }}
  ],
  "upgrade_dipendenti": [
    {{
      "componente": "what else needs changing",
      "motivo": "why (in Italian)"
    }}
  ],
  "avvertenze": ["any warnings (in Italian)"]
}}
"""


def build_user_prompt(
    cpu: str,
    gpu: str,
    ram: str,
    motherboard: str,
    psu: str,
    storage: str,
    case: str,
    upgrade_target: str,
    use_case: str,
    budget_eur: str,
) -> str:
    return SYSTEM_PROMPT_TEMPLATE.format(
        cpu=cpu,
        gpu=gpu,
        ram=ram,
        motherboard=motherboard,
        psu=psu,
        storage=storage or "(not specified)",
        case=case or "(not specified)",
        upgrade_target=upgrade_target,
        use_case=use_case or "(not specified)",
        budget_eur=budget_eur,
    )


async def generate_analysis(
    base_url: str,
    model: str,
    prompt: str,
    timeout_seconds: float,
) -> str:
    url = f"{base_url.rstrip('/')}/api/generate"
    body: dict[str, Any] = {
        "model": model,
        "prompt": prompt,
        "stream": False,
    }
    try:
        async with httpx.AsyncClient(timeout=timeout_seconds) as client:
            r = await client.post(url, json=body)
    except httpx.ConnectError as e:
        raise OllamaError("Cannot connect to Ollama. Is it running?", "ollama_unreachable") from e
    except httpx.TimeoutException as e:
        raise OllamaError("Ollama request timed out.", "timeout") from e
    except httpx.RequestError as e:
        raise OllamaError(f"Ollama request failed: {e}", "ollama_unreachable") from e

    if r.status_code == 404:
        text = r.text.lower()
        if "model" in text or "not found" in text:
            raise OllamaError(
                f'Model "{model}" not found. Run: ollama pull {model}',
                "model_not_found",
            )
        raise OllamaError("Ollama returned 404.", "ollama_unreachable")

    if r.status_code >= 400:
        raise OllamaError(
            f"Ollama error HTTP {r.status_code}: {r.text[:500]}",
            "ollama_unreachable",
        )

    try:
        payload = r.json()
    except json.JSONDecodeError as e:
        raise OllamaError("Invalid JSON from Ollama.", "invalid_output") from e

    response_text = payload.get("response")
    if not isinstance(response_text, str):
        raise OllamaError("Missing 'response' field from Ollama.", "invalid_output")
    return response_text


async def check_model_available(base_url: str, model: str, timeout: float = 5.0) -> tuple[bool, bool]:
    """Returns (ollama_reachable, model_available)."""
    tags_url = f"{base_url.rstrip('/')}/api/tags"
    try:
        async with httpx.AsyncClient(timeout=timeout) as client:
            r = await client.get(tags_url)
    except httpx.RequestError:
        return False, False

    if r.status_code != 200:
        return True, False

    try:
        data = r.json()
    except json.JSONDecodeError:
        return True, False

    models = data.get("models") or []
    names = []
    for m in models:
        if isinstance(m, dict) and "name" in m:
            names.append(m["name"])
    # Ollama may return "gemma4:latest"
    available = any(
        n == model or n.startswith(f"{model}:") or n.split(":")[0] == model for n in names
    )
    return True, available
