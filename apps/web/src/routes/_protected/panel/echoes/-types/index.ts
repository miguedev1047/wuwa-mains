import { echoes, echoesSet } from "@wuwa-mains/db/schema/echo-schema";
import { type EchoZodSchema } from "@wuwa-mains/schemas/zod/echo-schema";
import { type InferSelectModel } from "drizzle-orm";

export interface EchoesFormProps {
  data?: EchoZodSchema;
  echoId?: string;
}

export type EchoesDatabaseSchema = InferSelectModel<typeof echoes> & {
  sets: InferSelectModel<typeof echoesSet>[];
};
