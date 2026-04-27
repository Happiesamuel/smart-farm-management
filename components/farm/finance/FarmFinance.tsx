import React from "react";
import FarmFinanceBoxes from "./FarmFinanceBoxes";
import FarmLineChart from "../overview/FarmLineChart";
import { FinancePieChart } from "./FinancePieChart";

export default function FarmFinance() {
  return (
    <div className="pt-4">
      <FarmFinanceBoxes />
      <div className="flex items-center gap-4 flex-col lg:flex-row">
        <FarmLineChart />
        <FinancePieChart />
      </div>
    </div>
  );
}
