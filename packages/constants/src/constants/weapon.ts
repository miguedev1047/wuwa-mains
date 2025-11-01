export const SELECT_WEAPON_TYPE = [
  {
    label: "Espada",
    value: "sword",
  },
  {
    label: "Mandoble",
    value: "boardblade",
  },
  {
    label: "Rectificador",
    value: "rectifier",
  },
  {
    label: "Guanteletes",
    value: "guantlets",
  },
  {
    label: "Pistolas",
    value: "pistols",
  },
  {
    label: "No seleccionado",
    value: "none",
  },
];

export const WEAPON_TYPE_ENUM = [
  "sword",
  "boardblade",
  "rectifier",
  "guantlets",
  "pistols",
  "none",
] as const;

export const SELECT_WEAPON_MAIN_STATS = [
  {
    label: "Ataque Porcentual",
    value: "attack",
  },
  {
    label: "Defensa Porcentual",
    value: "defense",
  },
  {
    label: "Recarga de energía",
    value: "energy_recharge",
  },
  {
    label: "Vida Porcentual",
    value: "health",
  },
  {
    label: "Prob. critica",
    value: "crit_rate",
  },
  {
    label: "Daño critico",
    value: "crit_dmg",
  },
  {
    label: "Ninguno",
    value: "none",
  },
];

export const WEAPON_MAIN_STAT_ENUM = [
  "attack",
  "defense",
  "energy_recharge",
  "health",
  "crit_rate",
  "crit_dmg",
  "none",
] as const;
