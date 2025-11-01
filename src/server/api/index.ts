import type { Context } from "@/server/api/context";

import superjson from "superjson";

import { initTRPC, TRPCError } from "@trpc/server";

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;

// Middleware Procedures
export const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Authentication required",
      cause: "No session",
    });
  }
  return next({ ctx: { ...ctx, session: ctx.session } });
});

export const isAdmin = t.middleware(({ ctx, next }) => {
  const currentRole = ctx.session?.user.role;
  if (currentRole !== "ADMIN") {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to perform this action",
      cause: "Insufficient permissions (Only Admin)",
    });
  }
  return next({ ctx: { ...ctx, session: ctx.session } });
});

export const isEditor = t.middleware(({ ctx, next }) => {
  const currentRole = ctx.session?.user.role;
  if (currentRole !== "EDITOR" && currentRole !== "ADMIN") {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to perform this action",
      cause: "Insufficient permissions (Only Editor or Admin)",
    });
  }
  return next({ ctx: { ...ctx, session: ctx.session } });
});

// TRPC Procedures
export const publicProcedure = t.procedure;

export const editorProcedure = t.procedure.use(isEditor);

export const adminProcedure = t.procedure.use(isAdmin);

export const protectedProcedure = t.procedure.use(isAuthed);
