"use client";

import {
  QueryClient,
  QueryClientProvider,
  defaultShouldDehydrateQuery,
  isServer,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster as Sonner } from "~/components/ui/sonner";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 10 * MINUTE,
        staleTime: 1 * MINUTE,
        retry: false,
      },

      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

const MINUTE = 1000 * 60;

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ProgressBar
        style="style"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
      <Sonner
        richColors
        expand
        closeButton
        position="top-right"
        visibleToasts={4}
        style={{ zIndex: 99999 }}
        toastOptions={{
          duration: 5000,
          classNames: {
            error: "!bg-red-600 !text-white !border-red-700",
            success: "!bg-emerald-600 !text-white !border-emerald-700",
          },
        }}
      />
    </QueryClientProvider>
  );
}
