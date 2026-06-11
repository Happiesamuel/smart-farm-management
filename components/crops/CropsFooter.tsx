"use client";
import { CropsPieChart } from "./CropsPieChat";
import { CropsBarChart } from "./CropsBarChart";
import { useApp } from "@/stores/useAppStore";
import { useGetCrops } from "@/hooks/crops/useCrops";
import { FormLoader, NoResult } from "../loader/GeneralLoader";
import { buildCropPieData, getGrowthStageData } from "@/lib/functions";

export default function CropsFooter() {
  const { workspace, user, ready } = useApp();
  const { crops, status, error } = useGetCrops(
    workspace?.id ?? null,
    user?.id ?? null,
  );

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

  const isLoading = status === "pending";

  if (isLoading)
    return (
      <div className="h-70">
        <FormLoader>Loading crop data...</FormLoader>
      </div>
    );

  const errorMessage = error?.message;

  if (errorMessage)
    return (
      <div className="h-70">
        <NoResult>{errorMessage}</NoResult>
      </div>
    );

  if (!crops?.length)
    return (
      <div className="h-70">
        <NoResult>No crop found!</NoResult>
      </div>
    );
  const crop = getGrowthStageData(crops);
  const { data, total } = buildCropPieData(crops);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 pt-4 gap-4">
      <CropsPieChart data={data} total={total} />
      <CropsBarChart crop={crop} />
    </div>
  );
}
