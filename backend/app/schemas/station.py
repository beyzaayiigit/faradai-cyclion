from typing import Literal
from pydantic import BaseModel

PowerType = Literal["AC", "DC", "Mega DC"]
StationStatus = Literal["available", "occupied", "reserved"]


class Station(BaseModel):
    id: str
    name: str
    province: str
    district: str
    lat: float
    lng: float
    powerType: PowerType
    status: StationStatus
    powerKw: int
    queueMinutes: int
    truckCompatible: bool
