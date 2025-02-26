import { describe, expect, it } from "@jest/globals";
import { isNil } from "./isNil";

describe(isNil.name, () => {

  it.each([
    [undefined, true],
    [null, true],
    [NaN, false],
    [0, false],
    ["", false],
    [[], false],
    [false, false],
  ])("returns a true when the value is undefined or null (nil)", (value, result) => {
    expect(isNil(value)).toBe(result);
  })

})