"use client";
import FarmOvervewBoxes from "./FarmOverviewBoxes";
import { FarmAreachart } from "./FarmLineChart";
import { FarmPieChart } from "./FarmPieChart";
import FarmActivites from "./FarmActivites";
import FarmUpcomingHarvest from "./FarmUpcomingHarvest";
import FarmSmartAlerts from "./FarmSmartAlert";

import DashboardWeather from "@/components/dashboard/DashboardWeather";
import FarmFieldOverview from "./FarmFieldOverview";
import { useApp } from "@/stores/useAppStore";
import { useState } from "react";
import { useGetFarmCrops } from "@/hooks/crops/useCrops";
import { useParams } from "next/navigation";
import { useGetFarmFields } from "@/hooks/fields/useFields";
import { useGetFarmHarvest } from "@/hooks/harvest/useHarvest";
import { useGetFarmSales } from "@/hooks/sales/useSales";
import { useGetFarmTasks } from "@/hooks/tasks/useTask";
import { useGetFarmExpenses } from "@/hooks/expense/useExpense";
import { FormLoader, NoResult } from "@/components/loader/GeneralLoader";
import { buildAreaChartData, buildOverviewStats } from "@/lib/stat";
import { useGetSingleFarm } from "@/hooks/farms/useFarm";
import { formatLocation } from "@/lib/functions";
import FarmMap from "./FarmMap";
export default function FarmOverview() {
  const { farmId } = useParams();
  const { workspace, user, ready } = useApp();
  const [val, setVal] = useState<"year" | "month">("year");
  const [farmVal, setFarmVal] = useState<"year" | "month">("year");

  const { crops, status, error } = useGetFarmCrops(
    workspace?.id ?? null,
    user?.id ?? null,
    farmId as string,
  );
  const {
    farm,
    status: farmStat,
    error: farmErr,
  } = useGetSingleFarm(
    workspace?.id ?? null,
    user?.id ?? null,
    farmId as string,
  );
  // const {
  //   farms,
  // status: farmStat,
  // error: farmErr,
  // } = useGetFarm(workspace?.id ?? null, user?.id ?? null);
  const {
    fields,
    status: fieldStat,
    error: fieldErr,
  } = useGetFarmFields(
    workspace?.id ?? null,
    user?.id ?? null,
    farmId as string,
  );

  const {
    harvests,
    status: harvestStat,
    error: harvestErr,
  } = useGetFarmHarvest(
    workspace?.id ?? null,
    user?.id ?? null,
    farmId as string,
  );
  const {
    sales,
    status: saleStat,
    error: saleErr,
  } = useGetFarmSales(
    workspace?.id ?? null,
    user?.id ?? null,
    farmId as string,
  );
  const {
    tasks,
    status: taskStat,
    error: taskErr,
  } = useGetFarmTasks(
    workspace?.id ?? null,
    user?.id ?? null,
    farmId as string,
  );
  const {
    expenses,
    status: expStat,
    error: expErr,
  } = useGetFarmExpenses(
    workspace?.id ?? null,
    user?.id ?? null,
    farmId as string,
  );
  if (!ready)
    return (
      <div className="h-125">
        <FormLoader>Loading overview app...</FormLoader>
      </div>
    );

  if (!user || !workspace)
    return (
      <div className="h-125">
        <NoResult>Unauthorised</NoResult>
      </div>
    );

  const isLoading =
    status === "pending" ||
    fieldStat === "pending" ||
    harvestStat === "pending" ||
    taskStat === "pending" ||
    saleStat === "pending" ||
    expStat === "pending" ||
    farmStat === "pending";

  if (isLoading)
    return (
      <div className="h-125">
        <FormLoader>Loading overview stats...</FormLoader>
      </div>
    );

  const errorMessage =
    error?.message ||
    fieldErr?.message ||
    harvestErr?.message ||
    taskErr?.message ||
    saleErr?.message ||
    expErr?.message ||
    farmErr?.message;

  if (errorMessage)
    return (
      <div className="h-125">
        <NoResult>{errorMessage}</NoResult>
      </div>
    );

  const chartData = buildAreaChartData({
    sales,
    expenses,
    filter: val,
  });
  const { revenue, expense, profit } = buildOverviewStats(
    sales as { [key: string]: string | number }[],
    expenses as { [key: string]: string | number }[],
    val as "year" | "month",
  );

  const fieldArr =
    fields?.map((field) => {
      const crop = crops?.find(
        (c) => c.fields === field.$id && c.growthStage !== "harvesting",
      );

      return {
        id: field.$id,
        name: field.fieldName,
        size: `${field.size} ${field.sizeUnit}`,
        crop: crop?.cropName ?? "No Crop",
        growthStage: crop?.growthStage ?? "idle",
      };
    }) ?? [];
  return (
    <div>
      <FarmOvervewBoxes
        crops={crops as { [key: string]: string | number }[]}
        expenses={expenses as { [key: string]: string | number }[]}
        farmId={farm?.id as string}
        fields={fields as { [key: string]: string | number }[]}
        sales={sales as { [key: string]: string | number }[]}
        tasks={tasks as { [key: string]: string | number }[]}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4 ">
        <FarmMap farm={farm!} />
        <DashboardWeather
          address={formatLocation(farm?.address)}
          lat={farm?.lat}
          lng={farm?.lng}
        />
      </div>

      <div className=" grid grid-cols-1 lg:grid-cols-[1fr_0.5fr] xl:grid-cols-[1fr_0.8fr] items-stretch xl:h-[300px] justify-between gap-4">
        <FarmAreachart
          revenue={revenue}
          expense={expense}
          chartData={chartData}
          val={val}
          setVal={setVal}
        />
        <FarmPieChart
          crops={crops as { [key: string]: string | number }[]}
          harvests={harvests as { [key: string]: string | number }[]}
        />
      </div>

      <div className="flex lg:flex-row flex-col pt-4 items-center justify-between gap-4">
        <FarmActivites />
        <FarmFieldOverview fieldArr={fieldArr} />
        <FarmUpcomingHarvest
          crops={crops as { [key: string]: string }[]}
          fields={fields as { [key: string]: string }[]}
        />
      </div>
      <FarmSmartAlerts />
    </div>
  );
}
