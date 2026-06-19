import { readFileSync, writeFileSync } from "fs";
import { bbox, center } from "@turf/turf";
import simplify from "@turf/simplify";
import { geoBounds, geoCentroid, geoMercator, geoPath } from "d3-geo";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

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

function projectFeatures(features, width, height, padding = 12) {
  const collection = { type: "FeatureCollection", features };
  const projection = geoMercator().fitExtent(
    [
      [padding, padding],
      [width - padding, height - padding],
    ],
    collection,
  );
  const pathGen = geoPath(projection);
  return { projection, pathGen, collection };
}

function simplifyFeature(feature) {
  try {
    return simplify(feature, { tolerance: 0.002, highQuality: false });
  } catch {
    return feature;
  }
}

function getCenter(feature) {
  const c = center(feature);
  return c.geometry.coordinates;
}

function featureToShape(feature, pathGen, projection) {
  const [lx, ly] = projection(getCenter(feature));
  const name =
    feature.properties?.name ??
    feature.properties?.Name ??
    feature.properties?.ilce ??
    feature.properties?.ILCE ??
    "Unknown";
  return {
    id: slugify(name),
    name,
    path: pathGen(feature) ?? "",
    labelX: lx,
    labelY: ly,
  };
}

// Turkey provinces (81 il)
const trRaw = JSON.parse(
  readFileSync(join(__dirname, "tr-provinces.geojson"), "utf-8"),
);
const TR_SIZE = [1000, 520];
const trProj = projectFeatures(trRaw.features, ...TR_SIZE);

const turkeyProvinces = trRaw.features.map((f) =>
  featureToShape(f, trProj.pathGen, trProj.projection),
);

const turkeyOutline = trProj.pathGen(trProj.collection);

// Istanbul districts
const istRaw = JSON.parse(
  readFileSync(join(__dirname, "istanbul-districts.geojson"), "utf-8"),
);
const IST_SIZE = [800, 520];
const istProj = projectFeatures(istRaw.features, ...IST_SIZE);

const istanbulDistricts = istRaw.features.map((f) => {
  const simple = simplifyFeature(f);
  return {
    ...featureToShape(simple, istProj.pathGen, istProj.projection),
    provinceId: "istanbul",
    center: getCenter(simple),
  };
});

// Kocaeli ilçeleri — OSM tabanlı ilçe sınırları (Gebze, İzmit, Körfez, Derince, Dilovası, Çayırova)
const kocaeliFeature = trRaw.features.find(
  (f) => slugify(f.properties.name) === "kocaeli",
);
const kocaeliDistrictGeo = JSON.parse(
  readFileSync(join(__dirname, "kocaeli-districts.geojson"), "utf-8"),
);
const KOC_SIZE = [800, 520];
const kocaeliDistrictFeatures = kocaeliDistrictGeo.features.map(simplifyFeature);
const kocProj = projectFeatures(kocaeliDistrictFeatures, ...KOC_SIZE);
const kocaeliOutline = kocProj.pathGen(simplifyFeature(kocaeliFeature));

const kocaeliDistricts = kocaeliDistrictGeo.features.map((orig, i) => ({
  ...featureToShape(kocaeliDistrictFeatures[i], kocProj.pathGen, kocProj.projection),
  provinceId: "kocaeli",
  center: getCenter(orig),
}));

const output = {
  turkey: {
    viewBox: `0 0 ${TR_SIZE[0]} ${TR_SIZE[1]}`,
    outline: turkeyOutline,
    provinces: turkeyProvinces,
  },
  istanbul: {
    viewBox: `0 0 ${IST_SIZE[0]} ${IST_SIZE[1]}`,
    districts: istanbulDistricts,
  },
  kocaeli: {
    viewBox: `0 0 ${KOC_SIZE[0]} ${KOC_SIZE[1]}`,
    outline: kocaeliOutline,
    districts: kocaeliDistricts,
  },
};

writeFileSync(
  join(__dirname, "../src/data/map-geometry.json"),
  JSON.stringify(output),
);

console.log(
  `Generated ${turkeyProvinces.length} provinces, ${istanbulDistricts.length} istanbul districts`,
);
