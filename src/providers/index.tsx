"use client";

import { useState, useEffect, type PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { useAuth } from "@/store/auth";

export function Providers({ children }: PropsWithChildren) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={client}>
      <AuthInitializer />
      {children}
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          classNames: {
            toast: "!bg-bg-2 !text-bone !border-line-2 !rounded-none",
            title: "!font-mono !text-[11px] !uppercase !tracking-[0.24em]",
            description: "!text-fg-muted !text-xs",
          },
        }}
      />
    </QueryClientProvider>
  );
}

function AuthInitializer() {
  const init = useAuth((s) => s.init);
  useEffect(() => { init(); }, [init]);
  return null;
}