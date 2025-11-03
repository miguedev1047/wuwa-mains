import { ResonatorList } from "@panel/resonators/-components/resonator-list";
import { ResonatorHeader } from "@panel/resonators/-components/resonator-header";
import { LoaderState } from "@/components/state-ui/loader";
import { ErrorState } from "@/components/state-ui/error";
import { Suspense } from "react";
import { ListSkeleton } from "@/components/state-ui/skeletons";
import { createFileRoute } from "@tanstack/react-router";
import { searchParams } from "@panel/resonators/-hooks/use-resonator-list";
import { createStandardSchemaV1 } from "nuqs";

export const Route = createFileRoute("/_protected/panel/resonators/")({
  pendingComponent: () => <LoaderState title="Cargando resonadores..." />,
  errorComponent: () => <ErrorState title="Error al cargar los resonadores." />,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      context.trpc.resonators.get.queryOptions(),
    );
  },
  validateSearch: createStandardSchemaV1(searchParams, { partialOutput: true }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="space-y-6 w-full min-h-[calc(100vh-10rem)]">
      <ResonatorHeader />
      <Suspense fallback={<ListSkeleton />}>
        <ResonatorList />
      </Suspense>
    </main>
  );
}
