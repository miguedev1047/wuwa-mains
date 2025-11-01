import { router } from "@/server/api";
import { bonusRouter } from "@/server/api/routers/bonus";
import { chainResonanceRouter } from "@/server/api/routers/chain";
import { echoesRouter } from "@/server/api/routers/echoes";
import { levelsRouter } from "@/server/api/routers/levels";
import { materialsRouter } from "@/server/api/routers/materials";
import { resonatorsRouter } from "@/server/api/routers/resonators";
import { skillsRouter } from "@/server/api/routers/skills";
import { weaponsRouter } from "@/server/api/routers/weapons";

export const appRouter = router({
  resonators: resonatorsRouter,
  weapons: weaponsRouter,
  skills: skillsRouter,
  materials: materialsRouter,
  echoes: echoesRouter,
  bonus: bonusRouter,
  chains: chainResonanceRouter,
  levels: levelsRouter,
});

export type AppRouter = typeof appRouter;
