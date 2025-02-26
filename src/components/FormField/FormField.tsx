import React, { useId } from "react";
import { isNotNil } from "../../utils/boolean/isNotNil";
import { extractErrorMessage } from "../../utils/error/extractErrorMessage";

export type RenderInputProps = { id: string };

export type FormFieldProps = {
  className?: string;
  label?: string;
  error?: unknown;
  renderInput: (props: RenderInputProps) => React.ReactNode;
}

export function FormField({
  className,
  label,
  error,
  renderInput,
}: FormFieldProps) {
  const uid = useId();

  return (
    <div className={className}>
      {isNotNil(label) && (
        <div className="mb-2">
          <label htmlFor={uid} className="text-sm leading-tight font-medium">
            {label}
          </label>
        </div>
      )}
      {renderInput({ id: uid })}
      {isNotNil(error) && (
        <div className="text-red-500 text-sm leading-tight mt-2">
          {extractErrorMessage(error)}
        </div>
      )}
    </div>
  );
}