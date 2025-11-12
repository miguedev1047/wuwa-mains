import { echoes, echoesSet } from "@/services/db/schema/echo-schema";
import type { InferSelectModel } from "drizzle-orm";

export type EchoesFullDatabaseSchema = InferSelectModel<typeof echoes> & {
  sets: InferSelectModel<typeof echoesSet>[];
};

export type EchoesDatabaseSchema = InferSelectModel<typeof echoes>;
