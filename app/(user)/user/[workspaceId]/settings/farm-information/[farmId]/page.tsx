"use client";
import CreateFarmForm from "@/components/farm/create/CreateFarmForm";
import { FormLoader, NoResult } from "@/components/loader/GeneralLoader";
import { useGetSingleFarm } from "@/hooks/farms/useFarm";
import { useApp } from "@/stores/useAppStore";
import { useParams } from "next/navigation";

export default function Page() {
  const { farmId } = useParams();
  const { user, workspace, ready } = useApp();
  const { farm, status, error } = useGetSingleFarm(
    workspace?.id ?? null,
    user?.id ?? null,
    farmId as string,
  );
  if (status === "pending" || !ready)
    return (
      <div className="h-110">
        <FormLoader>Loading farm...</FormLoader>
      </div>
    );
  if (error)
    return (
      <div className="h-110">
        <NoResult>{error.message}</NoResult>;
      </div>
    );
  return (
    <div className="pt-18 px-2 sm:px-4 pb-8">
      <div className="pb-5 flex gap-3 sm:flex-row flex-col md:items-center justify-between">
        <div className=" space-y-1">
          <div className="flex items-center gap-3">
            <h6 className="text-dark font-semibold  text-2xl">
              {farm?.farmName}
            </h6>
            <p
              className={`rounded-full ${farm?.status === "active" ? "bg-green-50 text-green-600 border-green-200 border" : "bg-red-50 text-red-600 border-red-200 border"} p-1 px-2 text-xs `}
            >
              {farm?.status}
            </p>
          </div>
          <p className="text-dark/80 text-sm">
            Update your farm details and preferences
          </p>
        </div>
      </div>
      <CreateFarmForm def={farm} />
    </div>
  );
}
