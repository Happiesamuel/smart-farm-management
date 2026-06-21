import ReportBoxes from "./ReportBoxes";
import ReportFilters from "./ReportFilters";
import ReportHeader from "./ReportHeader";

export default function Reports() {
  return (
    <div className="pt-18 px-2 sm:px-4 pb-8">
      <ReportHeader />
      <ReportFilters />
      <ReportBoxes
        stat={{
          totalRevenue: 0,
          totalExpenses: 0,
          netProfit: 0,
          profitMargin: 0,
        }}
      />
    </div>
  );
}
