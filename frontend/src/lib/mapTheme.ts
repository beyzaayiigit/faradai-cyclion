/** Carto light basemap — dark-matter yerine site temasına uygun */
export const MAP_BASE_STYLE =
  "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";

export const mapColors = {
  primary: "#1a4494",
  primaryRgb: "26, 68, 148",
  labelDark: "#0f172a",
  labelLight: "#ffffff",
  labelHalo: "#ffffff",

  turkey: {
    outlineFill: "#c8d9ea",
    outlineStroke: "rgba(26, 68, 148, 0.2)",
    provinceDefault: "#9eb4cc",
    provinceDefaultHover: "#7a96b4",
    provincePilot: "rgba(26, 68, 148, 0.58)",
    provincePilotHover: "rgba(26, 68, 148, 0.82)",
    strokeDefault: "rgba(26, 68, 148, 0.3)",
    strokePilot: "#1a4494",
    glow: "#1a4494",
  },

  district: {
    default: "rgba(158, 180, 204, 0.72)",
    pilot: "rgba(26, 68, 148, 0.48)",
    hover: "rgba(26, 68, 148, 0.72)",
    lineDefault: "rgba(26, 68, 148, 0.4)",
    linePilot: "#1a4494",
    lineWidthPilot: 2.5,
    lineWidthDefault: 1,
  },
} as const;
