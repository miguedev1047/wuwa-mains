import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/root";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { LinkIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/test/")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      context.trpc.healthCheck.queryOptions(),
    );
    await context.queryClient.ensureQueryData(
      context.trpc.resonators.get.queryOptions(),
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-2">
      <div className="grid gap-6">
        <section className="flex flex-col items-start gap-4 rounded-lg border p-4">
          <h2 className="mb-2 font-medium">API Status</h2>
          <Suspense fallback={<Spinner />}>
            <HealthCheck />
          </Suspense>
        </section>
      </div>
    </div>
  );
}

function HealthCheck() {
  const trpc = useTRPC();
  const { data: healthCheck } = useSuspenseQuery(
    trpc.healthCheck.queryOptions(),
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        <Button>
          <div
            className={`h-2 w-2 rounded-full ${healthCheck ? "bg-green-500" : "bg-red-500"}`}
          />
          <pre>
            <code>{healthCheck ? "Connected" : "Disconnected"}</code>
          </pre>
        </Button>
        <Button asChild>
          <Link to="/login">
            <LinkIcon />
            Iniciar Sesión
          </Link>
        </Button>
      </div>

      <ul className="w-full grid grid-cols-8 gap-4">
        {[...Array(32)].map((_, index) => (
          <li key={index}>
            <Skeleton className="aspect-square" />
          </li>
        ))}
      </ul>

      <Suspense fallback={<Spinner />}>
        <Resonator />
      </Suspense>
    </div>
  );
}

function Resonator() {
  const trpc = useTRPC();
  const { data: resonators } = useSuspenseQuery(
    trpc.resonators.get.queryOptions(),
  );

  const firstResonator = resonators[0];

  return (
    <div>
      <h3 className="text-xl font-bold">{firstResonator.name}</h3>
      <pre className="max-w-[720px] w-full overflow-hidden">
        <code className="wrap-break-word">
          {JSON.stringify(firstResonator, null, 2)}
        </code>
      </pre>
    </div>
  );
}
