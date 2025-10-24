import { protectedProcedure, publicProcedure, router } from "../index";
import { echoesRouter } from "./echoes";
import { materialsRouter } from "./materials";
import { resonatorsRouter } from "./resonators";
import { weaponsRouter } from "./weapons";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
  privateData: protectedProcedure.query(({ ctx }) => {
    return {
      message: "This is private",
      user: ctx.session.user,
    };
  }),
  resonators: resonatorsRouter,
  weapons: weaponsRouter,
  materials: materialsRouter,
  echoes: echoesRouter,
});

export type AppRouter = typeof appRouter;
