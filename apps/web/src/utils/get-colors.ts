import { ELEMENT_COLORS, STARS_COLORS } from "@wuwa-mains/constants";

export function getElementLineColor(element: string) {
  const ELEMENT = ELEMENT_COLORS[element];
  return ELEMENT;
}

export function getStarsLineColor(stars: string) {
  const STAR = STARS_COLORS[stars];
  return STAR;
}
