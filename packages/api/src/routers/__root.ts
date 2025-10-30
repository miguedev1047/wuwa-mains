import { router } from "../index";
import { bonusRouter } from "./bonus";
import { chainResonanceRouter } from "./chain";
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
  bonus: bonusRouter,
  chains: chainResonanceRouter,
});

export type AppRouter = typeof appRouter;
