import { ErrorState } from "@/components/state-ui/error";
import { LoaderState } from "@/components/state-ui/loader";
import { createFileRoute } from "@tanstack/react-router";
import { AddEchoForm } from "@/routes/_protected/panel/echoes/-components";

export const Route = createFileRoute("/_protected/panel/echoes/new/")({
  pendingComponent: () => <LoaderState title="Cargando formulario..." />,
  errorComponent: () => <ErrorState title="Error al cargar formulario..." />,
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <AddEchoForm />
    </main>
  );
}
