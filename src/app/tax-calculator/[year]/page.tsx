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

const TABLE = {
  columns: 3,
}

export default function TaxCalculatorPage() {
  const params = useParams<{ year: string }>();
  const taxYear = Number(params.year);
  const { getWeakKey } = useWeakKey("tax-bracket");
  const query = useFetchTaxBracketListQuery({ taxYear });

  return (
    <>
      <table className="styled-table w-full">
        <thead>
        <tr>
          <th>Tax Rate</th>
          <th>Salary (min)</th>
          <th>Salary (max)</th>
        </tr>
        </thead>
        <ReactQueryBoundary
          query={query}
          dataExtractor={(res) => res.data.tax_brackets}
          renderLoading={() => (
            <tbody>
              {Array.from({ length: 3 }, (_, i) => (
                <tr key={`skeleton-${i}`}>
                  <td><SkeletonText className="w-12"/></td>
                  <td><SkeletonText className="w-16"/></td>
                  <td><SkeletonText className="w-16"/></td>
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
                <td>{fmtPercent(taxBracket.rate, 2)}</td>
                <td>{fmtCurrency(taxBracket.min)}</td>
                <td>{isNotNil(taxBracket.max) ? fmtCurrency(taxBracket.max) : "-"}</td>
              </tr>
            ))}
            </tbody>
          )}
        />
      </table>
    </>
  )
}