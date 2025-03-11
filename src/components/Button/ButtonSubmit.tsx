import { Button, ButtonProps } from "./Button";
import { useEffect, useRef } from "react";
import { FormState } from "react-hook-form";
import { clsx } from "clsx";
import { ImSpinner } from "react-icons/im";
import { isNil } from "../../utils/boolean/isNil";

export type ButtonSubmitProps = Omit<ButtonProps<false>, "type"> & {
  formState: Pick<FormState<object>, "isDirty" | "isSubmitting">;
}

export function ButtonSubmit({ children, variant, inline, className, style, disabled, formState, ...buttonProps }: ButtonSubmitProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isDisabled = disabled || !formState.isDirty;
  const sizeRef = useRef<[width: number, height: number] | null>(null);

  // Force a size when changing render to spinner during submission to prevent layout shifts
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    if (isNil(sizeRef.current)) {
      const rect = button.getBoundingClientRect();
      sizeRef.current = [rect.width, rect.height];
    } else if (!formState.isSubmitting) {
      button.style.minWidth = "";
      button.style.minHeight = "";
    } else {
      const [width, height] = sizeRef.current;
      button.style.minWidth = `${width}px`;
      button.style.minHeight = `${height}px`;
    }
  }, [formState.isSubmitting]);

  return (
    <Button
      className={clsx(
        className,
      )}
      style={style}
      disabled={isDisabled}
      asChild
    >
      <button
        ref={buttonRef}
        {...buttonProps}
      >
        {!formState.isSubmitting ? (
          children
        ) : (
          <div className="flex-1 grid place-items-center">
            <ImSpinner className="animate-spin" />
          </div>
        )}
      </button>
    </Button>
  )
}