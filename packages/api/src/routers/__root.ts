import { router } from "../index";
import { echoesRouter } from "./echoes";
import { materialsRouter } from "./materials";
import { resonatorsRouter } from "./resonators";
import { skillsRouter } from "./skills";
import { weaponsRouter } from "./weapons";

export const appRouter = router({
  resonators: resonatorsRouter,
  weapons: weaponsRouter,
  skills: skillsRouter,
  materials: materialsRouter,
  echoes: echoesRouter,
});

export type AppRouter = typeof appRouter;
