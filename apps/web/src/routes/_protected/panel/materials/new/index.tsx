import { createFileRoute } from "@tanstack/react-router";
import { ErrorState } from "@/components/state-ui/error";
import { LoaderState } from "@/components/state-ui/loader";
import { AddMaterialForm } from "@/routes/_protected/panel/materials/-components";

export const Route = createFileRoute("/_protected/panel/materials/new/")({
  pendingComponent: () => <LoaderState title="Cargando formulario..." />,
  errorComponent: () => <ErrorState title="Error al cargar formulario..." />,
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <AddMaterialForm />
    </main>
  );
}
