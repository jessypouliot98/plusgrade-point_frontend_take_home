type TaxBracket = {
  min: number;
  max?: number;
  rate: number;
}

export function calculateTotalTaxes(salary: number, taxBrackets: TaxBracket[]): number {
  let total = 0;

  for (const taxBracket of taxBrackets) {
    if (taxBracket.min >= salary) {
      break;
    }

    const amountInBracket = Math.min(salary, taxBracket.max ?? salary) - taxBracket.min;
    total += amountInBracket * taxBracket.rate;
  }

  return total;
}