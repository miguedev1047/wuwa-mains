import * as s from "drizzle-orm/sqlite-core";

import { type JSONContent } from "../types";

import {
  WEAPON_TYPE_ENUM,
  STARS_ENUM,
  ELEMENT_TYPE_ENUM,
  COMBAT_STYLES_ENUM,
  RESONATOR_SKILL_TYPE_ENUM,
  STATS_TYPE_ENUM,
  LEVELS_ENUM,
} from "@wuwa-mains/constants";
import { relations, sql } from "drizzle-orm";

// SCHEMAS - RESONATORS //

export const resonators = s.sqliteTable("resonator", {
  id: s
    .text("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  name: s.text("name").notNull(),
  title: s.text("title").notNull(),
  description: s
    .text("description", { mode: "json" })
    .notNull()
    .$type<JSONContent>(),
  weapon_type: s.text("weapon_type", { enum: WEAPON_TYPE_ENUM }).notNull(),
  element_type: s.text("element_type", { enum: ELEMENT_TYPE_ENUM }).notNull(),
  stars: s.text("stars", { enum: STARS_ENUM }).notNull(),
  avatar_image: s.text("avatar_image").notNull(),
  splash_image: s.text("splash_image").notNull(),
  is_visible: s
    .integer("is_visible", { mode: "boolean" })
    .default(false)
    .notNull(),
  is_new: s.integer("is_new", { mode: "boolean" }).default(false).notNull(),
  createdAt: s
    .integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  updatedAt: s
    .integer("updated_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const combatStyles = s.sqliteTable("combat_styles", {
  id: s
    .text("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  resonator_id: s
    .text("resonator_id")
    .references(() => resonators.id, { onDelete: "cascade" })
    .notNull(),
  value: s.text("value", { enum: COMBAT_STYLES_ENUM }).notNull(),
  label: s.text("label").notNull(),
});

export const resonatorSkills = s.sqliteTable("resonator_skills", {
  id: s
    .text("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  resonator_id: s
    .text("resonator_id")
    .references(() => resonators.id, { onDelete: "cascade" })
    .notNull(),
  name: s.text("name").notNull(),
  skill_image: s.text("skill_image").notNull(),
  skill_type: s
    .text("skill_type", { enum: RESONATOR_SKILL_TYPE_ENUM })
    .notNull(),
  description: s
    .text("description", { mode: "json" })
    .notNull()
    .$type<JSONContent>(),
  createdAt: s
    .integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  updatedAt: s
    .integer("updated_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const resonatorBonus = s.sqliteTable("resonator_bonus", {
  id: s
    .text("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  resonator_id: s
    .text("resonator_id")
    .references(() => resonators.id, { onDelete: "cascade" })
    .notNull(),
  stat_type: s.text("stat_type", { enum: STATS_TYPE_ENUM }).notNull(),
  bonus_value: s.integer("bonus_value").default(0).notNull(),
  createdAt: s
    .integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  updatedAt: s
    .integer("updated_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const chainResonance = s.sqliteTable("resonator_chain_resonance", {
  id: s
    .text("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  resonator_id: s
    .text("resonator_id")
    .references(() => resonators.id, { onDelete: "cascade" })
    .notNull(),
  name: s.text("name").notNull(),
  chain_resonance_image: s.text("chain_resonance_image").notNull(),
  description: s
    .text("description", { mode: "json" })
    .notNull()
    .$type<JSONContent>(),
  createdAt: s
    .integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  updatedAt: s
    .integer("updated_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const resonatorLevels = s.sqliteTable("resonator_levels", {
  id: s
    .text("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  resonator_id: s
    .text("resonator_id")
    .references(() => resonators.id, { onDelete: "cascade" })
    .notNull(),
  level: s.text("level", { enum: LEVELS_ENUM }).notNull(),
  hp: s.integer({ mode: "number" }).default(0).notNull(),
  atq: s.integer({ mode: "number" }).default(0).notNull(),
  def: s.integer({ mode: "number" }).default(0).notNull(),
  createdAt: s
    .integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  updatedAt: s
    .integer("updated_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

// RELATIONS - RESONATORS //

export const resonatorRelations = relations(resonators, ({ many }) => ({
  combat_styles: many(combatStyles),
  skills: many(resonatorSkills),
  bonus: many(resonatorBonus),
  resonance_chain: many(chainResonance),
  level: many(resonatorLevels),
}));

export const combatStylesRelations = relations(combatStyles, ({ one }) => ({
  resonator: one(resonators, {
    fields: [combatStyles.resonator_id],
    references: [resonators.id],
  }),
}));

export const resonatorSkillsRelations = relations(
  resonatorSkills,
  ({ one }) => ({
    resonator: one(resonators, {
      fields: [resonatorSkills.resonator_id],
      references: [resonators.id],
    }),
  }),
);

export const resonatorBonusRelations = relations(resonatorBonus, ({ one }) => ({
  resonator: one(resonators, {
    fields: [resonatorBonus.resonator_id],
    references: [resonators.id],
  }),
}));

export const chainResonanceRelations = relations(chainResonance, ({ one }) => ({
  resonator: one(resonators, {
    fields: [chainResonance.resonator_id],
    references: [resonators.id],
  }),
}));

export const resonatorLevelsRelations = relations(
  resonatorLevels,
  ({ one }) => ({
    resonator: one(resonators, {
      fields: [resonatorLevels.resonator_id],
      references: [resonators.id],
    }),
  }),
);
