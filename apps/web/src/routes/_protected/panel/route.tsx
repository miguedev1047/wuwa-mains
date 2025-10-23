import { PanelSidebarRoot } from "@/components/shared-ui/panel-sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/panel")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PanelSidebarRoot>
      <Outlet />
    </PanelSidebarRoot>
  );
}
