import json
from pathlib import Path

from fastapi import APIRouter, Query

from app.schemas.station import Station

router = APIRouter(prefix="/stations", tags=["stations"])

_DATA = Path(__file__).resolve().parents[2] / "data" / "stations.json"


def _load_stations() -> list[Station]:
    raw = json.loads(_DATA.read_text(encoding="utf-8"))
    return [Station.model_validate(item) for item in raw]


@router.get("", response_model=list[Station])
def list_stations(
    province: str | None = Query(default=None),
    district: str | None = Query(default=None),
    power_type: str | None = Query(default=None, alias="power_type"),
    status: str | None = Query(default=None),
) -> list[Station]:
    items = _load_stations()
    if province:
        items = [s for s in items if s.province == province]
    if district:
        items = [s for s in items if s.district == district]
    if power_type:
        items = [s for s in items if s.powerType == power_type]
    if status:
        items = [s for s in items if s.status == status]
    return items
