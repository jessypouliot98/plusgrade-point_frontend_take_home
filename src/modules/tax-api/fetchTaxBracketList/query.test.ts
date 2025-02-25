import { describe, expect, it } from "@jest/globals";
import { queryKeys } from "./query";

describe('fetchTaxBracketList', () => {

  describe(queryKeys.name, () => {

    it.each([-1, 2025, NaN])("returns a list of strings representing the url path", (taxYear) => {
      const keys = queryKeys({ taxYear });
      expect(keys).toHaveLength(3);
      expect(keys.at(-1)).toBe(taxYear.toString());
    })

  })

})