import "./index.css";

import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { Loader } from "@/components/loader";
import { TRPCQueryProvider } from "@/trpc/provider";
import { trpc, queryClient } from "@/trpc/client";

import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    context: { trpc, queryClient },
    defaultPendingComponent: () => <Loader />,
    defaultNotFoundComponent: () => <div>Not Found</div>,
    Wrap: ({ children }) => <TRPCQueryProvider>{children}</TRPCQueryProvider>,
  });
  return router;
};

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
