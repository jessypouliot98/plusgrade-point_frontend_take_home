// Ended up not using it 🤷‍♂️

import { ComponentPropsWithRef } from "react";
import { Slot, SlotProps } from "@radix-ui/react-slot";
import { clsx } from "clsx";

const variants = {
  none: "",
  primary: "text-white bg-blue-600 hover:bg-blue-700 aria-disabled:opacity-40"
} satisfies Record<string, string>;

type Variant = keyof typeof variants;

export type ButtonProps<TAsChild extends boolean> =
  & (TAsChild extends false
    ? ComponentPropsWithRef<"button">
    : SlotProps)
  & {
  asChild?: TAsChild;
  disabled?: boolean;
  variant?: Variant;
  inline?: boolean;
}

export function Button<TAsChild extends boolean = false>({
  asChild,
  children,
  className,
  variant = "primary",
  inline = false,
  ...buttonProps
}: ButtonProps<TAsChild>) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      {...buttonProps}
      className={clsx(
        inline ? "inline-flex" : "flex",
        "transition-colors",
        "items-center px-2 py-2",
        variants[variant],
        className,
      )}
      aria-disabled={!!buttonProps.disabled}
      data-variant={variant}
    >
      {children}
    </Comp>
  )
}