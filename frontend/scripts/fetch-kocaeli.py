import json
import time
import urllib.parse
import urllib.request

DISTRICTS = [
    "Gebze",
    "İzmit",
    "Körfez",
    "Derince",
    "Çayırova",
    "Dilovası",
    "Başiskele",
    "Gölcük",
    "Kartepe",
    "Karamürsel",
]

features = []
for name in DISTRICTS:
    params = urllib.parse.urlencode(
        {
            "city": name,
            "state": "Kocaeli",
            "country": "Turkey",
            "format": "geojson",
            "polygon_geojson": 1,
            "limit": 1,
        }
    )
    url = f"https://nominatim.openstreetmap.org/search?{params}"
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "MobiQ-Map-Generator/1.0 (contact@mobiq.local)"},
    )
    with urllib.request.urlopen(req, timeout=60) as response:
        data = json.load(response)

    if not data.get("features"):
        print(f"skip {name}")
        continue

    feature = data["features"][0]
    feature["properties"] = {"name": name}
    features.append(feature)
    print(f"ok {name}")
    time.sleep(1.1)

collection = {"type": "FeatureCollection", "features": features}
out = __file__.replace("fetch-kocaeli.py", "kocaeli-districts.geojson")
with open(out, "w", encoding="utf-8") as f:
    json.dump(collection, f)

print(f"Wrote {len(features)} districts")
