import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/panel/admin/config/")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const currentRole = context.user.role;
    if (currentRole !== "ADMIN") {
      throw redirect({ to: "/panel/home" });
    }
  },
});

function RouteComponent() {
  return <div>Hello "/_protected/panel/admin/"!</div>;
}
