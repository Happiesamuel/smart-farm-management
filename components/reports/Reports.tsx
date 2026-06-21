"use client";
import { ReportAreachart } from "./ReportAreaChart";
import ReportBoxes from "./ReportBoxes";
import ReportCropPerfomance from "./ReportCropPerformance";
import ReportFilters from "./ReportFilters";
import ReportHeader from "./ReportHeader";
import { ReportPieChart } from "./ReportPieChart";
import ReportTaskProductivity from "./ReportTaskProductivity";
import ReportTopPerforming from "./ReportTopPerforming";
import ReportTransactions from "./ReportTransaction";

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
      <div className=" grid grid-cols-1 lg:grid-cols-[1fr_0.5fr] xl:grid-cols-[1fr_0.8fr] items-stretch xl:h-[300px] justify-between gap-4">
        <ReportAreachart
          val={"month"}
          setVal={() => {}}
          chartData={[]}
          revenue={0}
          expense={0}
        />
        <ReportPieChart chartData={[]} total={0} />
      </div>
      <div className=" grid grid-cols-1 pt-4  md:grid-cols-2 xl:grid-cols-3 items-stretch  justify-between gap-4">
        <ReportTopPerforming farmData={[]} />
        <ReportCropPerfomance
          farmData={[
            {
              crop: "Rice",
              id: "1",
              profit: 90,
              revenue: 90,
              yield: 40,
            },
          ]}
        />
        <ReportTaskProductivity />
      </div>
      <ReportTransactions />
    </div>
  );
}
