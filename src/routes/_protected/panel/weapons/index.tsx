import { WeaponList } from "@panel/weapons/-components/weapon-list";
import { WeaponHeader } from "@panel/weapons/-components/weapon-header";
import { ErrorState } from "@/components/state-ui/error";
import { createFileRoute } from "@tanstack/react-router";
import { createStandardSchemaV1 } from "nuqs";
import { searchParams } from "@panel/weapons/-hooks/use-weapon-list";
import { LoaderState } from "@/components/state-ui/loader";
import { Suspense } from "react";
import { ListSkeleton } from "@/components/state-ui/skeletons";

export const Route = createFileRoute("/_protected/panel/weapons/")({
  pendingComponent: () => <LoaderState title="Cargando armas..." />,
  errorComponent: () => <ErrorState title="Error al cargar las armas." />,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      context.trpc.weapons.get.queryOptions(),
    );
  },
  validateSearch: createStandardSchemaV1(searchParams, { partialOutput: true }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="space-y-6 w-full min-h-[calc(100vh-10rem)]">
      <WeaponHeader />
      <Suspense fallback={<ListSkeleton />}>
        <WeaponList />
      </Suspense>
    </main>
  );
}
