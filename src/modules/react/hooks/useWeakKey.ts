import { useRef, useState } from "react";

/**
 * Generates a unique React key based on object reference.
 * Useful for extracting out a unique value from a list item where no properties can be certain to be unique.
 */
export function useWeakKey<T extends WeakKey>(prefix?: string) {
  const indexRef = useRef(0);
  const [weakMap] = useState(() => new WeakMap<T, string>());

  return {
    getWeakKey: (item: T) => {
      let key = weakMap.get(item);
      if (typeof key !== "string") {
        key = indexRef.current.toString();
        indexRef.current++;
        weakMap.set(item, key);
      }
      return (prefix ?? "") + key;
    }
  }
}