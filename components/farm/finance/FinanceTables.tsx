import React from "react";
import FinanceSalesTable from "./FinanceSalesTable";
import FinanceExpenseTable from "./FinanceExpenseTable";

export default function FinanceTables() {
  return (
    <div className="border-r border-border">
      <FinanceSalesTable />

      <FinanceExpenseTable />
    </div>
  );
}
