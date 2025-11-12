import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_protected/panel/my-resonators/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Button asChild>
        <Link to="/panel/my-resonators/create">Nuevo resonador</Link>
      </Button>
    </div>
  );
}
