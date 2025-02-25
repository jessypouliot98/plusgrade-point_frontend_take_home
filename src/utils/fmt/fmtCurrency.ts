// Can add i18n support for formatting in en-CA / fr-CA / en-US / etc.

export function fmtCurrency(value: number, opts: { showDecimals: boolean } = { showDecimals: true }) {
  return `$${value.toFixed(opts.showDecimals ? 2 : 0)}`
}