import type { ResonatorFullDatabaseSchema } from "@/services/db/types/resonator-types";
import type { WeaponFullDatabaseSchema } from "@/services/db/types/weapon-types";
import type { EchoesFullDatabaseSchema } from "@/services/db/types/echoes-types";

// ==================== TYPES ====================

export type SubStatKey =
  | "sub_stat_1"
  | "sub_stat_2"
  | "sub_stat_3"
  | "sub_stat_4"
  | "sub_stat_5";

export interface SubStat {
  stat?: string;
  value?: number;
}

export interface SkillConfig {
  level?: number;
}

export interface SequenceState {
  isActive?: boolean;
}

export interface ResonatorConfig {
  selected?: ResonatorFullDatabaseSchema | null;
  level?: number;
  sequenceRank?: number;
  skillLevels?: SkillConfig[];
  sequenceStates?: SequenceState[];
}

export interface WeaponConfig {
  selected?: WeaponFullDatabaseSchema | null;
  level?: number;
  refinamentRank?: number;
}

export interface EchoConfig {
  selected: EchoesFullDatabaseSchema | null;
  level: number;
  mainStat: string;
  sonataEffect: string;
  sub_stat_1: SubStat;
  sub_stat_2: SubStat;
  sub_stat_3: SubStat;
  sub_stat_4: SubStat;
  sub_stat_5: SubStat;
}

export interface BuildEditorStore {
  // ==================== STATE ====================
  resonatorConfig: ResonatorConfig | null;
  weaponConfig: WeaponConfig | null;
  echoLoadout: EchoConfig[];

  // ==================== RESONATOR ACTIONS ====================
  // Conditions
  isSameResonatorAndWeapon: () => boolean;

  // Skill actions

  setResonatorConfig: (partial: Partial<ResonatorConfig>) => void;
  setResonatorLevel: (level: number) => void;
  setSequenceRank: (rank: number) => void;
  updateSkillLevel: (skillIndex: number, level: number) => void;
  setAllSkillLevels: (level: number) => void;

  // Sequence actions
  toggleSequence: (sequenceIndex: number) => void;
  activateSequence: (sequenceIndex: number) => void;
  deactivateSequence: (sequenceIndex: number) => void;
  activateAllSequences: () => void;
  deactivateAllSequences: () => void;

  // ==================== WEAPON ACTIONS ====================
  setWeaponConfig: (partial: Partial<WeaponConfig>) => void;
  setWeaponLevel: (level: number) => void;
  setRefinamentRank: (rank: number) => void;

  // ==================== ECHO ACTIONS ====================
  updateEchoSlot: (slotIndex: number, config: Partial<EchoConfig>) => void;
  setEchoLevel: (slotIndex: number, level: number) => void;
  setEchoMainStat: (slotIndex: number, mainStat: string) => void;
  setEchoSonata: (slotIndex: number, sonataEffect: string) => void;

  // SubStat actions
  updateEchoSubStat: (
    slotIndex: number,
    subStatKey: SubStatKey,
    subStat: Partial<SubStat>,
  ) => void;
  clearEchoSubStat: (slotIndex: number, subStatKey: SubStatKey) => void;
  clearAllEchoSubStats: (slotIndex: number) => void;

  // Slot management
  clearEchoSlot: (slotIndex: number) => void;
  clearAllEchoSlots: () => void;

  // ==================== UTILITY ACTIONS ====================
  resetBuild: () => void;

  // ==================== DIALOG STATES ====================
  isOpenResonatorDialog: boolean;
  toggleResonatorDialog: (isOpen: boolean) => void;

  isOpenWeaponDialog: boolean;
  toggleWeaponDialog: (isOpen: boolean) => void;

  isOpenEchoDialog: {
    isActive: boolean;
    activeSlot: number | null;
  };
  toggleEchoDialog: (isOpen: boolean, activeSlot: number | null) => void;
}
