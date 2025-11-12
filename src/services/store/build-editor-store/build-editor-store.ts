import type { BuildEditorStore } from "@/services/store/build-editor-store/types";

import {
  DEFAULT_SUB_STAT,
  DEFAULT_ECHO_CONFIG,
  DEFAULT_ECHO_LOADOUT,
  DEFAULT_RESONATOR_CONFIG,
  DEFAULT_WEAPON_CONFIG,
} from "@/services/store/build-editor-store/default-values";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

// ==================== STORE ====================

export const useBuildEditorStore = create<BuildEditorStore>()(
  devtools((set, get) => ({
    // ==================== INITIAL STATE ====================
    resonatorConfig: DEFAULT_RESONATOR_CONFIG,
    weaponConfig: DEFAULT_WEAPON_CONFIG,
    echoLoadout: DEFAULT_ECHO_LOADOUT,

    // ==================== CONDITIONS =========================
    isSameResonatorAndWeapon: () => {
      const state = get();
      const resonatorWeaponType = state.resonatorConfig?.selected?.weapon_type;
      const weaponType = state.weaponConfig?.selected?.weapon_type;
      return resonatorWeaponType === weaponType;
    },

    // ==================== RESONATOR ACTIONS ====================

    setResonatorConfig: (partial) =>
      set((state) => ({
        resonatorConfig: { ...state.resonatorConfig, ...partial },
      })),

    setResonatorLevel: (level) =>
      set((state) => ({
        resonatorConfig: { ...state.resonatorConfig, level },
      })),

    setSequenceRank: (sequenceRank) =>
      set((state) => ({
        resonatorConfig: { ...state.resonatorConfig, sequenceRank },
      })),

    // ==================== SKILL ACTIONS ====================

    updateSkillLevel: (skillIndex, level) =>
      set((state) => ({
        resonatorConfig: {
          ...state.resonatorConfig,
          skillLevels: state.resonatorConfig?.skillLevels?.map((skill, i) =>
            i === skillIndex ? { ...skill, level } : skill,
          ),
        },
      })),

    setAllSkillLevels: (level) =>
      set((state) => ({
        resonatorConfig: {
          ...state.resonatorConfig,
          skillLevels: state.resonatorConfig?.skillLevels?.map((skill) => ({
            ...skill,
            level,
          })),
        },
      })),

    // ==================== SEQUENCE ACTIONS ====================

    toggleSequence: (sequenceIndex) =>
      set((state) => ({
        resonatorConfig: {
          ...state.resonatorConfig,
          sequenceStates: state.resonatorConfig?.sequenceStates?.map(
            (sequence, i) =>
              i === sequenceIndex
                ? { ...sequence, isActive: !sequence.isActive }
                : sequence,
          ),
        },
      })),

    activateSequence: (sequenceIndex) =>
      set((state) => ({
        resonatorConfig: {
          ...state.resonatorConfig,
          sequenceStates: state.resonatorConfig?.sequenceStates?.map(
            (sequence, i) =>
              i === sequenceIndex ? { ...sequence, isActive: true } : sequence,
          ),
        },
      })),

    deactivateSequence: (sequenceIndex) =>
      set((state) => ({
        resonatorConfig: {
          ...state.resonatorConfig,
          sequenceStates: state.resonatorConfig?.sequenceStates?.map(
            (sequence, i) =>
              i === sequenceIndex ? { ...sequence, isActive: false } : sequence,
          ),
        },
      })),

    activateAllSequences: () =>
      set((state) => ({
        resonatorConfig: {
          ...state.resonatorConfig,
          sequenceStates: state.resonatorConfig?.sequenceStates?.map(
            (sequence) => ({ ...sequence, isActive: true }),
          ),
        },
      })),

    deactivateAllSequences: () =>
      set((state) => ({
        resonatorConfig: {
          ...state.resonatorConfig,
          sequenceStates: state.resonatorConfig?.sequenceStates?.map(
            (sequence) => ({ ...sequence, isActive: false }),
          ),
        },
      })),

    // ==================== WEAPON ACTIONS ====================

    setWeaponConfig: (partial) =>
      set((state) => ({
        weaponConfig: { ...state.weaponConfig, ...partial },
      })),

    setWeaponLevel: (level) =>
      set((state) => ({
        weaponConfig: { ...state.weaponConfig, level },
      })),

    setRefinamentRank: (refinamentRank) =>
      set((state) => ({
        weaponConfig: { ...state.weaponConfig, refinamentRank },
      })),

    // ==================== ECHO ACTIONS ====================

    updateEchoSlot: (slotIndex, config) =>
      set((state) => ({
        echoLoadout: state.echoLoadout.map((echo, i) =>
          i === slotIndex ? { ...echo, ...config } : echo,
        ),
      })),

    setEchoLevel: (slotIndex, level) =>
      set((state) => ({
        echoLoadout: state.echoLoadout.map((echo, i) =>
          i === slotIndex ? { ...echo, level } : echo,
        ),
      })),

    setEchoMainStat: (slotIndex, mainStat) =>
      set((state) => ({
        echoLoadout: state.echoLoadout.map((echo, i) =>
          i === slotIndex ? { ...echo, mainStat } : echo,
        ),
      })),

    setEchoSonata: (slotIndex, sonataEffect) =>
      set((state) => ({
        echoLoadout: state.echoLoadout.map((echo, i) =>
          i === slotIndex ? { ...echo, sonataEffect } : echo,
        ),
      })),

    // ==================== SUBSTAT ACTIONS ====================

    updateEchoSubStat: (slotIndex, subStatKey, subStat) =>
      set((state) => ({
        echoLoadout: state.echoLoadout.map((echo, i) =>
          i === slotIndex
            ? { ...echo, [subStatKey]: { ...echo[subStatKey], ...subStat } }
            : echo,
        ),
      })),

    clearEchoSubStat: (slotIndex, subStatKey) =>
      set((state) => ({
        echoLoadout: state.echoLoadout.map((echo, i) =>
          i === slotIndex
            ? { ...echo, [subStatKey]: { ...DEFAULT_SUB_STAT } }
            : echo,
        ),
      })),

    clearAllEchoSubStats: (slotIndex) =>
      set((state) => ({
        echoLoadout: state.echoLoadout.map((echo, i) =>
          i === slotIndex
            ? {
                ...echo,
                sub_stat_1: { ...DEFAULT_SUB_STAT },
                sub_stat_2: { ...DEFAULT_SUB_STAT },
                sub_stat_3: { ...DEFAULT_SUB_STAT },
                sub_stat_4: { ...DEFAULT_SUB_STAT },
                sub_stat_5: { ...DEFAULT_SUB_STAT },
              }
            : echo,
        ),
      })),

    // ==================== SLOT MANAGEMENT ====================

    clearEchoSlot: (slotIndex) =>
      set((state) => ({
        echoLoadout: state.echoLoadout.map((echo, i) =>
          i === slotIndex ? { ...DEFAULT_ECHO_CONFIG } : echo,
        ),
      })),

    clearAllEchoSlots: () =>
      set({
        echoLoadout: DEFAULT_ECHO_LOADOUT,
      }),

    // ==================== UTILITY ACTIONS ====================

    resetBuild: () =>
      set({
        resonatorConfig: DEFAULT_RESONATOR_CONFIG,
        weaponConfig: null,
        echoLoadout: DEFAULT_ECHO_LOADOUT,
      }),

    // =================== DIALOG STATES =============================
    isOpenResonatorDialog: false,
    toggleResonatorDialog: (isOpen) => set({ isOpenResonatorDialog: isOpen }),

    isOpenWeaponDialog: false,
    toggleWeaponDialog: (isOpen) => set({ isOpenWeaponDialog: isOpen }),

    isOpenEchoDialog: { activeSlot: null, isActive: false },
    toggleEchoDialog: (isOpen, activeSlot) =>
      set({ isOpenEchoDialog: { isActive: isOpen, activeSlot } }),
  })),
);
