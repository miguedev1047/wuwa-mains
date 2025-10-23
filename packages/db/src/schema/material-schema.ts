import * as s from "drizzle-orm/sqlite-core";

import { type JSONContent } from "../types";

import { STARS_ENUM, MATERIAL_TYPE_ENUM } from "@wuwa-mains/constants";
import { sql } from "drizzle-orm";

export const materials = s.sqliteTable("materials", {
  id: s
    .text("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  name: s.text("name").notNull(),
  description: s
    .text("description", { mode: "json" })
    .notNull()
    .$type<JSONContent>(),
  stars: s.text("stars", { enum: STARS_ENUM }).notNull(),
  material_type: s
    .text("material_type", { enum: MATERIAL_TYPE_ENUM })
    .notNull(),
  avatar_image: s.text("avatar_image").notNull(),
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
