import { describe, expect, it } from "@jest/globals";
import { calculateTotalTaxes, TaxBracket } from "./calculateTotalTaxes";

const taxBrackets: TaxBracket[] = [
  { min: 0, max: 10_000, rate: 0.1 },
  { min: 10_000, max: 20_000, rate: 0.2 },
  { min: 20_000, max: 30_000, rate: 0.3 },
  { min: 30_000, max: undefined, rate: 0.5 },
]

describe(calculateTotalTaxes.name, () => {

  it.each([
    [0, 0],
    [-10_000, 0],
    [10_000, 1_000],
    [20_000, 3_000],
    [30_000, 6_000],
    [60_000, 21_000],
  ])("calculates the marginal taxes for a given salary", (salary, taxAmount) => {
    expect(calculateTotalTaxes(salary, taxBrackets)).toBe(taxAmount)
  })

})