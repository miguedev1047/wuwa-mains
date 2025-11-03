import { auth } from "@/lib/auth";
import { db } from "@/services/db";

export async function createContext({ req }: { req: Request }) {
  const session = await auth.api.getSession({ headers: req.headers });
  return { session, db };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
