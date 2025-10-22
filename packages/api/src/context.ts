import { auth } from "@wuwa-mains/auth";
import { db } from "@wuwa-mains/db";

export async function createContext({ req }: { req: Request }) {
  const session = await auth.api.getSession({ headers: req.headers });
  return { session, db };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
