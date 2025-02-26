import React from "react";
import { ReactQueryProvider } from "../../modules/react-query/ReactQueryProvider/ReactQueryProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tax Calculator Form"
}

export default function TaxCalculatorLayout({ children }: React.PropsWithChildren) {
  return (
    <ReactQueryProvider>
      {children}
    </ReactQueryProvider>
  );
}