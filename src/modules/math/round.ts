export function round(value: number, decimals = 0) {
  const multiplier = 10 ** decimals
  return Math.round((value + Number.EPSILON) * multiplier) / multiplier;
}