"use client";
import { useParams, useSearchParams } from "next/navigation";
import FieldsCropsTable from "./FieldCropsTable";
import { useCropFilter } from "@/hooks/useCropFilter";
import { useApp } from "@/stores/useAppStore";
import { useDeleteDoc } from "@/hooks/useDelete";
import { useGetFarmCrops } from "@/hooks/crops/useCrops";
import { useGetFarmHarvest } from "@/hooks/harvest/useHarvest";
import { FormLoader, NoResult } from "../loader/GeneralLoader";
import Link from "next/link";
import { Button } from "../ui/button";
import { GoPlus } from "react-icons/go";
import { getProgressColor } from "@/lib/functions";
import CropPagination from "../layout/CropPagination";
import TableActions from "../layout/TableAction";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { FinanceModal } from "../modals/FinanceModal";
import { TbPlant2 } from "react-icons/tb";
import CreateCropFormFetch from "../farm/crops/CreateCropForm";
import { toast } from "sonner";
const statusStyles: Record<string, string> = {
  Growing: "bg-green-100 text-green-700",
  Harvested: "bg-blue-100 text-blue-700",
  Failed: "bg-red-100 text-red-700",
  Planted: "bg-lime-100 text-lime-700",
  Drying: "bg-orange-100 text-orange-700",
  Stored: "bg-purple-100 text-purple-700",

  Seedling: "bg-emerald-100 text-emerald-700",
  Vegetative: "bg-teal-100 text-teal-700",
  Flowering: "bg-pink-100 text-pink-700",
  Fruiting: "bg-amber-100 text-amber-700",
  Harvesting: "bg-cyan-100 text-cyan-700",
};
const NOW = Date.now();

export default function FieldCrops() {
  const { farmId, workspaceId, fieldId } = useParams();
  const searchParams = useSearchParams();
  const { filterCrop } = useCropFilter();
  const { workspace, user, ready } = useApp();
  const { remove, status: deleteStat } = useDeleteDoc();
  const { crops, status, error } = useGetFarmCrops(
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

  const isLoading = status === "pending" || harvestStat === "pending";

  if (isLoading)
    return (
      <div className="h-70">
        <FormLoader>Loading crop records...</FormLoader>
      </div>
    );

  const errorMessage = error?.message || harvestErr?.message;

  if (errorMessage)
    return (
      <div className="h-70">
        <NoResult>{errorMessage}</NoResult>
      </div>
    );
  const newCrops = crops?.filter((c) => c.fields === fieldId);

  if (!newCrops?.length)
    return (
      <div className="h-70 flex items-center justify-center">
        <div className="flex items-center flex-col gap-1 ">
          <NoResult>No crop record!</NoResult>
          <Button className="bg-primary-green mt-1 w-full sm:w-fit cursor-pointer text-white">
            <Link
              href={`/user/${workspaceId}/farms/${farmId}/add-crop`}
              className="flex items-center gap-1"
            >
              <GoPlus />
              <p>Add Crop</p>
            </Link>
          </Button>
        </div>
      </div>
    );

  const stageProgressMap: Record<string, number> = {
    seedling: 10,
    vegetative: 30,
    flowering: 60,
    fruiting: 80,
    harvesting: 90,
  };
  const cropArr =
    newCrops?.map((crop) => {
      const cropHarvests = harvests?.filter((h) => h.crops === crop.$id) ?? [];

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
        id: crop.$id,
        name: crop.cropName,
        fieldId: (fieldId as string) ?? "",
        areaPlanted: crop.areaPlanted,
        areaUnit: crop.areaUnit,

        plantedDate: new Date(crop.plantedDate).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),

        expectedHarvestDate: new Date(
          crop.expectedHarvestDate,
        ).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),

        expectedYield: crop.expectedYield,
        yieldUnit: crop.yieldUnit,

        irrigationType:
          crop.irrigationType?.slice(0, 1).toUpperCase() +
            crop.irrigationType?.slice(1) || "-",
        seedQuantity: crop.seedQuantity,
        seedUnit: crop.seedUnit,

        status: crop.status.slice(0, 1).toUpperCase() + crop.status.slice(1),
        growthStage:
          crop.growthStage?.slice(0, 1).toUpperCase() +
            crop.growthStage?.slice(1) || "-",
        progress,

        harvestedQty,
      };
    }) ?? [];

  const PAGE_SIZE = 10;
  const currentPage = Number(searchParams.get("cropPage") || 1);
  const filtered = filterCrop(cropArr ?? []);
  const paginatedCrop = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const cropCard = cropArr.filter((c) => c.progress !== 100);
  console.log(cropCard);

  return (
    <div className="pt-2 space-y-4">
      {!cropCard.length ? (
        <div className="h-70">
          <NoResult>No active crop</NoResult>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center w-full gap-2 ">
          {cropCard.map((c) => (
            <div
              key={c.id}
              className="flex flex-col w-full max-w-sm mx-auto sm:max-w-lg gap-5 border border-border  rounded-md  p-4 shadow-xs bg-white"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h5 className="text-base text-dark font-semibold">
                    {c.name}
                  </h5>
                  <p
                    className={`rounded-full  ${statusStyles[c.growthStage]} p-0.5 px-2 text-xs `}
                  >
                    {c.growthStage}
                  </p>
                </div>
                <p
                  className={`rounded-full ${statusStyles[c.status]} p-0.5 px-2 text-xs `}
                >
                  {c.status}
                </p>
              </div>

              <div className="grid grid-cols-2">
                <div className="space-y-1">
                  <p className="text-zinc-500 text-xs font-normal">Soil Type</p>
                  <p className="text-dark/90 text-sm font-medium">Loamy Soil</p>
                </div>
                <div className="space-y-1">
                  <p className="text-zinc-500 text-xs font-normal">Size</p>
                  <p className="text-dark/90 text-sm font-medium">
                    {c.areaPlanted} {c.areaUnit}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="space-y-1">
                  <p className="text-zinc-500 text-xs font-normal">
                    Planted on
                  </p>
                  <p className="text-dark/90 text-sm font-medium">
                    {c.plantedDate}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-zinc-500 text-xs font-normal">
                    Expected Harvest
                  </p>
                  <p className="text-dark/90 text-sm font-medium">
                    {c.expectedHarvestDate}
                  </p>
                </div>
              </div>

              <div className="flex flex-col  gap-2">
                <div className="flex items-center gap-4">
                  <p className="text-xs text-zinc-500 font-normal">Progress</p>
                  <p className="text-xs text-dark font-medium">{c.progress}%</p>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className={`h-2 ${getProgressColor(c.progress)} rounded-full`}
                    style={{ width: `${c.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <>
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          {!filtered.length ? (
            <div className="h-100">
              <NoResult>No crop found!</NoResult>
            </div>
          ) : (
            <>
              <div className="hidden md:block overflow-x-auto no-scroll">
                <table className="w-full text-sm">
                  {/* Header */}
                  <thead className="bg-gray-50 text-gray-600">
                    <tr className="text-left ">
                      <th title="Crop" className="p-4 truncate max-w-full">
                        Crop
                      </th>

                      <th
                        title="Irrigation"
                        className="p-4 truncate max-w-full"
                      >
                        Irrigation
                      </th>
                      <th
                        title="Area Planted"
                        className="p-4 truncate max-w-full"
                      >
                        Area Planted
                      </th>
                      <th title="Status" className="p-4 truncate max-w-full">
                        Status
                      </th>
                      <th
                        title="Growth Stage"
                        className="p-4 truncate max-w-full"
                      >
                        Growth Stage
                      </th>
                      <th
                        title="Seed Quantity"
                        className="p-4 truncate max-w-full"
                      >
                        Seed Quantity
                      </th>
                      <th
                        title="Expected Yield"
                        className="p-4 truncate max-w-full"
                      >
                        Expected Yield
                      </th>
                      <th
                        title="Planted Date"
                        className="p-4 truncate max-w-full"
                      >
                        Planted Date
                      </th>
                      <th
                        title="Expected Harvest"
                        className="p-4 truncate max-w-full"
                      >
                        Expected Harvest
                      </th>
                      <th title="Progress" className="p-4 truncate max-w-full">
                        Progress
                      </th>
                      <th
                        title="Action"
                        className="p-4 truncate max-w-full text-right"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedCrop.map((crop) => (
                      <tr
                        key={crop.id}
                        className="border-t hover:bg-gray-50 transition"
                      >
                        {/* Crop */}
                        <td
                          title={crop.name}
                          className="p-4 truncate max-w-full  text-dark font-semibold flex items-center gap-2"
                        >
                          {crop.name}
                        </td>

                        {/* Field */}

                        <td
                          title={crop.irrigationType}
                          className="p-4 truncate max-w-full text-zinc-700"
                        >
                          {crop.irrigationType}
                        </td>
                        <td
                          title={`${crop.areaPlanted} ${crop.areaUnit}`}
                          className="p-4 truncate max-w-full text-zinc-700"
                        >
                          {crop.areaPlanted} {crop.areaUnit}
                        </td>

                        {/* Status */}
                        <td
                          title={crop.status}
                          className="p-4 truncate max-w-full"
                        >
                          <span
                            className={`px-3 py-1 text-xs rounded-full ${statusStyles[crop.status]}`}
                          >
                            {crop.status}
                          </span>
                        </td>
                        <td
                          title={crop.growthStage}
                          className="p-4 truncate max-w-full"
                        >
                          <span
                            className={`px-3 py-1 text-xs rounded-full ${statusStyles[crop.growthStage]}`}
                          >
                            {crop.growthStage}
                          </span>
                        </td>

                        {/* Dates */}
                        <td
                          title={`${crop.seedQuantity} ${crop.seedUnit}`}
                          className="p-4 truncate max-w-[80px] text-zinc-700"
                        >
                          {crop.seedQuantity} {crop.seedUnit}
                        </td>
                        <td
                          title={`${crop.expectedYield} ${crop.yieldUnit}`}
                          className="p-4 truncate max-w-[80px] text-zinc-700"
                        >
                          {crop.expectedYield} {crop.yieldUnit}
                        </td>
                        <td
                          title={crop.plantedDate}
                          className="p-4 truncate max-w-[90px] text-zinc-700"
                        >
                          {crop.plantedDate}
                        </td>
                        <td
                          title={crop.expectedHarvestDate}
                          className="p-4 truncate max-w-[90px] text-zinc-700"
                        >
                          {crop.expectedHarvestDate}
                        </td>

                        {/* Progress */}
                        <td className="p-4 truncate max-w-full">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-gray-200 rounded-full">
                              <div
                                className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(crop.progress)}`}
                                style={{ width: `${crop.progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-600">
                              {crop.progress}%
                            </span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="p-4 truncate max-w-full text-right">
                          <div className="flex justify-end gap-3 text-gray-500">
                            <TableActions
                              actions={[
                                {
                                  type: "modal",
                                  label: "Edit",
                                  icon: <LuPencil className="text-sm" />,
                                  modal: (onClose) => (
                                    <FinanceModal
                                      text={"Edit your crop"}
                                      forWhat="Edit"
                                      type={"Crop"}
                                      iconColor="bg-[#e8f5ec] text-[#2d8952]"
                                      Icon={TbPlant2}
                                      open={true}
                                      onClose={onClose}
                                    >
                                      <CreateCropFormFetch
                                        def={crop}
                                        onClose={onClose}
                                      />
                                    </FinanceModal>
                                  ),
                                },
                                {
                                  type: "callback",
                                  label:
                                    deleteStat === "pending"
                                      ? "Deleting..."
                                      : "Delete",
                                  icon: <LuTrash2 className="text-sm" />,
                                  variant: "danger",
                                  onClick: () =>
                                    remove(
                                      {
                                        collection: "crops",
                                        id: crop.id,
                                        workspaceId: workspace.id,
                                        userId: user.id,
                                      },
                                      {
                                        onSuccess: () => {
                                          toast("Deleted successfully", {
                                            description:
                                              "You've deleted a record",
                                          });
                                        },
                                        onError: (err) =>
                                          toast("Error deleting crop", {
                                            description: err.message,
                                            duration: 4000,
                                            closeButton: true,
                                          }),
                                      },
                                    ),
                                },
                              ]}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="md:hidden space-y-3 p-4">
                {paginatedCrop.map((crop) => (
                  <div
                    key={crop.id}
                    className="border rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex gap-2 items-center font-medium">
                        {crop.name}
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${statusStyles[crop.status]}`}
                      >
                        {crop.status}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500">
                      Planted: {crop.plantedDate}
                    </p>
                    <p className="text-xs text-gray-500">
                      Harvest: {crop.expectedHarvestDate}
                    </p>

                    <div className="flex items-center justify-between mt-2 gap-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${statusStyles[crop.growthStage]}`}
                      >
                        {crop.growthStage}
                      </span>
                      <div className=" flex items-center gap-2 w-full">
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(crop.progress)}`}
                            style={{ width: `${crop.progress}%` }}
                          />
                        </div>
                        <span className="text-xs">{crop.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <CropPagination
          total={filtered.length}
          pageSize={PAGE_SIZE}
          pageKey={`cropPage`}
        />
      </>
    </div>
  );
}
