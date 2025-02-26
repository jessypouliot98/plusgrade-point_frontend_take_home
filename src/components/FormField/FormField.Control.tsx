"use client";

import { Controller, ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { FormField, FormFieldProps, RenderInputProps } from "./FormField";
import React from "react";

export type FormFieldControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> =
  & Omit<ControllerProps<TFieldValues, TName>, "render">
  & Pick<FormFieldProps, "label" | "className">
  & {
    renderInput: (
      params: Parameters<ControllerProps<TFieldValues, TName>["render"]>[0] & { inputProps: RenderInputProps }
    ) => React.ReactElement;
  };

export function FormFieldControl<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    className,
    label,
    control,
    name,
    renderInput,
  }: FormFieldControlProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={(controlArgs) => (
        <FormField
          className={className}
          label={label}
          error={controlArgs.fieldState.error}
          renderInput={(inputProps) => {
            return renderInput({
              ...controlArgs,
              inputProps,
            });
          }}
        />
      )}
    />
  );
}