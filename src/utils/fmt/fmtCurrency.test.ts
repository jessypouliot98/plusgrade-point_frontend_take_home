import { describe, expect, it } from "@jest/globals";
import { fmtCurrency } from "./fmtCurrency";

describe(fmtCurrency.name, () => {

  it.each<{ params: Parameters<typeof fmtCurrency>, result: string }>([
    {
      params: [10.99],
      result: "$10.99"
    },
    {
      params: [10.99, { showDecimals: true }],
      result: "$10.99"
    },
    {
      params: [10.99, { showDecimals: false }],
      result: "$11"
    },
    {
      params: [-50.99, { showDecimals: true }],
      result: "-$50.99"
    },
    {
      params: [-50.99, { showDecimals: false }],
      result: "-$51"
    },
    {
      params: [NaN],
      result: "$NaN"
    },
    {
      params: [Infinity],
      result: "$Infinity"
    },
  ])("formats the currency value as a string", ({ params, result }) => {
    expect(fmtCurrency(...params)).toBe(result);
  });

})