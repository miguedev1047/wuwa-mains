import * as s from "drizzle-orm/sqlite-core";

import { type JSONContent } from "../types";

import { ECHO_CLASS_ENUM, ECHO_COST_ENUM, ECHO_SETS_ENUM } from "@/constants";
import { relations, sql } from "drizzle-orm";

export const echoes = s.sqliteTable("echoes", {
  id: s
    .text("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  name: s.text("name").notNull(),
  description: s
    .text("description", { mode: "json" })
    .notNull()
    .$type<JSONContent>(),
  class: s.text("class", { enum: ECHO_CLASS_ENUM }).notNull(),
  cost: s.text("cost", { enum: ECHO_COST_ENUM }).notNull(),
  avatar_image: s.text("avatar_image").notNull(),
  skill_image: s.text("skill_image").notNull(),
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

export const echoesSet = s.sqliteTable("echoesSet", {
  id: s
    .text("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  echo_id: s
    .text("echo_id")
    .references(() => echoes.id, { onDelete: "cascade" })
    .notNull(),
  value: s.text("value", { enum: ECHO_SETS_ENUM }).notNull(),
  label: s.text("label").notNull(),
});

export const echoesRelations = relations(echoes, ({ many }) => ({
  sets: many(echoesSet),
}));

export const echoesSetRelations = relations(echoesSet, ({ one }) => ({
  echo: one(echoes, {
    fields: [echoesSet.echo_id],
    references: [echoes.id],
  }),
}));
