export const SKILL_TYPE = [
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

export const SKILL_TYPE_ENUM = [
  "forte_circuit",
  "normal_attack",
  "resonance_skill",
  "resonance_liberation",
  "inherent_skill",
  "intro_skill",
  "outro_skill",
  "none",
] as const;

export const SKILL_ORDER = {
  normal_attack: 1,
  resonance_skill: 2,
  forte_circuit: 3,
  resonance_liberation: 4,
  intro_skill: 5,
  outro_skill: 6,
  inherent_skill: [7, 8, 9],
};
