import { EchoHeader } from "@panel/echoes/-components/echo-header";
import { EchoList } from "@panel/echoes/-components/echo-list";
import { ErrorState } from "@/components/state-ui/error";
import { LoaderState } from "@/components/state-ui/loader";
import { createFileRoute } from "@tanstack/react-router";
import { createStandardSchemaV1 } from "nuqs";
import { searchParams } from "@panel/echoes/-hooks/use-echo-list";
import { ListSkeleton } from "@/components/state-ui/skeletons";
import { Suspense } from "react";

export const Route = createFileRoute("/_protected/panel/echoes/")({
  pendingComponent: () => <LoaderState title="Cargando ecos..." />,
  errorComponent: () => <ErrorState title="Error al cargar los ecos." />,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      context.trpc.echoes.get.queryOptions(),
    );
  },
  validateSearch: createStandardSchemaV1(searchParams, { partialOutput: true }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="space-y-6 w-full min-h-[calc(100vh-10rem)]">
      <EchoHeader />
      <Suspense fallback={<ListSkeleton />}>
        <EchoList />
      </Suspense>
    </main>
  );
}
