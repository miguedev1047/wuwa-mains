import * as s from "drizzle-orm/sqlite-core";

import { relations, sql } from "drizzle-orm";
import { resonators } from "@/services/db/schema/resonator-schema";
import { user } from "@/services/db/schema/auth";

export const myResonators = s.sqliteTable("my_resonators", {
  id: s
    .text("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  resonator_id: s
    .text("resonator_id")
    .references(() => resonators.id, { onDelete: "cascade" })
    .notNull(),
  user_id: s
    .text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
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

export const myResonatorsRelations = relations(myResonators, ({ one }) => ({
  resonator: one(resonators, {
    fields: [myResonators.resonator_id],
    references: [resonators.id],
  }),
}));
