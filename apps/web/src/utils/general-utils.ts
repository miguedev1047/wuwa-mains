import {
  SELECT_WEAPON_MAIN_STATS,
  SELECT_WEAPON_TYPE,
  SELECT_ELEMENT_TYPE,
  SELECT_MATERIAL_TYPE,
  SELECT_ECHO_SET,
} from "@wuwa-mains/constants";

const UNDEFINED_GENERAL_OPTS = {
  label: "No definido",
  value: "undefined",
};

const UNDEFINED_ECHOES_OPTS = {
  label: "No definido",
  value: "undefined",
  description: ["No definido"],
};

export function getWeaponType(weaponType: string) {
  const WEAPON_TYPE = SELECT_WEAPON_TYPE.find(
    (type) => type.value === weaponType,
  );
  if (!WEAPON_TYPE) return UNDEFINED_GENERAL_OPTS;
  return WEAPON_TYPE;
}

export function getElementTypeName(elementType: string) {
  const ELEMENT_TYPE = SELECT_ELEMENT_TYPE.find(
    (type) => type.value === elementType,
  );
  if (!ELEMENT_TYPE) return UNDEFINED_GENERAL_OPTS;
  return ELEMENT_TYPE;
}

export function getMainStat(mainStat: string) {
  const MAIN_STAT = SELECT_WEAPON_MAIN_STATS.find(
    (stat) => stat.value === mainStat,
  );
  if (!MAIN_STAT) return UNDEFINED_GENERAL_OPTS;
  return MAIN_STAT;
}

export function getMaterialType(materialType: string) {
  const MATERIAL_TYPE = SELECT_MATERIAL_TYPE.find(
    (type) => type.value === materialType,
  );
  if (!MATERIAL_TYPE) return UNDEFINED_GENERAL_OPTS;
  return MATERIAL_TYPE;
}

export function getEchoSet(echoSet: string) {
  const ECHO_SET = SELECT_ECHO_SET.find((set) => set.value === echoSet);
  if (!ECHO_SET) return UNDEFINED_ECHOES_OPTS;
  return ECHO_SET;
}
