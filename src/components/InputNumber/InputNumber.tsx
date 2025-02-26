import React, { useEffect, useRef } from "react";
import { isNotNil } from "../../utils/boolean/isNotNil";

export type InputNumberProps = {
  id?: string;
  className?: string;
  value: number | undefined;
  onChangeValue: (value: number | undefined) => void;
  placeholder?: string;
};

export function InputNumber({ id, className, value, placeholder, onChangeValue }: InputNumberProps) {
  const ref = useRef<HTMLInputElement>(null);
  const lastValidValueRef = useRef<number | undefined>((isNotNil(value) && isNaN(value)) ? undefined : value);

  useEffect(() => {
    const input = ref.current;
    if (!input) return;
    input.value = value?.toString() ?? "";
  }, [value]);

  return (
    <input
      ref={ref}
      type="text"
      id={id}
      className={className}
      defaultValue={value ?? ""}
      placeholder={placeholder}
      onKeyDown={(ev) => {
        if (ev.key === "Enter") {
          // Disable submit on enter
          ev.preventDefault();
          ref.current?.blur();
        }
      }}
      onChange={(ev) => {
        if (ev.target.value.trim() === "") {
          lastValidValueRef.current = undefined;
          ev.target.value = "";
          return;
        }
        // Allow only numbers "." and "-"
        ev.target.value = ev.target.value.replace(/[^0-9.-]+/g, "");
        const value = Number(ev.target.value);
        if (!isNaN(value)) {
          lastValidValueRef.current = value;
        }
      }}
      onBlur={(ev) => {
        if (ev.target.value.trim() === "") {
          onChangeValue(undefined);
          return;
        }
        // Take current value or last valid number value
        let value: number | undefined = Number(ev.target.value);
        if (isNaN(value)) {
          if (isNotNil(lastValidValueRef.current)) {
            value = lastValidValueRef.current;
            ev.target.value = value.toString();
          }
        }

        onChangeValue(value);
      }}
    />
  )
}