import { type ResonatorZodSchema } from "@wuwa-mains/schemas/zod/resonator-schema";
import { type WeaponZodSchema } from "@wuwa-mains/schemas/zod/weapon-schema";

export function getDefaultResonatorValues(
  data?: ResonatorZodSchema,
): ResonatorZodSchema {
  const isEditing = !!data;

  return {
    name: isEditing ? data!.name : "",
    title: isEditing ? data!.title : "",
    description: isEditing ? data!.description : "",
    avatar_image: isEditing ? data!.avatar_image : "",
    splash_image: isEditing ? data!.splash_image : "",
    element_type: isEditing ? data!.element_type : "none",
    stars: isEditing ? data!.stars : "none",
    weapon_type: isEditing ? data!.weapon_type : "none",
    is_new: isEditing ? data!.is_new : false,
    is_visible: isEditing ? data!.is_visible : false,
    combat_styles: isEditing ? data!.combat_styles : [],
    createdAt: isEditing ? data!.createdAt : new Date(),
    updatedAt: isEditing ? data!.updatedAt : new Date(),
  } satisfies ResonatorZodSchema;
}

export function getDefaultWeaponValues(
  data?: WeaponZodSchema,
): WeaponZodSchema {
  const isEditing = !!data;

  return {
    name: isEditing ? data!.name : "",
    passive: isEditing ? data!.passive : "",
    description: isEditing ? data!.description : "",
    avatar_image: isEditing ? data!.avatar_image : "",
    stars: isEditing ? data!.stars : "none",
    weapon_type: isEditing ? data!.weapon_type : "none",
    atq: isEditing ? data!.atq : 0,
    main_stat: isEditing ? data!.main_stat : "none",
    main_stat_value: isEditing ? data!.main_stat_value : 0,
    is_new: isEditing ? data!.is_new : false,
    is_visible: isEditing ? data!.is_visible : false,
    createdAt: isEditing ? data!.createdAt : new Date(),
    updatedAt: isEditing ? data!.updatedAt : new Date(),
  } satisfies WeaponZodSchema;
}
