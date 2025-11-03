export const SELECT_ELEMENT_TYPE = [
  {
    label: "Espectro",
    value: "spectro",
  },
  {
    label: "Fusion",
    value: "fusion",
  },
  {
    label: "Glacio",
    value: "glacio",
  },
  {
    label: "Destrucción",
    value: "havoc",
  },
  {
    label: "Aero",
    value: "aero",
  },
  {
    label: "Electro",
    value: "electro",
  },
  {
    label: "No seleccionado",
    value: "none",
  },
];

export const ELEMENT_TYPE_ENUM = [
  "none",
  "spectro",
  "fusion",
  "glacio",
  "havoc",
  "aero",
  "electro",
] as const;

export const ELEMENT_COLORS: Record<string, string> = {
  spectro: "after:bg-spectro",
  fusion: "after:bg-fusion",
  glacio: "after:bg-glacio",
  havoc: "after:bg-havoc",
  aero: "after:bg-aero",
  electro: "after:bg-electro",
};
