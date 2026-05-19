from typing import Literal, Optional

from pydantic import BaseModel, Field


class CurrentBuild(BaseModel):
    cpu: str = Field(..., min_length=1)
    gpu: str = Field(..., min_length=1)
    ram: str = Field(..., min_length=1)
    motherboard: str = Field(..., min_length=1)
    psu: str = Field(..., min_length=1)
    storage: Optional[str] = None
    case: Optional[str] = None


UpgradeTarget = Literal["CPU", "GPU", "RAM", "Motherboard", "PSU", "Storage"]


class AnalyzeRequest(BaseModel):
    current_build: CurrentBuild
    upgrade_target: UpgradeTarget
    use_case: Optional[str] = None
    budget_eur: Optional[float] = Field(default=None, ge=0)


class UpgradeOption(BaseModel):
    nome: str
    fascia: str
    motivazione: str
    compatibilita: str


class UpgradeCategory(BaseModel):
    componente: str
    opzioni: list[UpgradeOption]


class DependentUpgrade(BaseModel):
    componente: str
    motivo: str


class AnalysisData(BaseModel):
    analisi_build_attuale: str
    bottleneck_identificati: list[str]
    upgrade_consigliati: list[UpgradeCategory]
    upgrade_dipendenti: list[DependentUpgrade]
    avvertenze: list[str]


class AnalyzeSuccessResponse(BaseModel):
    success: Literal[True] = True
    data: AnalysisData


class AnalyzeErrorResponse(BaseModel):
    success: Literal[False] = False
    error: str
    error_type: Literal[
        "ollama_unreachable",
        "model_not_found",
        "invalid_output",
        "timeout",
        "validation_error",
    ]


class HealthResponse(BaseModel):
    status: str
    ollama: bool
    model: str
    available: bool
