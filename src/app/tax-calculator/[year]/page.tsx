"use client";

import { useParams } from "next/navigation";
import { useFetchTaxBracketListQuery } from "../../../modules/tax-api/fetchTaxBracketList/use-query";
import { ReactQueryBoundary } from "../../../modules/react-query/ReactQueryBoundary/ReactQueryBoundary";
import { useWeakKey } from "../../../modules/react/hooks/useWeakKey";
import { ErrorBanner } from "../../../components/ErrorBanner/ErrorBanner";
import { SkeletonText } from "../../../components/SkeletonText/SkeletonText";
import { fmtPercent } from "../../../utils/fmt/fmtPercent";
import { isNotNil } from "../../../utils/boolean/isNotNil";
import { fmtCurrency } from "../../../utils/fmt/fmtCurrency";
import { InputNumber } from "../../../components/InputNumber/InputNumber";
import React from "react";
import { calculateTotalTaxes } from "../../../modules/tax-calculator/utils/calculateTotalTaxes";
import { TextTotalTaxRate } from "./_components_/TextTotalTaxRate";
import { useSalary } from "./_hooks_/useSalary";

const TABLE = {
  columns: 3,
}

export default function TaxCalculatorPage() {
  const params = useParams<{ year: string }>();
  const taxYear = Number(params.year);
  const { getWeakKey } = useWeakKey("tax-bracket");
  const query = useFetchTaxBracketListQuery({ taxYear });
  const [salary, setSalary] = useSalary();

  return (
    <>
      <table className="styled-table w-full">
        <thead>
          <tr>
            <th>Salary (min)</th>
            <th>Salary (max)</th>
            <th className="w-1/2">Tax Rate</th>
          </tr>
        </thead>
        <ReactQueryBoundary
          query={query}
          dataExtractor={(res) => res.data.tax_brackets}
          emptyExtractor={(data) => data.length === 0}
          renderLoading={() => (
            <tbody>
              {Array.from({ length: 3 }, (_, i) => (
                <tr key={`skeleton-${i}`}>
                  <td><SkeletonText className="w-16"/></td>
                  <td><SkeletonText className="w-16"/></td>
                  <td><SkeletonText className="w-12"/></td>
                </tr>
              ))}
            </tbody>
          )}
          renderError={(error) => (
            <tbody>
              <tr>
                <td colSpan={TABLE.columns}>
                  <ErrorBanner error={error}/>
                </td>
              </tr>
            </tbody>
          )}
          renderEmpty={() => (
            <tbody>
              <tr>
                <td colSpan={TABLE.columns}>
                  <ErrorBanner error={"No tax brackets found"}/>
                </td>
              </tr>
            </tbody>
          )}
          renderContent={(taxBrackets) => (
            <tbody>
              {taxBrackets.map((taxBracket) => (
                <tr key={getWeakKey(taxBracket)}>
                  <td>{fmtCurrency(taxBracket.min)}</td>
                  <td>{isNotNil(taxBracket.max) ? fmtCurrency(taxBracket.max) : "-"}</td>
                  <td>{fmtPercent(taxBracket.rate, 2)}</td>
                </tr>
              ))}
            </tbody>
          )}
        />
        <tfoot>
          <tr>
            <td colSpan={TABLE.columns - 1}>
              <div className="flex items-center gap-[var(--px-cell)]">
                <label className="font-bold" htmlFor="salary">Salary:</label>
                <InputNumber
                  className="flex-1 border border-gray-300 p-1 rounded"
                  id="salary"
                  value={salary}
                  onChangeValue={setSalary}
                />
              </div>
            </td>
            <td>
              <ReactQueryBoundary
                query={query}
                dataExtractor={(res) => res.data.tax_brackets}
                emptyExtractor={(data) => data.length === 0}
                renderLoading={() => (
                  <TextTotalTaxRate className="animate-pulse" relativeRate={0} totalTaxes={0} />
                )}
                renderError={(error) => (
                  <TextTotalTaxRate className="opacity-40" relativeRate={0} totalTaxes={0} />
                )}
                renderEmpty={() => (
                  <TextTotalTaxRate className="opacity-40" relativeRate={0} totalTaxes={0} />
                )}
                renderContent={(taxBrackets) => {
                  let totalTaxes: number;
                  let relativeRate: number;
                  if (salary) {
                    totalTaxes = calculateTotalTaxes(salary, taxBrackets);
                    relativeRate = totalTaxes / salary;
                  } else {
                    totalTaxes = 0;
                    relativeRate = 0;
                  }
                  return (
                    <TextTotalTaxRate relativeRate={relativeRate} totalTaxes={totalTaxes} />
                  )
                }}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  )
}