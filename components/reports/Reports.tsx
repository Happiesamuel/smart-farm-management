"use client";
import { useApp } from "@/stores/useAppStore";
import { ReportAreachart } from "./ReportAreaChart";
import ReportBoxes from "./ReportBoxes";
import ReportCropPerfomance from "./ReportCropPerformance";
import ReportFilters from "./ReportFilters";
import ReportHeader from "./ReportHeader";
import { ReportPieChart } from "./ReportPieChart";
import ReportTaskProductivity from "./ReportTaskProductivity";
import ReportTopPerforming from "./ReportTopPerforming";
import ReportTransactions from "./ReportTransaction";
import { useRef, useState } from "react";
import { useGetCrops } from "@/hooks/crops/useCrops";
import { useGetFarm } from "@/hooks/farms/useFarm";
import { useGetFields } from "@/hooks/fields/useFields";
import { useGetHarvest } from "@/hooks/harvest/useHarvest";
import { useGetSales } from "@/hooks/sales/useSales";
import { useGetTasks } from "@/hooks/tasks/useTask";
import { useGetExpenses } from "@/hooks/expense/useExpense";
import { FormLoader, NoResult } from "../loader/GeneralLoader";
import { useSearchParams } from "next/navigation";
import {
  buildAreaChartData,
  buildCropPerformance,
  buildExpensePieData,
  buildFarmPerformance,
  buildOverviewStats,
  buildPreviousStats,
} from "@/lib/stat";
import { exportToCSV } from "@/lib/reportStat";

export default function Reports() {
  const { workspace, user, ready } = useApp();
  const reportRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const searchFarm = searchParams.get("farm");
  const farmName = searchFarm?.split("+").join(" ");
  const [val, setVal] = useState<"year" | "month">("month");
  const { crops, status, error } = useGetCrops(
    workspace?.id ?? null,
    user?.id ?? null,
  );
  const {
    farms,
    status: farmStat,
    error: farmErr,
  } = useGetFarm(workspace?.id ?? null, user?.id ?? null);
  const {
    fields,
    status: fieldStat,
    error: fieldErr,
  } = useGetFields(workspace?.id ?? null, user?.id ?? null);

  const {
    harvests,
    status: harvestStat,
    error: harvestErr,
  } = useGetHarvest(workspace?.id ?? null, user?.id ?? null);
  const {
    sales,
    status: saleStat,
    error: saleErr,
  } = useGetSales(workspace?.id ?? null, user?.id ?? null);
  const {
    tasks,
    status: taskStat,
    error: taskErr,
  } = useGetTasks(workspace?.id ?? null, user?.id ?? null);
  const {
    expenses,
    status: expStat,
    error: expErr,
  } = useGetExpenses(workspace?.id ?? null, user?.id ?? null);
  if (!ready)
    return (
      <div className="h-[92vh]">
        <FormLoader>Loading report app...</FormLoader>
      </div>
    );

  if (!user || !workspace)
    return (
      <div className="h-[92vh]">
        <NoResult>Unauthorised</NoResult>
      </div>
    );

  const isLoading =
    status === "pending" ||
    fieldStat === "pending" ||
    harvestStat === "pending" ||
    farmStat === "pending" ||
    taskStat === "pending" ||
    saleStat === "pending" ||
    expStat === "pending";

  if (isLoading)
    return (
      <div className="h-[92vh]">
        <FormLoader>Loading report stats...</FormLoader>
      </div>
    );

  const errorMessage =
    error?.message ||
    fieldErr?.message ||
    harvestErr?.message ||
    farmErr?.message ||
    taskErr?.message ||
    saleErr?.message ||
    expErr?.message;

  if (errorMessage)
    return (
      <div className="h-[92vh]">
        <NoResult>{errorMessage}</NoResult>
      </div>
    );
  const isWithinRange = (date: string | Date) => {
    const d = new Date(date);

    if (from && d < new Date(from)) return false;
    if (to && d > new Date(to)) return false;

    return true;
  };
  const selectedFarm = farms?.find((f) => f.farmName === farmName);

  const actualFarmId = selectedFarm?.$id;

  // Fields
  const filteredFields =
    farms?.filter((f) => (actualFarmId ? f.$id === actualFarmId : true)) ?? [];
  const fieldIds = filteredFields.map((f) => f.$id);

  // Sales
  const filteredSales =
    sales?.filter(
      (s) => fieldIds.includes(s.farms) && isWithinRange(s.saleDate as string),
    ) ?? [];

  // Expenses
  const filteredExpenses =
    expenses?.filter(
      (e) =>
        fieldIds.includes(e.farms) && isWithinRange(e.expenseDate as string),
    ) ?? [];
  // TASKS
  const filteredTasks =
    tasks?.filter(
      (t) =>
        fieldIds.includes(t.farms) &&
        isWithinRange(t.createdAt || t.$createdAt),
    ) ?? [];

  // HARVESTS
  const filteredHarvests =
    harvests?.filter(
      (h) => fieldIds.includes(h.farms) && isWithinRange(h.harvestDate),
    ) ?? [];

  // CROPS (optional filter by farm)
  const filteredCrops =
    crops?.filter((c) =>
      actualFarmId && actualFarmId !== "all" ? c.farms === actualFarmId : true,
    ) ?? [];

  const chartData = buildAreaChartData({
    sales: filteredSales,
    expenses: filteredExpenses,
    filter: val,
  });

  const { data, total } = buildExpensePieData(
    filteredExpenses as { [key: string]: string | number }[],
  );
  const { revenue, expense, profit } = buildOverviewStats(
    filteredSales as { [key: string]: string | number }[],
    filteredExpenses as { [key: string]: string | number }[],
    val as "year" | "month",
  );

  const farmData = buildFarmPerformance(
    farms as { [key: string]: string | number }[],
    sales as { [key: string]: string | number }[],
    expenses as { [key: string]: string | number }[],
  );

  const allFarms = farms?.length
    ? [
        { name: "All Farms", value: "all" },
        ...new Map(
          farms.map((x) => [
            x.farmName,
            { name: x.farmName, value: x.farmName.split(" ").join("+") },
          ]),
        ).values(),
      ]
    : [];
  const farmMap = new Map(farms?.map((f) => [f.$id, f.farmName]));
  const transactions = [
    // SALES (money IN)
    ...(filteredSales?.map((s) => ({
      id: s.$id,
      type: "sale",
      description: `${s.quantity} ${s.unit} sold`,
      farm: farmMap.get(s.farms) ?? "Unknown Farm",
      amount: Number(s.totalAmount || 0),
      date: new Date(s.saleDate).toDateString(),
    })) ?? []),

    // EXPENSES (money OUT)
    ...(filteredExpenses?.map((e) => ({
      id: e.$id,
      type: "expense",
      description: e.vendor || e.category, // ✅ FIXED (vendor first)
      farm: farmMap.get(e.farms) ?? "Unknown Farm",
      amount: Number(e.amount || 0),
      date: new Date(e.expenseDate).toDateString(),
    })) ?? []),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalRevenue = filteredSales.reduce(
    (acc, s) => acc + (Number(s.totalAmount) || 0),
    0,
  );

  const totalExpense = filteredExpenses.reduce(
    (acc, e) => acc + (Number(e.amount) || 0),
    0,
  );

  const profitSum = totalRevenue - totalExpense;
  const cropPerformance = buildCropPerformance({
    crops: filteredCrops,
    harvests: filteredHarvests,
    sales: filteredSales,
    expenses: filteredExpenses,
  });

  const stat = {
    totalRevenue: totalRevenue,
    totalExpenses: totalExpense,
    netProfit: profitSum,
    profitMargin:
      totalRevenue > 0 ? Math.round((profitSum / totalRevenue) * 100) : 0,
  };

  const prev = buildPreviousStats({
    sales: filteredSales,
    expenses: filteredExpenses,
    filter: val,
  });

  const calcChange = (current: number, previous: number) => {
    if (previous === 0) return 100;
    return Math.round(((current - previous) / previous) * 100);
  };

  const revenueChange = calcChange(totalRevenue, prev.revenue);
  const expenseChange = calcChange(totalExpense, prev.expense);
  const profitChange = calcChange(profitSum, prev.revenue - prev.expense);

  return (
    <div className="pt-18 px-2 sm:px-4 pb-8">
      <ReportHeader reportRef={reportRef} />
      <div ref={reportRef}>
        <ReportFilters farms={allFarms} />
        <ReportBoxes
          stat={stat}
          changes={{
            revenueChange,
            expenseChange,
            profitChange,
          }}
        />
        <div className=" grid grid-cols-1 lg:grid-cols-[1fr_0.5fr] xl:grid-cols-[1fr_0.8fr] items-stretch xl:h-[300px] justify-between gap-4">
          <ReportAreachart
            val={val}
            setVal={setVal}
            chartData={chartData}
            revenue={revenue}
            expense={expense}
          />
          <ReportPieChart chartData={data} total={total} />
        </div>
        <div className=" grid grid-cols-1 pt-4  md:grid-cols-2 xl:grid-cols-3 items-stretch  justify-between gap-4">
          <ReportTopPerforming farmData={farmData.slice(0, 4)} />
          <ReportCropPerfomance farmData={cropPerformance} />
          <ReportTaskProductivity tasks={filteredTasks ?? []} />
        </div>
        <ReportTransactions
          profit={profitSum}
          totalRevenue={totalRevenue}
          totalExpenses={totalExpense}
          transactions={transactions}
        />
      </div>
    </div>
  );
}
