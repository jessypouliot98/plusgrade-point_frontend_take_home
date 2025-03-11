"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { FormFieldControl } from "../../components/FormField/FormField.Control";
import { InputNumber } from "../../components/InputNumber/InputNumber";
import { round } from "../../modules/math/round";
import { isNotNil } from "../../utils/boolean/isNotNil";
import { ButtonSubmit } from "../../components/Button/ButtonSubmit";
import { fmtPercent } from "../../utils/fmt/fmtPercent";
import { fmtCurrency } from "../../utils/fmt/fmtCurrency";
import { fetchTaxBracketList } from "../../modules/tax-api/fetchTaxBracketList/query";
import { calculateTotalTaxes } from "../../modules/tax-calculator/utils/calculateTotalTaxes";
import { ErrorBanner } from "../../components/ErrorBanner/ErrorBanner";

const zForm = z.object({
  year: z.number().int().max(new Date().getFullYear(), "Cannot be in the future"),
  salary: z.number().positive()
})

export default function FormPage() {
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof zForm>) => {
      const response = await fetchTaxBracketList({ taxYear: data.year });
      const taxAmount = calculateTotalTaxes(data.salary, response.data.tax_brackets);
      return {
        salary: data.salary,
        year: data.year,
        taxAmount: taxAmount,
        marginalTaxRate: taxAmount / data.salary,
      };
    },
    retry: 3,
  });

  const form = useForm<Record<"salary" | "year", unknown>>({
    defaultValues: {
      salary: "",
      year: new Date().getFullYear(),
    },
    resolver: standardSchemaResolver(zForm)
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-screen-lg min-h-screen mx-auto bg-white space-y-6 py-6 px-4">
        <form
          className="space-y-6"
          onSubmit={form.handleSubmit((data) => mutation.mutateAsync(data as z.infer<typeof zForm>))}
        >
          {mutation.isError && (
            <ErrorBanner error={mutation.error} />
          )}
          <div className="grid grid-cols-2 gap-6">
            <FormFieldControl
              control={form.control}
              name="year"
              label="Year"
              renderInput={({ inputProps, field }) => (
                <input
                  type="number"
                  {...inputProps}
                  className="styled-input w-full"
                  value={field.value === "" ? undefined : Number(field.value)}
                  onChange={(ev) => field.onChange(ev.target.valueAsNumber)}
                />
              )}
            />
            <FormFieldControl
              control={form.control}
              name="salary"
              label="Salary"
              renderInput={({ inputProps, field }) => (
                <InputNumber
                  {...inputProps}
                  className="styled-input w-full"
                  value={typeof field.value === "number" && !isNaN(field.value) ? field.value : undefined}
                  onChangeValue={(value) => field.onChange(isNotNil(value) ? round(value, 2) : "")}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-end">
            <ButtonSubmit formState={form.formState}>
              Submit
            </ButtonSubmit>
          </div>
          {mutation.isSuccess && (
            <div>
              Your taxes for <span className="font-bold">{mutation.data.year}</span> for a salary of <span className="font-bold">{mutation.data.salary}</span> is of <span className="font-bold">{fmtPercent(mutation.data.marginalTaxRate, 2)}</span> <span className="text-xs text-gray-700 italic">{`(${fmtCurrency(mutation.data.taxAmount)})`}</span>
            </div>
          )}
        </form>
      </main>
    </div>
  )
}