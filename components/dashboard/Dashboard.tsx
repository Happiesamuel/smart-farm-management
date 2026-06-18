"use client";
import DashboardFarms from "./DashboardFarms";
import { DashboardAreachart } from "./DashboardAreachart";
import { DashboardPieChart } from "./DashboardPiechart";
import DashboardSmartAlertts from "./DashboardSmartAlertts";
import DashboardCropsStatus from "./DashboardCropStatus";
import DashboardRecentTasks from "./DashboardRecentTasks";
import DashboardTopPerforming from "./DashboardTopPerforming";
import DashboardQucikActions from "./DashboardQucikActions";
import { useApp } from "@/stores/useAppStore";
import { FormLoader, NoResult } from "../loader/GeneralLoader";
import { getGreeting } from "@/lib/utils";
import { useGetCrops } from "@/hooks/crops/useCrops";
import { useGetFarm } from "@/hooks/farms/useFarm";
import { useGetFields } from "@/hooks/fields/useFields";
import { useGetHarvest } from "@/hooks/harvest/useHarvest";
import { useGetSales } from "@/hooks/sales/useSales";
import { useGetExpenses } from "@/hooks/expense/useExpense";
import { useGetTasks } from "@/hooks/tasks/useTask";
import {
  buildAreaChartData,
  buildDashboardStats,
  buildExpensePieData,
  buildFarmPerformance,
  buildOverviewStats,
  buildRecentTasks,
} from "@/lib/stat";
import { useState } from "react";
const NOW = Date.now();

export default function Dashboard() {
  const { workspace, user, ready } = useApp();
  const [val, setVal] = useState<"year" | "month">("month");
  const [farmVal, setFarmVal] = useState<"year" | "month">("month");
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
        <FormLoader>Loading dashboard app...</FormLoader>
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
        <FormLoader>Loading dashboard stats...</FormLoader>
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

  const stat = buildDashboardStats({
    farms,
    fields,
    crops,
    tasks,
    sales,
    expenses,
  });

  const chartData = buildAreaChartData({
    sales,
    expenses,
    filter: val,
  });
  const farmData = buildFarmPerformance(
    farms as { [key: string]: string | number }[],
    sales as { [key: string]: string | number }[],
    expenses as { [key: string]: string | number }[],
    farmVal as "year" | "month",
  );
  const { data, total } = buildExpensePieData(
    expenses as { [key: string]: string | number }[],
  );
  const { revenue, expense, profit } = buildOverviewStats(
    sales as { [key: string]: string | number }[],
    expenses as { [key: string]: string | number }[],
    val as "year" | "month",
  );
  const recentTasks = buildRecentTasks(
    tasks as { [key: string]: string | number }[],
    fields as { [key: string]: string | number }[],
    farms as { [key: string]: string | number }[],
  );
  const farmMap = new Map(farms?.map((f) => [f.$id, f]));
  const stageProgressMap: Record<string, number> = {
    seedling: 10,
    vegetative: 30,
    flowering: 60,
    fruiting: 80,
    harvesting: 90,
  };
  const cropArr =
    crops
      ?.filter((x) => x.status !== "harvested")
      .map((crop) => {
        const farm = farmMap.get(crop.farms);

        const cropHarvests =
          harvests?.filter((h) => h.crops === crop.$id) ?? [];

        const harvestedQty = cropHarvests.reduce(
          (acc, h) => acc + (h.quantity || 0),
          0,
        );

        const expectedYield = Number(crop.expectedYield || 0);

        let progress = 0;

        // ✅ 1. Completed crop
        if (crop.status === "harvested") {
          progress = 100;
        } else if (crop.growthStage) {
          progress = stageProgressMap[crop.growthStage];
        }

        // ✅ 2. Harvest-based progress (REAL WORLD)
        else if (harvestedQty > 0 && expectedYield > 0) {
          progress = Math.min(
            Math.round((harvestedQty / expectedYield) * 100),
            100,
          );
        }

        // ✅ 3. Time-based fallback
        else {
          const start = new Date(crop.plantedDate).getTime();
          const end = new Date(crop.expectedHarvestDate).getTime();
          const now = NOW;

          if (now <= start) progress = 0;
          else if (now >= end) progress = 100;
          else progress = Math.round(((now - start) / (end - start)) * 100);
        }

        return {
          crop: crop.cropName,
          farm: farm?.farmName ?? "Unknown Farm",
          status:
            crop.growthStage?.slice(0, 1).toUpperCase() +
              crop.growthStage?.slice(1) || "-",
          id: crop.$id,
          progress,
        };
      })
      .slice(0, 6) ?? [];
  return (
    <div className="pt-18 px-2 sm:px-4 pb-8">
      <div className="pb-5 space-y-1">
        <h6 className="text-dark font-semibold  text-2xl">
          {getGreeting()}, {user.fullName.split(" ").at(0)} 👋
        </h6>
        <p className="text-dark/80 text-sm">
          Here&apos;s what&apos;s happening on your farms today.
        </p>
      </div>
      <DashboardFarms stat={stat} />
      <div className=" grid grid-cols-1 lg:grid-cols-[1fr_0.5fr] xl:grid-cols-[1fr_0.8fr] items-stretch xl:h-[300px] justify-between gap-4">
        <DashboardAreachart
          revenue={revenue}
          expense={expense}
          profit={profit}
          chartData={chartData}
          val={val}
          setVal={setVal}
        />
        <DashboardPieChart chartData={data} total={total} />
      </div>
      <div className=" grid grid-cols-1 pt-4  md:grid-cols-2 xl:grid-cols-3 items-stretch  justify-between gap-4">
        <DashboardSmartAlertts />
        <DashboardCropsStatus crops={cropArr} />
        <DashboardRecentTasks tasks={recentTasks} />
      </div>
      <div className="w-full   xl:h-[220px grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-4 pt-4">
        <DashboardTopPerforming
          val={farmVal}
          setVal={setFarmVal}
          farmData={farmData}
        />
        <DashboardQucikActions />
      </div>
    </div>
  );
}
