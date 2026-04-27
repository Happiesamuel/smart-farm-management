import React from "react";
import FinanceTotal from "./FinanceTotal";
import FinanceTopSelling from "./FinanceTopSelling";
import { FinanceCategoryPieChart } from "./FinanceCategoryPieChart";

export default function FinanceSummary() {
  return (
    <div>
      <div className="border border-border rounded-md m-1.5 p-2 pt-4">
        <FinanceTotal />
        <FinanceCategoryPieChart />
        <FinanceTopSelling />
      </div>
    </div>
  );
}
