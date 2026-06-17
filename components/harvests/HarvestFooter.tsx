"use client";
import { HarvestPieChart } from "./HarvestPieChat";
import RecentHarvest from "./RecentHarvest";
import { useApp } from "@/stores/useAppStore";
import { useGetCrops } from "@/hooks/crops/useCrops";
import { useGetHarvest } from "@/hooks/harvest/useHarvest";
import { FormLoader, NoResult } from "../loader/GeneralLoader";
import { buildHarvestPieData } from "@/lib/functions";
import { useGetFarm } from "@/hooks/farms/useFarm";
import { useGetFields } from "@/hooks/fields/useFields";

export default function HarvestFooter() {
  const { workspace, user, ready } = useApp();
  const { crops, status, error } = useGetCrops(
    workspace?.id ?? null,
    user?.id ?? null,
  );
  const {
    harvests,
    status: harvestStat,
    error: harvestErr,
  } = useGetHarvest(workspace?.id ?? null, user?.id ?? null);
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
  if (!ready)
    return (
      <div className="h-70">
        <FormLoader>Loading app...</FormLoader>
      </div>
    );

  if (!user || !workspace)
    return (
      <div className="h-70">
        <NoResult>Unauthorised</NoResult>
      </div>
    );

  const isLoading =
    status === "pending" ||
    harvestStat === "pending" ||
    fieldStat === "pending" ||
    farmStat === "pending";

  if (isLoading)
    return (
      <div className="h-70">
        <FormLoader>Loading harvest data...</FormLoader>
      </div>
    );

  const errorMessage =
    error?.message ||
    harvestErr?.message ||
    fieldErr?.message ||
    farmErr?.message;

  if (errorMessage)
    return (
      <div className="h-70">
        <NoResult>{errorMessage}</NoResult>
      </div>
    );

  if (!harvests?.length || !crops?.length)
    return (
      <div className="h-70">
        <NoResult>No harvest found!</NoResult>
      </div>
    );
  const { data, total } = buildHarvestPieData(harvests, crops);

  const cropMap = new Map(crops?.map((c) => [c.$id, c.cropName]));
  const fieldMap = new Map(fields?.map((f) => [f.$id, f.fieldName]));
  const farmMap = new Map(farms?.map((f) => [f.$id, f.farmName]));

  const recentHarvests = harvests
    ?.map((h) => ({
      id: h.$id,
      rawDate: h.harvestDate, // 👈 keep original
      date: new Date(h.harvestDate).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      crop: cropMap.get(h.crops) || "Unknown Crop",
      field: fieldMap.get(h.fields) || "Unknown Field",
      farm: farmMap.get(h.farms) || "Unknown Farm",
      quantity: h.quantity,
      unit: h.unit,
      revenue: h.totalAmount,
    }))
    .sort(
      (a, b) => new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime(),
    )
    .slice(0, 4);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 pt-4 gap-4">
      <HarvestPieChart data={data} total={total} />
      <RecentHarvest harvests={recentHarvests} />
    </div>
  );
}
