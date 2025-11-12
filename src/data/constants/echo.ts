export const SELECT_ECHO_COST = [
  {
    label: "Coste 1",
    value: "cost_1",
  },
  {
    label: "Coste 2",
    value: "cost_2",
  },
  {
    label: "Coste 3",
    value: "cost_3",
  },
  {
    label: "Coste 4",
    value: "cost_4",
  },
  {
    label: "Sin coste",
    value: "none",
  },
];

export const ECHO_COST_ENUM = [
  "cost_1",
  "cost_2",
  "cost_3",
  "cost_4",
  "none",
] as const;

export const SELECT_ECHO_CLASS = [
  {
    label: "Clase Tsunami",
    value: "tsunami_class",
  },
  {
    label: "Clase Marea",
    value: "tide_class",
  },
  {
    label: "Clase Elite",
    value: "elite_class",
  },
  {
    label: "Clase Comun",
    value: "common_class",
  },
  {
    label: "Sin clase",
    value: "none",
  },
];

export const ECHO_CLASS_ENUM = [
  "tsunami_class",
  "tide_class",
  "elite_class",
  "common_class",
  "none",
] as const;

export const SELECT_ECHO_SET = [
  {
    label: "Escarcha helada",
    value: "freezing_frost",
    description: [
      "2 Piezas: Daño Glacis aumentado en 10%",
      "5 Piezas: Al lanzar Ataque Básico o Ataque Pesado, el Daño Glacis aumenta en 10%, acumulándose hasta tres veces, durante 15 segundos",
    ],
  },
  {
    label: "Grieta Fundida",
    value: "molten_rift",
    description: [
      "2 Piezas: Daño Fusión aumentado en 10%",
      "5 Piezas: Al lanzar Habilidad de Resonancia, el Daño Fusión aumenta en 30% durante 15s",
    ],
  },
  {
    label: "Trueno Vacío",
    value: "void_thunder",
    description: [
      "2 Piezas: Daño Electro aumentado en 10%",
      "5 Piezas: Al lanzar Ataque Pesado o Habilidad de Resonancia, el Daño Electro aumenta en 15%, acumulándose hasta dos veces, cada una durante 15 segundos",
    ],
  },
  {
    label: "Ventisca de sierra",
    value: "sierra_gale",
    description: [
      "2 Piezas: Daño Aero aumentado en 10%",
      "5 Piezas: El Daño Aero aumenta en 30% durante 15 segundos cuando se usa la Habilidad Intro",
    ],
  },
  {
    label: "Luz celestial",
    value: "celestial_light",
    description: [
      "2 Piezas: Daño Spectro aumentado en 10%",
      "5 Piezas: Aumenta el Daño Spectro en 30% durante 15s al lanzar la Habilidad Intro",
    ],
  },
  {
    label: "Eclipse de sol en descenso",
    value: "sun_sinking_eclipse",
    description: [
      "2 Piezas: Daño Havoc aumentado en 10%",
      "5 Piezas: Al lanzar Ataque Básico o Ataque Pesado, el Daño Havoc aumenta en 7.5%, acumulándose hasta cuatro veces durante 15 segundos",
    ],
  },
  {
    label: "Rejuvenecedor brillante",
    value: "rejuvenating_glow",
    description: [
      "2 Piezas: Curación aumentada en 10%",
      "5 Piezas: Al curar aliados, el ATK de todo el equipo aumenta en 15%, durante 30s",
    ],
  },
  {
    label: "Nubes iluminadas",
    value: "moonlit_clouds",
    description: [
      "2 Piezas: Regeneración de Energía aumentada en 10%",
      "5 Piezas: Después de usar la Habilidad Outro, el ATK del siguiente Resonador aumenta en 22.5% durante 15 segundos",
    ],
  },
  {
    label: "Melodías perdurables",
    value: "lingering_tunes",
    description: [
      "2 Piezas: ATK aumenta en 10%",
      "5 Piezas: Cuando está en efecto, tu ATK aumenta en 5% cada 1.5 segundos, acumulándose hasta cuatro veces. El Daño de Habilidad Outro aumenta en 60%",
    ],
  },
  {
    label: "Resolución helada",
    value: "frosty_resolve",
    description: [
      "2 Piezas: Daño de Habilidad de Resonancia +12%",
      "5 Piezas: Lanzar Habilidad de Resonancia otorga 18% de Bono de Daño Glacis durante 18s y lanzar Liberación de Resonancia aumenta el Daño de Habilidad de Resonancia en 5, durante 2s. Este efecto se acumula hasta tiempos indefinidos",
    ],
  },
  {
    label: "Brillo perpetuo",
    value: "eternal_radiance",
    description: [
      "2 Piezas: Daño Spectro +10%",
      "5 Piezas: Infligir Congelación Spectro a enemigos aumenta la Tasa de Crítico en 20% durante 15s. Atacar enemigos con 10 acumulaciones de Congelación Spectro otorga 15% de Bono de Daño Spectro durante 15s",
    ],
  },
  {
    label: "Velo de medianoche",
    value: "midnight_veil",
    description: [
      "2 Piezas: ATK +10%",
      "5 Piezas: Cuando la Habilidad Outro es activada, inflige un 480% adicional de ATK como Daño Havoc a enemigos circundantes, considerado Daño de Habilidad Outro, y otorga al Resonador entrante 15% de Bono de Habilidad Outro durante 15s",
    ],
  },
  {
    label: "Himno empíreo",
    value: "empyrean_anthem",
    description: [
      "2 Piezas: Regeneración de Energía +10%",
      "5 Piezas: Aumenta el Daño de Ataque Coordinado del Resonador en 80%. Al impactar un golpe crítico con Ataque Coordinado, aumenta el ATK del Resonador activo en 20% durante 4s",
    ],
  },
  {
    label: "Coraje rompemareas",
    value: "tidebreaking_courage",
    description: [
      "2 Piezas: Regeneración de Energía +10%",
      "5 Piezas: Aumenta el ATK del Resonador en 15%. Alcanzar 250% de Regeneración de Energía aumenta todo el Daño de Atributo en 30% para el Resonador",
    ],
  },
  {
    label: "Ráfagas de viento",
    value: "gusts_of_welkin",
    description: [
      "2 Piezas: Daño Aero +10%",
      "5 Piezas: Infligir Erosión Aero a enemigos aumenta el Daño Aero para todos los Resonadores del equipo en 15%, y para el Resonador que activa este efecto en 15% adicional, durante 20s",
    ],
  },
  {
    label: "Peregrinaje al viento",
    value: "windward_pilgrimage",
    description: [
      "2 Piezas: Daño Aero +10%",
      "5 Piezas: Golpear un objetivo con Erosión Aero aumenta la Tasa de Crítico en 10% y otorga 30% de Bono de Daño Aero, durante 10s",
    ],
  },
  {
    label: "Huella llameante",
    value: "flaming_clawprint",
    description: [
      "2 Piezas: Daño Fusión +10%",
      "5 Piezas: Lanzar Liberación de Resonancia otorga a todos los Resonadores del equipo 15% de Bono de Daño Fusión y al lanzador 20% adicional de Bono de Daño de Liberación de Resonancia, durante 35s",
    ],
  },
  {
    label: "Sueño del más allá",
    value: "dream_of_the_lost",
    description: [
      "3 Piezas: Mantener 0 de Energía de Resonancia aumenta la Tasa de Crítico en 20% y otorga 36% de Bono de Daño de Habilidad Eco",
    ],
  },
  {
    label: "Corona del valor",
    value: "crown_of_valor",
    description: [
      "3 Piezas: Al ganar un Escudo, aumenta el ATK del Resonador en 6% y Daño Crítico en 4% durante 4s. Este efecto puede activarse una vez cada 0.5s y se acumula hasta 5 veces",
    ],
  },
  {
    label: "Ley de la armonía",
    value: "law_of_harmony",
    description: [
      "3 Piezas: Lanzar Habilidad Eco otorga 30% de Bono de Daño de Ataque Pesado al lanzador durante 4s. Además, todos los Resonadores del equipo ganan 4% de Bono de Daño de Habilidad Eco durante 30s, acumulándose hasta 4 veces. Los Ecos del mismo nombre solo pueden activar este efecto una vez. Al 4 acumulaciones, lanzar Habilidad Eco nuevamente restablece la duración de este efecto",
    ],
  },
  {
    label: "Sombra de alallama",
    value: "flamewing_shadow",
    description: [
      "3 Piezas: Lanzar Daño de Habilidad Eco aumenta el Daño Crítico de Ataque Pesado en 20% durante 6s. Lanzar Daño de Ataque Pesado aumenta la Tasa Crítica de Habilidad Eco en 20% durante 6s. Mientras ambos efectos están activos, gana 16% de Bono de Daño Fusión",
    ],
  },
  {
    label: "Hilo de destino cortado",
    value: "thread_of_severed_fate",
    description: [
      "2 Piezas: Regen. de energía +10%",
      "5 Piezas: Aumenta el ATQ del personaje un 15%. Al alcanzar 250% de Regen. de energía, aumenta el daño de todos los atributos del personaje un 30%.",
    ],
  },
  {
    label: "Sin sets de ecos",
    value: "none",
    description: ["Ninguna descripción disponible"],
  },
];

export const ECHO_SETS_ENUM = [
  "freezing_frost",
  "molten_rift",
  "void_thunder",
  "sierra_gale",
  "celestial_light",
  "sun_sinking_eclipse",
  "rejuvenating_glow",
  "moonlit_clouds",
  "lingering_tunes",
  "midnight_veil",
  "empyrean_anthem",
  "tidebreaking_courage",
  "frosty_resolve",
  "eternal_radiance",
  "gusts_of_welkin",
  "flaming_clawprint",
  "windward_pilgrimage",
  "dream_of_the_lost",
  "crown_of_valor",
  "law_of_harmony",
  "flamewing_shadow",
  "thread_of_severed_fate",
  "none",
] as const;

export const SELECT_ECHOES_MAIN_STATS: Record<
  string,
  { label: string; value: string; levels: number[] }[]
> = {
  cost_4: [
    {
      label: "Prob. critica",
      value: "crit_rate",
      levels: [4.4, 7.9, 11.4, 15, 18.5, 22],
    },
    {
      label: "Daño critico",
      value: "crit_dmg",
      levels: [8.8, 15.8, 22.9, 29.9, 37, 44],
    },
    {
      label: "Vida",
      value: "hp",
      levels: [6.6, 11.9, 17.2, 22.4, 27.7, 33],
    },
    {
      label: "Ataque",
      value: "atk",
      levels: [6.6, 11.9, 17.2, 22.4, 27.7, 33],
    },
    {
      label: "Defensa",
      value: "def",
      levels: [8.4, 15, 21.7, 28.8, 35.1, 41.8],
    },
    {
      label: "Bono de curación",
      value: "healing_bonus",
      levels: [5.3, 9.5, 13.7, 18, 22.2, 26.4],
    },
  ],
  cost_3: [
    {
      label: "Vida",
      value: "hp",
      levels: [6, 10.8, 15.6, 20.4, 25.2, 30],
    },
    {
      label: "Ataque",
      value: "atk",
      levels: [6, 10.8, 15.6, 20.4, 25.2, 30],
    },
    {
      label: "Defensa",
      value: "def",
      levels: [7.6, 13.7, 19.8, 25.8, 31.9, 38],
    },
    {
      label: "Recarga de energía",
      value: "energy_regen",
      levels: [6.4, 11.5, 16.6, 21.8, 26.9, 32],
    },
    {
      label: "Bono espectro",
      value: "spectro_bonus",
      levels: [6, 10.8, 15.6, 20.4, 25.2, 30],
    },
    {
      label: "Bono aero",
      value: "aero_bonus",
      levels: [6, 10.8, 15.6, 20.4, 25.2, 30],
    },
    {
      label: "Bono glacio",
      value: "glacio_bonus",
      levels: [6, 10.8, 15.6, 20.4, 25.2, 30],
    },
    {
      label: "Bono fusión",
      value: "fusion_bonus",
      levels: [6.0, 10.8, 15.6, 20.4, 25.2, 30],
    },
    {
      label: "Bono destrucción",
      value: "havoc_bonus",
      levels: [6.0, 10.8, 15.6, 20.4, 25.2, 30],
    },
    {
      label: "Bono electro",
      value: "electro_bonus",
      levels: [6.0, 10.8, 15.6, 20.4, 25.2, 30],
    },
  ],
  cost_1: [
    {
      label: "Ataque",
      value: "atk",
      levels: [4.6, 8.2, 11.9, 15.5, 19.2, 22.8],
    },
    {
      label: "Vida",
      value: "hp",
      levels: [3.6, 6.5, 9.4, 12.2, 15.1, 18],
    },
    {
      label: "Defensa",
      value: "def",
      levels: [3.6, 6.5, 9.4, 12.2, 15.1, 18],
    },
  ],
};

export const SELECT_ECHOES_SUBSTATS = [
  {
    label: "Prob. critica",
    value: "crit_rate",
  },
  {
    label: "Daño critico",
    value: "crit_dmg",
  },
  {
    label: "Recarga de energía",
    value: "energy_regen",
  },
  {
    label: "Bono de ataque basico",
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
    label: "Bono de liberacion",
    value: "liberation_bonus",
  },
  {
    label: "Vida plana",
    value: "hp",
  },
  {
    label: "Vida porcentual",
    value: "hp_percent",
  },
  {
    label: "Ataque plano",
    value: "atk",
  },
  {
    label: "Ataque porcentual",
    value: "atk_percent",
  },
  {
    label: "Defensa plana",
    value: "def",
  },
  {
    label: "Defensa porcentual",
    value: "def_percent",
  },
];

export const SELECT_SUBSTATS_OPTIONS: Record<string, number[]> = {
  crit_rate: [6.3, 6.0, 0.9, 7.5, 8.1, 9.3, 9.9, 10.5],
  crit_dmg: [12.6, 13.8, 15, 18.2, 17.4, 18.6, 19.8, 21],
  energy_regen: [6.8, 7.6, 8.4, 9.2, 10, 10.8, 11.6, 12.4],
  basic_atk_bonus: [6.4, 7.1, 7.9, 8.6, 9.4, 10.1, 10.9, 11.6],
  heavy_atk_bonus: [6.4, 7.1, 7.9, 8.6, 9.4, 10.1, 10.9, 11.6],
  skill_bonus: [6.4, 7.1, 7.9, 8.6, 9.4, 10.1, 10.9, 11.6],
  liberation_bonus: [6.4, 7.1, 7.9, 8.6, 9.4, 10.1, 10.9, 11.6],
  hp: [320, 360, 390, 430, 470, 510, 540, 580],
  hp_percent: [6.4, 7.1, 7.9, 8.6, 9.4, 10.1, 10.9, 11.6],
  atk: [30, 40, 50, 60],
  atk_percent: [6.4, 7.1, 7.9, 8.6, 9.4, 10.1, 10.9, 11.6],
  def: [40, 50, 60, 70],
  def_percent: [8.1, 9.0, 10.0, 10.9, 11.8, 12.8, 13.8, 14.7],
};
