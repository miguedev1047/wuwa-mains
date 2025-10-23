import appCss from "../index.css?url";

import type { QueryClient } from "@tanstack/react-query";
import type { TRPCOptionsProxy } from "@trpc/tanstack-react-query";
import type { AppRouter } from "@wuwa-mains/api/routers/index";

import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouterState,
} from "@tanstack/react-router";
import { Loader } from "@/components/loader";
import { Toaster } from "@/components/ui/sonner";
import { Devtools } from "@/components/devtools";
import { ThemeProvider } from "@/components/theme-provider";
import { NuqsAdapter } from "nuqs/adapters/tanstack-router";

export interface RouterAppContext {
  trpc: TRPCOptionsProxy<AppRouter>;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Wuwa Mains",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  component: RootDocument,
});

function RootDocument() {
  const isFetching = useRouterState({ select: (s) => s.isLoading });
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          enableSystem
          disableTransitionOnChange
          defaultTheme="dark"
          storageKey="theme"
        >
          <NuqsAdapter>
            <div className="grid h-svh grid-rows-[auto_1fr]">
              {isFetching ? <Loader /> : <Outlet />}
            </div>
          </NuqsAdapter>
          <Toaster richColors />
        </ThemeProvider>
        <Devtools />
        <Scripts />
      </body>
    </html>
  );
}
