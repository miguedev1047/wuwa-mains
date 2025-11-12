import {
  SubStat,
  EchoConfig,
  ResonatorConfig,
  SequenceState,
  SkillConfig,
  WeaponConfig,
} from "@/services/store/build-editor-store/types";

// ==================== DEFAULTS ====================

export const DEFAULT_SUB_STAT: SubStat = {
  stat: "",
  value: 0,
};

export const DEFAULT_SKILL_LEVELS: SkillConfig[] = Array(5)
  .fill(null)
  .map(() => ({ level: 10 }));

export const DEFAULT_SEQUENCE_STATES: SequenceState[] = Array(10)
  .fill(null)
  .map(() => ({ isActive: true }));

export const DEFAULT_RESONATOR_CONFIG: ResonatorConfig = {
  skillLevels: DEFAULT_SKILL_LEVELS,
  sequenceStates: DEFAULT_SEQUENCE_STATES,
  level: 9,
  sequenceRank: 1,
  selected: null,
};

export const DEFAULT_WEAPON_CONFIG: WeaponConfig = {
  level: 9,
  refinamentRank: 1,
  selected: null,
};

export const DEFAULT_ECHO_CONFIG: EchoConfig = {
  level: 5,
  mainStat: "",
  sonataEffect: "",
  sub_stat_1: { ...DEFAULT_SUB_STAT },
  sub_stat_2: { ...DEFAULT_SUB_STAT },
  sub_stat_3: { ...DEFAULT_SUB_STAT },
  sub_stat_4: { ...DEFAULT_SUB_STAT },
  sub_stat_5: { ...DEFAULT_SUB_STAT },
  selected: null,
};

export const DEFAULT_ECHO_LOADOUT: EchoConfig[] = Array(5)
  .fill(null)
  .map(() => ({ ...DEFAULT_ECHO_CONFIG }));
