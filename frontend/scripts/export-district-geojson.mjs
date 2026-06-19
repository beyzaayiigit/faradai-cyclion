import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { bbox } from "@turf/turf";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../public/data");

function slugify(name) {
  return name
    .replace(/İ/g, "i")
    .replace(/I/g, "i")
    .replace(/ı/g, "i")
    .replace(/Ğ/g, "g")
    .replace(/ğ/g, "g")
    .replace(/Ü/g, "u")
    .replace(/ü/g, "u")
    .replace(/Ş/g, "s")
    .replace(/ş/g, "s")
    .replace(/Ö/g, "o")
    .replace(/ö/g, "o")
    .replace(/Ç/g, "c")
    .replace(/ç/g, "c")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function exportWithIds(inputName, outputName) {
  const raw = JSON.parse(
    readFileSync(join(__dirname, inputName), "utf-8"),
  );
  for (const feature of raw.features) {
    const name = feature.properties?.name ?? "Unknown";
    feature.properties = { name, id: slugify(name) };
  }
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, outputName), JSON.stringify(raw));
  const [minX, minY, maxX, maxY] = bbox(raw);
  const pad = 0.04;
  return [
    [minX - pad, minY - pad],
    [maxX + pad, maxY + pad],
  ];
}

const istanbulBounds = exportWithIds(
  "istanbul-districts.geojson",
  "istanbul-districts.geojson",
);
const kocaeliBounds = exportWithIds(
  "kocaeli-districts.geojson",
  "kocaeli-districts.geojson",
);
const ankaraBounds = exportWithIds(
  "ankara-districts.geojson",
  "ankara-districts.geojson",
);

writeFileSync(
  join(__dirname, "../src/data/district-bounds.json"),
  JSON.stringify({
    istanbul: istanbulBounds,
    kocaeli: kocaeliBounds,
    ankara: ankaraBounds,
  }),
);

console.log("Exported district GeoJSON to public/data/");
