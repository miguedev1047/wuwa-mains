import { PERCENTAGE_STATS } from "@/data/constants";

export function formatStatValue(
  stat: string | undefined,
  value: number,
): string {
  if (!stat) return "0%";

  if (!Number.isFinite(value)) return String(value);

  if (PERCENTAGE_STATS.has(stat)) {
    return `${value}%`;
  }

  // Para valores absolutos (hp, atk, def), solo el número
  return String(value);
}
