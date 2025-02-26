export function fmtPercent(percent: number, decimalPoints = 1) {
  return `${(percent * 100).toFixed(decimalPoints)}%`;
}