import { WeaponBreadcrumb } from "@panel/weapons/$id/-components/weapon-breadcrumb";
import { WeaponInfo } from "@panel/weapons/$id/-components/weapon-info";
import { ErrorState } from "@/components/state-ui/error";
import { LoaderState } from "@/components/state-ui/loader";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/panel/weapons/$id/")({
  pendingComponent: () => <LoaderState title="Cargando arma..." />,
  errorComponent: () => <ErrorState title="No se pudo cargar el arma." />,
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="space-y-5">
      <WeaponBreadcrumb />
      <WeaponInfo />
    </main>
  );
}
