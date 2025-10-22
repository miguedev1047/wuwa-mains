import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/root";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      context.trpc.healthCheck.queryOptions(),
    );
    await context.queryClient.ensureQueryData(
      context.trpc.resonators.get.queryOptions(),
    );
  },
  component: HomeComponent,
});

const TITLE_TEXT = `
 ██████╗ ███████╗████████╗████████╗███████╗██████╗
 ██╔══██╗██╔════╝╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗
 ██████╔╝█████╗     ██║      ██║   █████╗  ██████╔╝
 ██╔══██╗██╔══╝     ██║      ██║   ██╔══╝  ██╔══██╗
 ██████╔╝███████╗   ██║      ██║   ███████╗██║  ██║
 ╚═════╝ ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝

 ████████╗    ███████╗████████╗ █████╗  ██████╗██╗  ██╗
 ╚══██╔══╝    ██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝
    ██║       ███████╗   ██║   ███████║██║     █████╔╝
    ██║       ╚════██║   ██║   ██╔══██║██║     ██╔═██╗
    ██║       ███████║   ██║   ██║  ██║╚██████╗██║  ██╗
    ╚═╝       ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
 `;

function HomeComponent() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-2">
      <pre className="overflow-x-auto font-mono text-sm">{TITLE_TEXT}</pre>

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
        <div
          className={`h-2 w-2 rounded-full ${healthCheck ? "bg-green-500" : "bg-red-500"}`}
        />
        <pre>
          <code>{healthCheck ? "Connected" : "Disconnected"}</code>
        </pre>
      </div>

      <Suspense fallback={<Spinner />}>
        <ResonatorsList />
      </Suspense>
    </div>
  );
}

function ResonatorsList() {
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
