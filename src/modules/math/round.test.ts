import { describe, expect, it } from "@jest/globals";
import { round } from "./round";

describe(round.name, () => {

  it.each<{
    params: Parameters<typeof round>;
    result: number;
  }>([
    {
      params: [1.005, 2],
      result: 1.01,
    },
    {
      params: [1.00, 2],
      result: 1,
    },
    {
      params: [-1.509, 2],
      result: -1.51,
    },
    {
      params: [NaN, 2],
      result: NaN,
    },
    {
      params: [Infinity, 2],
      result: Infinity,
    }
  ])("returns a rounded value with a decimal precision", ({ params, result }) => {
    expect(round(...params)).toBe(result);
  })

})