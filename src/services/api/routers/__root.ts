import { router } from "@/services/api";
import { echoesRouter } from "@/services/api/routers/echoes";
import { materialsRouter } from "@/services/api/routers/materials";
import { resonatorsRouter } from "@/services/api/routers/resonators";
import { weaponsRouter } from "@/services/api/routers/weapons";
import { myResonatorsRouter } from "@/services/api/routers/my-resonators";

export const appRouter = router({
  resonators: resonatorsRouter,
  weapons: weaponsRouter,
  materials: materialsRouter,
  echoes: echoesRouter,
  myResonators: myResonatorsRouter,
});

export type AppRouter = typeof appRouter;
