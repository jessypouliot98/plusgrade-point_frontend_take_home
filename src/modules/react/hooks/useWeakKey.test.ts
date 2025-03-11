import { describe, expect, it } from "@jest/globals";
import { useWeakKey } from "./useWeakKey";
import { renderHook } from "@testing-library/react"

describe(useWeakKey.name, () => {

  describe("getWeakKey", () => {

    it("returns a unique string based on object reference", () => {
      const nonUniqueObjects = Array.from({ length: 3 }, () => ({ content: "not-very-unique" }));
      const [a, b, c] = nonUniqueObjects;
      const { result } = renderHook(() => useWeakKey("test"));

      for (let i = 0; i < 2; i++) {
        const { getWeakKey } = result.current;
        expect(getWeakKey(a)).toBe("test:0");
        expect(getWeakKey(b)).toBe("test:1");
        expect(getWeakKey(c)).toBe("test:2");
      }
    });

    it("caches the unique key with the prefix", () => {
      const nonUniqueObjects = Array.from({ length: 2 }, () => ({ content: "not-very-unique" }));
      const [a, b] = nonUniqueObjects;
      const { result, rerender } = renderHook(
        (prefix: string) => useWeakKey(prefix),
        { initialProps: "foo" },
      );
      let getWeakKey = result.current.getWeakKey;
      expect(getWeakKey(a)).toBe("foo:0");


      rerender("bar");
      getWeakKey = result.current.getWeakKey;

      expect(getWeakKey(a)).toBe("foo:0"); // <-- cached
      expect(getWeakKey(b)).toBe("bar:1");
    })

  })

})