import { createTRPCContext } from "@trpc/tanstack-react-query";
import type { AppRouter } from "@wuwa-mains/api/routers/__root";

export const { TRPCProvider, useTRPC, useTRPCClient } =
  createTRPCContext<AppRouter>();
