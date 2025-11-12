import { createFileRoute } from "@tanstack/react-router";
import { ErrorState } from "@/components/state-ui/error";
import { LoaderState } from "@/components/state-ui/loader";

export const Route = createFileRoute("/_protected/panel/my-resonators")({
  pendingComponent: () => (
    <LoaderState title="Cargando tus resonadores... Espera un momento..." />
  ),
  errorComponent: () => (
    <ErrorState title="Ha ocurrido un error al mostrar tus personajes." />
  ),
  beforeLoad: async ({ context }) => {
    const resonators = await context.queryClient.ensureQueryData(
      context.trpc.resonators.full.queryOptions(),
    );
    const weapons = await context.queryClient.ensureQueryData(
      context.trpc.weapons.full.queryOptions(),
    );
    const echoes = await context.queryClient.ensureQueryData(
      context.trpc.echoes.get.queryOptions(),
    );
    const myResonators = await context.queryClient.ensureQueryData(
      context.trpc.myResonators.get.queryOptions({ userId: context.user.id }),
    );
    return { resonators, weapons, echoes, myResonators };
  },
});
