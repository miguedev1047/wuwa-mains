import { EchoBreadcrumb } from "@panel/echoes/$id/-components/echo-breadcrumb";
import { EchoInfo } from "@panel/echoes/$id/-components/echo-info";
import { ErrorState } from "@/components/state-ui/error";
import { LoaderState } from "@/components/state-ui/loader";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/panel/echoes/$id/")({
  pendingComponent: () => <LoaderState title="Cargando eco..." />,
  errorComponent: () => <ErrorState title="No se pudo cargar el eco." />,
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="space-y-5">
      <EchoBreadcrumb />
      <EchoInfo />
    </main>
  );
}
