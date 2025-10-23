import { ErrorState } from "@/components/state-ui/error";
import { getSession } from "@/functions/get-session";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  errorComponent: () => (
    <ErrorState
      title="Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo más tarde."
      className="w-full max-w-[400px] mx-auto h-screen!"
    />
  ),
  beforeLoad: async () => {
    const session = await getSession();
    if (!session) {
      throw redirect({ to: "/login" });
    }
    return { user: session.user, role: session.user.role };
  },
});
