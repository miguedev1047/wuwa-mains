import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/panel/home/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();
  return (
    <div className="p-4 w-full h-full">
      <pre>
        <code>{JSON.stringify(user, null, 2)}</code>
      </pre>
    </div>
  );
}
