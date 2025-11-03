import { ELEMENT_COLORS, STARS_COLORS } from "@/data/constants";

export function getElementLineColor(element: string) {
  const ELEMENT = ELEMENT_COLORS[element];
  return ELEMENT;
}

export function getStarsLineColor(stars: string | "default") {
  if (stars === "default") return STARS_COLORS["default"];
  const STAR = STARS_COLORS[stars];
  return STAR;
}
