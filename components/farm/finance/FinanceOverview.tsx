import FinanceOverviewHeader from "./FinanceOverviewHeader";
import FinanceSummary from "./FinanceSummary";
import FinanceTables from "./FinanceTables";

export default function FinanceOverview() {
  return (
    <div className="border border-border rounded-md">
      <FinanceOverviewHeader />
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_20rem]">
        <FinanceTables />
        <FinanceSummary />
      </div>
    </div>
  );
}
