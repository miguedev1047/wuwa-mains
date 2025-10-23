import * as s from "drizzle-orm/sqlite-core";

import { type JSONContent } from "../types";

import {
  WEAPON_TYPE_ENUM,
  STARS_ENUM,
  ELEMENT_TYPE_ENUM,
  COMBAT_STYLES_ENUM,
} from "@wuwa-mains/constants";
import { relations, sql } from "drizzle-orm";

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

export const resonatorRelations = relations(resonators, ({ many }) => ({
  combat_styles: many(combatStyles),
}));

export const combatStylesRelations = relations(combatStyles, ({ one }) => ({
  resonator: one(resonators, {
    fields: [combatStyles.resonator_id],
    references: [resonators.id],
  }),
}));
