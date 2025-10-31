export const SELECT_RESONATOR_SKILL_TYPE = [
  {
    label: "Circuito del Forte",
    value: "forte_circuit",
  },
  {
    label: "Ataque normal",
    value: "normal_attack",
  },
  {
    label: "Habilidad de resonancia",
    value: "resonance_skill",
  },
  {
    label: "Liberación de resonancia",
    value: "resonance_liberation",
  },
  {
    label: "Habilidad inherente",
    value: "inherent_skill",
  },
  {
    label: "Habilidad Intro",
    value: "intro_skill",
  },
  {
    label: "Habilidad Outro",
    value: "outro_skill",
  },
  {
    label: "Sin habilidad",
    value: "none",
  },
];

export const RESONATOR_SKILL_TYPE_ENUM = [
  "forte_circuit",
  "normal_attack",
  "resonance_skill",
  "resonance_liberation",
  "inherent_skill",
  "intro_skill",
  "outro_skill",
  "none",
] as const;

export const ORDER_ROSONATORS_SKILLS = [
  { value: "normal_attack", order: 0 },
  { value: "resonance_skill", order: 1 },
  { value: "forte_circuit", order: 2 },
  { value: "resonance_liberation", order: 3 },
  { value: "intro_skill", order: 4 },
  { value: "outro_skill", order: 5 },
  { value: "inherent_skill", order: [6, 7, 8] },
];

export const SELECT_LEVELS = [
  {
    label: "Nivel 10",
    value: "level_10",
  },
  {
    label: "Nivel 20",
    value: "level_20",
  },
  {
    label: "Nivel 40",
    value: "level_40",
  },
  {
    label: "Nivel 50",
    value: "level_50",
  },
  {
    label: "Nivel 60",
    value: "level_60",
  },
  {
    label: "Nivel 70",
    value: "level_70",
  },
  {
    label: "Nivel 80",
    value: "level_80",
  },
  {
    label: "Nivel 90",
    value: "level_90",
  },
  {
    label: "Ninguno",
    value: "none",
  },
];

export const LEVELS_ENUM = [
  "level_10",
  "level_20",
  "level_40",
  "level_50",
  "level_60",
  "level_70",
  "level_80",
  "level_90",
  "none",
] as const;
