import {
  SELECT_WEAPON_MAIN_STATS,
  SELECT_WEAPON_TYPE,
  SELECT_ELEMENT_TYPE,
} from "@wuwa-mains/constants";

const UNDEFINED_OPTS = { label: "No definido", value: "undefined" };

export function getWeaponType(weaponType: string) {
  const WEAPON_TYPE = SELECT_WEAPON_TYPE.find(
    (type) => type.value === weaponType,
  );
  if (!WEAPON_TYPE) return UNDEFINED_OPTS;
  return WEAPON_TYPE;
}

export function getElementTypeName(elementType: string) {
  const ELEMENT_TYPE = SELECT_ELEMENT_TYPE.find(
    (type) => type.value === elementType,
  );
  if (!ELEMENT_TYPE) return UNDEFINED_OPTS;
  return ELEMENT_TYPE;
}

export function getMainStat(mainStat: string) {
  const MAIN_STAT = SELECT_WEAPON_MAIN_STATS.find(
    (stat) => stat.value === mainStat,
  );
  if (!MAIN_STAT) return UNDEFINED_OPTS;
  return MAIN_STAT;
}
