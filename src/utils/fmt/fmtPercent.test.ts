import { fmtPercent } from "./fmtPercent";
import { describe, expect, it } from "@jest/globals";

describe(fmtPercent.name, () => {

  it.each<{ params: Parameters<typeof fmtPercent>, result: string }>([
    {
      params: [0.000001],
      result: "0.0%"
    },
    {
      params: [0.001],
      result: "0.1%"
    },
    {
      params: [2.0009, 3],
      result: "200.090%"
    },
    {
      params: [0.50, 0],
      result: "50%"
    },
    {
      params: [0.50, 0.5],
      result: "50%"
    },
    {
      params: [0.50, 1],
      result: "50.0%"
    },
    {
      params: [NaN],
      result: "NaN%"
    },
    {
      params: [Infinity],
      result: "Infinity%"
    }
  ])("formats the percent value as a string", ({ params, result }) => {
    expect(fmtPercent(...params)).toBe(result);
  });

  it("throws when a negative decimal value is given", () => {
    expect(() => fmtPercent(0, -1)).toThrow();
  })

})