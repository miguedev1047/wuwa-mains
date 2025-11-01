import { createFileRoute } from "@tanstack/react-router";
import { AddResonatorForm } from "@/routes/_protected/panel/resonators/-components";
import { LoaderState } from "@/components/state-ui/loader";
import { ErrorState } from "@/components/state-ui/error";

export const Route = createFileRoute("/_protected/panel/resonators/new/")({
  pendingComponent: () => <LoaderState title="Cargando formulario..." />,
  errorComponent: () => <ErrorState title="Error al cargar formulario..." />,
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <AddResonatorForm />
    </main>
  );
}
