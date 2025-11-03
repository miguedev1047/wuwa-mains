import { ResonatorSkills } from "@panel/resonators/$id/-sections/resonator-skills";
import { ResonatorInfo } from "@panel/resonators/$id/-sections/resonator-info";
import { ResonatorLevels } from "@panel/resonators/$id/-sections/resonator-levels";
import { ResonatorBonus } from "@panel/resonators/$id/-sections/resonator-bonus";
import { ResonatorChanResonance } from "@panel/resonators/$id/-sections/resonator-chain-resonance";
import { ResonatorBreadcrumb } from "@panel/resonators/-components/resonator-breadcrumb";
import { ErrorState } from "@/components/state-ui/error";
import { LoaderState } from "@/components/state-ui/loader";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/panel/resonators/$id/")({
  loader: async ({ params, context }) => {
    const data = await context.queryClient.ensureQueryData(
      context.trpc.resonators.unique.queryOptions({ id: params.id }),
    );
    return { data };
  },
  head: async ({ loaderData }) => {
    const resonatorName = loaderData?.data.name;
    return {
      meta: [
        {
          title: `Wuwa Mains - ${resonatorName}`,
        },
      ],
    };
  },
  pendingComponent: () => <LoaderState title="Cargando resonador..." />,
  errorComponent: () => <ErrorState title="No se pudo cargar el resonador." />,
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="space-y-5">
      <ResonatorBreadcrumb />
      <ResonatorInfo />
      <ResonatorLevels />
      <ResonatorSkills />
      <ResonatorBonus />
      <ResonatorChanResonance />
    </main>
  );
}
