import { describe, expect, it } from "@jest/globals";
import { isNotNil } from "./isNotNil";

describe(isNotNil.name, () => {

  it.each([
    [undefined, false],
    [null, false],
    [NaN, true],
    [0, true],
    ["", true],
    [[], true],
    [false, true],
  ])("returns a false when the value is undefined or null (nil)", (value, result) => {
    expect(isNotNil(value)).toBe(result);
  })

})