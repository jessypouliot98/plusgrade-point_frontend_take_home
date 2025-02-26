import React from "react";
import { ReactQueryProvider } from "../../../modules/react-query/ReactQueryProvider/ReactQueryProvider";
import { Metadata } from "next";
import Link from "next/link";
import { buildCalculatorUrl } from "./_utils_/buildCalculatorUrl";
import { CalculatorMenu } from "./_components_/CalculatorMenu";

type PageProps = { params: Promise<{ year: string }> };

export async function generateMetadata(
  { params }: PageProps,
): Promise<Metadata> {
  const { year } = await params;

  return {
    title: `${year} Tax Calculator`,
  }
}

export default async function TaxCalculatorLayout({ children, params }: React.PropsWithChildren<PageProps>) {
  const { year } = await params;

  return (
    <div className="min-h-screen bg-gray-50 grid grid-rows-[auto_1fr]">
      <header className="bg-gray-300 px-4 py-6">
        <div className="max-w-screen-lg mx-auto">
          <h1 className="text-4xl">{`${year} Tax Calculator`}</h1>
          <CalculatorMenu/>
        </div>
      </header>
      <main>
        <div className="h-full bg-gray-100 max-w-screen-lg px-4 py-12 mx-auto">
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
        </div>
      </main>
    </div>
  );
}
