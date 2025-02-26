import { isNotNil } from "../../../../utils/boolean/isNotNil";
import { SALARY_KEY } from "../_hooks_/useSalary";

export function buildCalculatorUrl(year: number, salary?: number) {
  const pathname = `/tax-calculator/${year}`;
  return isNotNil(salary) ? `${pathname}?${SALARY_KEY}=${salary}` : pathname;
}