export const SELECT_STAT_TYPE = [
  {
    label: "Prob. critica",
    value: "crit_rate",
  },
  {
    label: "Daño critico",
    value: "crit_dmg",
  },
  {
    label: "Vida",
    value: "hp",
  },
  {
    label: "Ataque",
    value: "atk",
  },
  {
    label: "Defensa",
    value: "def",
  },
  {
    label: "Bono de curación",
    value: "healing_bonus",
  },
  {
    label: "Bono espectro",
    value: "spectro_bonus",
  },
  {
    label: "Bono aero",
    value: "aero_bonus",
  },
  {
    label: "Bono glacio",
    value: "glacio_bonus",
  },
  {
    label: "Bono fusión",
    value: "fusion_bonus",
  },
  {
    label: "Bono destrucción",
    value: "havoc_bonus",
  },
  {
    label: "Bono electro",
    value: "electro_bonus",
  },
  {
    label: "Bono de ataque básico",
    value: "basic_atk_bonus",
  },
  {
    label: "Bono de ataque cargado",
    value: "heavy_atk_bonus",
  },
  {
    label: "Bono de habilidad de resonancia",
    value: "skill_bonus",
  },
  {
    label: "Bono de liberación de resonancia",
    value: "liberation_bonus",
  },
  {
    label: "Recarga de energía",
    value: "energy_regen",
  },
  {
    label: "Ninguno",
    value: "none",
  },
];

export const STATS_TYPE_ENUM = [
  "crit_rate",
  "crit_dmg",
  "hp_percent",
  "atk_percent",
  "def_percent",
  "hp",
  "atk",
  "def",
  "healing_bonus",
  "aero_bonus",
  "spectro_bonus",
  "glacio_bonus",
  "fusion_bonus",
  "havoc_bonus",
  "electro_bonus",
  "energy_regen",
  "basic_atk_bonus",
  "heavy_atk_bonus",
  "skill_bonus",
  "liberation_bonus",
  "none",
] as const;

export const PERCENTAGE_STATS: Set<string> = new Set([
  "crit_rate",
  "crit_dmg",
  "hp_percent",
  "atk_percent",
  "def_percent",
  "healing_bonus",
  "aero_bonus",
  "spectro_bonus",
  "glacio_bonus",
  "fusion_bonus",
  "havoc_bonus",
  "energy_regen",
  "basic_atk_bonus",
  "heavy_atk_bonus",
  "skill_bonus",
  "liberation_bonus",
]);
