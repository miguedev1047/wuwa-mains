import {
  ResonatorBreadcrumb,
  ResonatorInfo,
} from "@/routes/_protected/panel/resonators/$id/-components";
import { ErrorState } from "@/components/state-ui/error";
import { LoaderState } from "@/components/state-ui/loader";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/panel/resonators/$id/")({
  pendingComponent: () => <LoaderState title="Cargando resonador..." />,
  errorComponent: () => <ErrorState title="No se pudo cargar el resonador." />,
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="space-y-5">
      <ResonatorBreadcrumb />
      <ResonatorInfo />
    </main>
  );
}
