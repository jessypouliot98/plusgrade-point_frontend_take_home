"use client";

import Link from "next/link";
import { buildCalculatorUrl } from "../_utils_/buildCalculatorUrl";
import React from "react";
import { useParams } from "next/navigation";
import { useSalary } from "../_hooks_/useSalary";

export function CalculatorMenu() {
  const now = new Date();
  const { year } = useParams<{ year: string }>();
  const [salary] = useSalary();
  const taxYear = Number(year);

  return (
    <nav>
      <menu className="flex items-center gap-4">
        <li>
          <Link className="transition-colors text-blue-500 hover:text-blue-600 underline"
                href={buildCalculatorUrl(taxYear - 1, salary)}>
            Previous calculator
          </Link>
        </li>
        {taxYear < now.getFullYear() && (
          <li>
            <Link className="transition-colors text-blue-500 hover:text-blue-600 underline"
                  href={buildCalculatorUrl(taxYear + 1, salary)}>
              Next calculator
            </Link>
          </li>
        )}
        {taxYear !== now.getFullYear() && (
          <li>
            <Link className="transition-colors text-blue-500 hover:text-blue-600 underline"
                  href={`/tax-calculator`}>
              Current year's calculator
            </Link>
          </li>
        )}
      </menu>
    </nav>
  )
}