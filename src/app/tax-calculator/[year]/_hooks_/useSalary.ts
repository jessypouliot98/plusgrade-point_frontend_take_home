"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { isNil } from "../../../../utils/boolean/isNil";
import { isNotNil } from "../../../../utils/boolean/isNotNil";

export const SALARY_KEY = "s";

export function useSalary() {
  const searchParams = useSearchParams();
  const pathname = usePathname()
  const router = useRouter();
  const salaryText = searchParams.get(SALARY_KEY);
  let salaryValue: number | undefined = salaryText ? parseFloat(salaryText) : undefined;
  if (isNotNil(salaryValue) && isNaN(salaryValue)) {
    salaryValue = undefined;
  }

  return [
    salaryValue,
    (value: number | undefined) => {
      const newSearchParams = new URLSearchParams(searchParams);
      if (isNil(value)) {
        newSearchParams.delete(SALARY_KEY);
      } else {
        newSearchParams.set(SALARY_KEY, value.toString())
      }
      router.replace(`${pathname}?${newSearchParams}`);
    }
  ] as const;
}