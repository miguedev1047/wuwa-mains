import { MaterialBreadcrumb } from "@panel/materials/$id/-components/material-breadcrumb";
import { MaterialInfo } from "@panel/materials/$id/-components/material-info";
import { ErrorState } from "@/components/state-ui/error";
import { LoaderState } from "@/components/state-ui/loader";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/panel/materials/$id/")({
  pendingComponent: () => <LoaderState title="Cargando material..." />,
  errorComponent: () => <ErrorState title="No se pudo cargar el material." />,
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="space-y-5">
      <MaterialBreadcrumb />
      <MaterialInfo />
    </main>
  );
}
