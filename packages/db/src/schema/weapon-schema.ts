import * as s from "drizzle-orm/sqlite-core";

import { type JSONContent } from "../types";

import {
  WEAPON_MAIN_STAT_ENUM,
  WEAPON_TYPE_ENUM,
  STARS_ENUM,
} from "@wuwa-mains/constants";
import { sql } from "drizzle-orm";

export const weapons = s.sqliteTable("weapons", {
  id: s
    .text("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  name: s.text("name").notNull(),
  description: s
    .text("description", { mode: "json" })
    .notNull()
    .$type<JSONContent>(),
  passive: s.text("passive", { mode: "json" }).notNull().$type<JSONContent>(),
  stars: s.text("stars", { enum: STARS_ENUM }).notNull(),
  weapon_type: s.text("weapon_type", { enum: WEAPON_TYPE_ENUM }).notNull(),
  avatar_image: s.text("avatar_image").notNull(),
  atq: s.integer("atq").default(0).notNull(),
  main_stat: s.text("main_stat", { enum: WEAPON_MAIN_STAT_ENUM }).notNull(),
  main_stat_value: s.integer("main_stat_value").default(0).notNull(),
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
