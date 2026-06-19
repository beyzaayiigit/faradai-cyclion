"""Generate mobiq-content.json, merge stations, create ankara-districts.geojson."""
import json
import zipfile
import xml.etree.ElementTree as ET
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "src" / "data"
SCRIPTS = ROOT / "scripts"
PUBLIC = ROOT / "public" / "data"

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
NS = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}


def parse_word_doc(docx_path: Path) -> dict[str, list[str]]:
    root = ET.fromstring(zipfile.ZipFile(docx_path).read("word/document.xml"))
    groups: dict[str, list[str]] = defaultdict(list)
    current = "intro"
    for para in root.iter(f"{W}p"):
        parts: list[str] = []
        highlight = None
        for r in para.iter(f"{W}r"):
            t = r.find("w:t", NS)
            if t is None or not t.text:
                continue
            parts.append(t.text)
            r_pr = r.find("w:rPr", NS)
            if r_pr is not None:
                h = r_pr.find("w:highlight", NS)
                if h is not None and h.get(f"{W}val"):
                    highlight = h.get(f"{W}val")
        line = "".join(parts).strip()
        if not line:
            continue
        if highlight:
            current = highlight
        groups[current].append(line)
    return groups


def merge_stations() -> list[dict]:
    demo = json.loads((DATA / "stations.json").read_text(encoding="utf-8"))
    real_path = Path(r"d:/DOWNLOADS/stations (1).json")
    real = json.loads(real_path.read_text(encoding="utf-8"))
    merged = demo + real
    (DATA / "stations.json").write_text(
        json.dumps(merged, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    return merged


def _norm_title(s: str) -> str:
    return s.lower().replace("?", "").strip()


def lines_to_card(card_title: str, lines: list[str]) -> dict | None:
    if not lines:
        return None
    first = lines[0].strip()
    # İlk satır kart başlığıyla aynıysa tekrar etme; içerik bir sonraki satırdan
    if _norm_title(first) == _norm_title(card_title) or first == card_title:
        body = lines[1] if len(lines) > 1 else first
        bullets = lines[2:] if len(lines) > 2 else []
    else:
        # Bölüm başlığı (ör. "Şarj İstasyonları Nasıl Çalışır?") gövdede kalsın
        body = first
        bullets = lines[1:]
    return {"title": card_title, "body": body, "bullets": bullets}


def build_mobiq_content(groups: dict[str, list[str]]) -> None:
    # Word highlight gruplarına göre doğrulanmış satır aralıkları
    card_splits = {
        "yellow": [
            ("Elektrik Nedir?", 1, 4),
            ("Trafo Nedir?", 4, 12),
        ],
        "green": [
            ("Şebekeye Ulaşım", 0, 4),
            ("Araçlarda Enerji", 4, 12),
        ],
        "cyan": [
            ("Şarj İstasyonları", 0, 9),
            ("AC Şarj", 11, 18),
            ("DC Şarj", 18, 26),
        ],
        "darkGray": [
            ("Akıllı İstasyonlar", 0, 9),
            ("Rezervasyon Sistemi", 9, 18),
        ],
        "magenta": [
            ("Energy Hub", 0, 11),
            ("Güneş & Depolama", 11, 19),
        ],
        "red": [("Geleceğin Ekosistemi", 0, 11)],
    }
    meta = {
        "yellow": ("Temel", "Enerjinin Yolculuğu", "Şebekeden aracınıza: elektrik, trafo ve altyapı temelleri.", "primary"),
        "green": ("Enerji", "Enerji & Batarya", "Elektriğin şehirlere ulaşımı ve araç bataryalarında depolanması.", "secondary"),
        "cyan": ("Şarj", "Şarj Altyapısı", "İstasyonların çalışma mantığı ve AC/DC şarj yöntemleri.", "glow"),
        "darkGray": ("Platform", "MobiQ Yazılımı", "Akıllı istasyon yönetimi ve rezervasyon.", "muted"),
        "magenta": ("Hub", "MobiQ Energy Hub", "Geleceğin enerji merkezleri: üretim, depolama, yönetim.", "primary"),
        "red": ("Vizyon", "Geleceğin Ekosistemi", "Mobilite, depolama ve akıllı şehirlerin tek ağda buluşması.", "vision"),
    }
    sections = []
    for key in ["yellow", "green", "cyan", "darkGray", "magenta", "red"]:
        lines = groups[key]
        label, title, desc, accent = meta[key]
        cards = []
        for card_title, start, end in card_splits[key]:
            chunk = lines[start:end]
            card = lines_to_card(card_title, chunk)
            if card:
                cards.append(card)
        sections.append(
            {
                "id": key,
                "label": label,
                "title": title,
                "description": desc,
                "accent": accent,
                "cards": cards,
            }
        )
    payload = {
        "introTitle": groups["intro"][0],
        "introSubtitle": groups["yellow"][0] if groups["yellow"] else "",
        "sections": sections,
    }
    (DATA / "mobiq-content.json").write_text(
        json.dumps(payload, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


def main() -> None:
    docx = Path(r"d:/DOWNLOADS/FARADAİ (1).docx")
    groups = parse_word_doc(docx)
    build_mobiq_content(groups)
    merged = merge_stations()
    print(f"OK: {len(merged)} stations, {len(groups)} word groups")
    print("Ankara ilçe sınırları için: python scripts/fetch-ankara-districts.py && npm run generate:map")


if __name__ == "__main__":
    main()
