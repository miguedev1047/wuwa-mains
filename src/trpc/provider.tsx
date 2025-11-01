import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient, trpcClient } from "@/trpc/client";
import { TRPCProvider } from "@/trpc/root";

interface TRPCQueryProviderProps {
  children: React.ReactNode;
}

export function TRPCQueryProvider({ children }: TRPCQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}
