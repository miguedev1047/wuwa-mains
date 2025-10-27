import {
  ResonatorSkills,
  ResonatorInfo,
} from "@/routes/_protected/panel/resonators/$id/-sections";
import { ResonatorBreadcrumb } from "@/routes/_protected/panel/resonators/$id/-components";
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
      <ResonatorSkills />
    </main>
  );
}
