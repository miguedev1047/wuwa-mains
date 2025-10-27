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
