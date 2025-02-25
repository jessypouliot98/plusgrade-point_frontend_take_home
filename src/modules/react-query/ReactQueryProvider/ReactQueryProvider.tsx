"use client";

import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { client } from "../client";

export function ReactQueryProvider({ children }: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  )
}