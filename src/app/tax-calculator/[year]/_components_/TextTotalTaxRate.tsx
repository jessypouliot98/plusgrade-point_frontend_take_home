import { fmtPercent } from "../../../../utils/fmt/fmtPercent";
import { fmtCurrency } from "../../../../utils/fmt/fmtCurrency";
import React from "react";

export type TextTotalTaxRateProps = {
  className?: string;
  relativeRate: number;
  totalTaxes: number;
}

export function TextTotalTaxRate({ className, relativeRate, totalTaxes }: TextTotalTaxRateProps) {
  return (
    <span className={className}>
      {`${fmtPercent(relativeRate, 2)} `}
      <span className="text-xs text-gray-700 italic">{`(${fmtCurrency(totalTaxes)})`}</span>
    </span>
  )
}