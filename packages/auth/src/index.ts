import dotenv from "dotenv";

import { reactStartCookies } from "better-auth/react-start";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@wuwa-mains/db";
import * as schema from "@wuwa-mains/db/schema/auth";

dotenv.config({ path: "../../apps/web/.env" });

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: schema,
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    },
  },
  user: {
    additionalFields: {
      role: { type: "string", required: false },
    },
  },
  secret: process.env.BETTER_AUTH_SECRET,
  plugins: [reactStartCookies()],
});
