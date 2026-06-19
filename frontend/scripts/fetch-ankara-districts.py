"""Fetch Ankara district polygons from Nominatim (OSM)."""
import json
import time
import urllib.parse
import urllib.request

DISTRICTS = [
    "Akyurt",
    "Altındağ",
    "Ayaş",
    "Bala",
    "Beypazarı",
    "Çamlıdere",
    "Çankaya",
    "Çubuk",
    "Elmadağ",
    "Etimesgut",
    "Evren",
    "Gölbaşı",
    "Güdül",
    "Haymana",
    "Kahramankazan",
    "Kalecik",
    "Keçiören",
    "Kızılcahamam",
    "Mamak",
    "Nallıhan",
    "Polatlı",
    "Pursaklar",
    "Sincan",
    "Şereflikoçhisar",
    "Yenimahalle",
]

features = []
for name in DISTRICTS:
    params = urllib.parse.urlencode(
        {
            "city": name,
            "state": "Ankara",
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
    try:
        with urllib.request.urlopen(req, timeout=60) as response:
            data = json.load(response)
    except Exception as exc:
        print(f"fail {name}: {exc}")
        time.sleep(1.1)
        continue

    if not data.get("features"):
        print(f"skip {name}")
        time.sleep(1.1)
        continue

    feature = data["features"][0]
    feature["properties"] = {"name": name}
    features.append(feature)
    print(f"ok {name}")
    time.sleep(1.1)

collection = {"type": "FeatureCollection", "features": features}
out = __file__.replace("fetch-ankara-districts.py", "ankara-districts.geojson")
with open(out, "w", encoding="utf-8") as f:
    json.dump(collection, f)

print(f"Wrote {len(features)} districts to {out}")
