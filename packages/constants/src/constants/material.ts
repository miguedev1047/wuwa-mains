export const SELECT_MATERIAL_TYPE = [
  { label: "Experiencia", value: "exp" },
  {
    label: "Material de ascensión de resonador",
    value: "resonator_ascension_material",
  },
  { label: "Material de mejora de habilidad", value: "skill_upgrade_material" },
  {
    label: "Material de experiencia de resonador",
    value: "resonator_exp_material",
  },
  {
    label: "Material de mejora de arma y habilidad",
    value: "weapon_and_skill_material",
  },
  { label: "Material de mejora de eco", value: "echo_dev_material" },
  { label: "Material de ascensión", value: "ascension_material" },
  { label: "No seleccionado", value: "none" },
];

export const MATERIAL_TYPE_ENUM = [
  "exp",
  "resonator_ascension_material",
  "skill_upgrade_material",
  "resonator_exp_material",
  "weapon_and_skill_material",
  "echo_dev_material",
  "ascension_material",
  "none",
] as const;
