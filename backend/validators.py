"""Validate and normalize Ollama JSON output into AnalysisData."""

from __future__ import annotations

import json
import re
from typing import Any

from pydantic import ValidationError

from models import AnalysisData, DependentUpgrade, UpgradeCategory, UpgradeOption

_ALLOWED_FASCE = frozenset({"budget", "medio", "alto"})


def _extract_json_object(text: str) -> dict[str, Any]:
    text = text.strip()
    if not text:
        raise ValueError("Empty model response")

    try:
        parsed = json.loads(text)
        if isinstance(parsed, dict):
            return parsed
    except json.JSONDecodeError:
        pass

    start = text.find("{")
    end = text.rfind("}")
    if start == -1 or end == -1 or end <= start:
        raise ValueError("No JSON object found in model response")
    snippet = text[start : end + 1]
    try:
        parsed = json.loads(snippet)
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON: {e}") from e
    if not isinstance(parsed, dict):
        raise ValueError("Parsed JSON is not an object")
    return parsed


def _normalize_fascia(value: str) -> str:
    v = (value or "").strip().lower()
    if v in _ALLOWED_FASCE:
        return v
    aliases = {
        "mid": "medio",
        "mid-range": "medio",
        "medium": "medio",
        "low": "budget",
        "high": "alto",
        "high-end": "alto",
        "premium": "alto",
    }
    if v in aliases:
        return aliases[v]
    raise ValueError(f"Invalid fascia: {value!r}")


def _coerce_str_list(value: Any, field: str) -> list[str]:
    if value is None:
        return []
    if isinstance(value, list):
        out: list[str] = []
        for i, item in enumerate(value):
            if not isinstance(item, str):
                raise ValueError(f"{field}[{i}] must be a string")
            s = item.strip()
            if s:
                out.append(s)
        return out
    if isinstance(value, str):
        s = value.strip()
        return [s] if s else []
    raise ValueError(f"{field} must be a list of strings or a string")


def _parse_upgrade_options(raw: Any, ctx: str) -> list[UpgradeOption]:
    if not isinstance(raw, list):
        raise ValueError(f"{ctx}: opzioni must be a list")
    options: list[UpgradeOption] = []
    for i, item in enumerate(raw):
        if not isinstance(item, dict):
            raise ValueError(f"{ctx}.opzioni[{i}] must be an object")
        nome = str(item.get("nome", "")).strip()
        if not nome:
            raise ValueError(f"{ctx}.opzioni[{i}].nome is required")
        fascia_raw = str(item.get("fascia", "")).strip()
        fascia = _normalize_fascia(fascia_raw)
        motivazione = str(item.get("motivazione", "")).strip()
        compatibilita = str(item.get("compatibilita", "")).strip()
        if not motivazione:
            raise ValueError(f"{ctx}.opzioni[{i}].motivazione is required")
        if not compatibilita:
            raise ValueError(f"{ctx}.opzioni[{i}].compatibilita is required")
        options.append(
            UpgradeOption(
                nome=nome,
                fascia=fascia,
                motivazione=motivazione,
                compatibilita=compatibilita,
            )
        )
    if not options:
        raise ValueError(f"{ctx}: at least one opzione is required")
    if len(options) > 3:
        options = options[:3]
    return options


def _parse_upgrade_categories(raw: Any) -> list[UpgradeCategory]:
    if not isinstance(raw, list):
        raise ValueError("upgrade_consigliati must be a list")
    categories: list[UpgradeCategory] = []
    for i, item in enumerate(raw):
        if not isinstance(item, dict):
            raise ValueError(f"upgrade_consigliati[{i}] must be an object")
        componente = str(item.get("componente", "")).strip()
        if not componente:
            raise ValueError(f"upgrade_consigliati[{i}].componente is required")
        ctx = f"upgrade_consigliati[{i}]"
        opzioni = _parse_upgrade_options(item.get("opzioni"), ctx)
        categories.append(UpgradeCategory(componente=componente, opzioni=opzioni))
    if not categories:
        raise ValueError("upgrade_consigliati must not be empty")
    return categories


def _parse_dependent(raw: Any) -> list[DependentUpgrade]:
    if raw is None:
        return []
    if not isinstance(raw, list):
        raise ValueError("upgrade_dipendenti must be a list")
    out: list[DependentUpgrade] = []
    for i, item in enumerate(raw):
        if not isinstance(item, dict):
            raise ValueError(f"upgrade_dipendenti[{i}] must be an object")
        componente = str(item.get("componente", "")).strip()
        motivo = str(item.get("motivo", "")).strip()
        if not componente or not motivo:
            raise ValueError(
                f"upgrade_dipendenti[{i}] requires componente and motivo strings"
            )
        out.append(DependentUpgrade(componente=componente, motivo=motivo))
    return out


def parse_and_validate_model_json(raw_text: str) -> AnalysisData:
    """Parse model output (possibly with markdown fences) into AnalysisData."""
    text = raw_text.strip()
    fence = re.match(r"^```(?:json)?\s*\n?(.*?)\n?```\s*$", text, re.DOTALL | re.IGNORECASE)
    if fence:
        text = fence.group(1).strip()

    data = _extract_json_object(text)

    analisi = str(data.get("analisi_build_attuale", "")).strip()
    if not analisi:
        raise ValueError("analisi_build_attuale is required")

    bottlenecks = _coerce_str_list(data.get("bottleneck_identificati"), "bottleneck_identificati")
    upgrade_cats = _parse_upgrade_categories(data.get("upgrade_consigliati"))
    dependents = _parse_dependent(data.get("upgrade_dipendenti"))
    warnings = _coerce_str_list(data.get("avvertenze"), "avvertenze")

    payload = {
        "analisi_build_attuale": analisi,
        "bottleneck_identificati": bottlenecks,
        "upgrade_consigliati": [c.model_dump() for c in upgrade_cats],
        "upgrade_dipendenti": [d.model_dump() for d in dependents],
        "avvertenze": warnings,
    }

    try:
        return AnalysisData.model_validate(payload)
    except ValidationError as e:
        raise ValueError(str(e)) from e
