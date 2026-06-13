"use client";
import { useSearchParams } from "next/navigation";
import BothPagination from "../salesExpense/BothPagination";
import CropTableHeader from "./CropTableHeader";
import { useCropFilter } from "@/hooks/useCropFilter";
import { useApp } from "@/stores/useAppStore";
import { useGetFields } from "@/hooks/fields/useFields";
import { useGetHarvest } from "@/hooks/harvest/useHarvest";
import { useGetFarm } from "@/hooks/farms/useFarm";
import { useGetCrops } from "@/hooks/crops/useCrops";
import { FormLoader, NoResult } from "../loader/GeneralLoader";
import { getProgressColor } from "@/lib/functions";
import TableActions from "../layout/TableAction";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { FinanceModal } from "../modals/FinanceModal";
import CreateCropFormFetch from "../farm/crops/CreateCropForm";
import { toast } from "sonner";
import { useDeleteDoc } from "@/hooks/useDelete";
import { TbPlant2 } from "react-icons/tb";
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
export default function CropTable() {
  const searchParams = useSearchParams();
  const { filterCrop } = useCropFilter();
  const { workspace, user, ready } = useApp();
  const { remove, status: deleteStat } = useDeleteDoc();
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
    fieldStat === "pending" ||
    harvestStat === "pending" ||
    farmStat === "pending";

  if (isLoading)
    return (
      <div className="h-70">
        <FormLoader>Loading crop records...</FormLoader>
      </div>
    );

  const errorMessage =
    error?.message ||
    fieldErr?.message ||
    harvestErr?.message ||
    farmErr?.message;

  if (errorMessage)
    return (
      <div className="h-70">
        <NoResult>{errorMessage}</NoResult>
      </div>
    );

  if (!crops?.length)
    return (
      <div className="h-70">
        <NoResult>No crop record!</NoResult>
      </div>
    );
  const stageProgressMap: Record<string, number> = {
    seedling: 10,
    vegetative: 30,
    flowering: 60,
    fruiting: 80,
    harvesting: 90,
  };
  const fieldMap = new Map(fields?.map((f) => [f.$id, f]));
  const farmMap = new Map(farms?.map((f) => [f.$id, f]));
  const cropArr =
    crops?.map((crop) => {
      const field = fieldMap.get(crop.fields);
      const farm = farmMap.get(crop.farms);

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
        farmId: farm?.$id ?? "",
        fieldId: field?.$id ?? "",
        field: field?.fieldName ?? "Unknown Field",
        farm: farm?.farmName ?? "Unknown Farm",

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
  const allFields = fields?.length
    ? [
        { name: "All Fields", value: "all" },
        ...new Map(
          fields.map((x) => [
            x.fieldName,
            { name: x.fieldName, value: x.fieldName.split(" ").join("+") },
          ]),
        ).values(),
      ]
    : [];

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
  return (
    <div className="mt-2">
      <CropTableHeader fields={allFields} farms={allFarms} />

      <div className="mt-4  overflow-hidden">
        {/* Desktop Table */}

        {!filtered.length ? (
          <div className="h-100">
            <NoResult>No crop found!</NoResult>
          </div>
        ) : (
          <>
            <div className="md:block hidden overflow-x-auto no-scroll">
              <table className="w-full text-sm ">
                <thead className=" bg-zinc-200/50 border rounded-t-2xl border-border text-gray-600">
                  <tr className="text-left ">
                    <th className="py-2 px-4 truncate max-w-full ">Crop</th>
                    <th className="py-2 px-4 truncate max-w-full ">Farm</th>
                    <th className="py-2 px-4 truncate max-w-full ">Field</th>
                    <th className="py-2 px-4 truncate max-w-full ">
                      Irrigation
                    </th>
                    <th className="py-2 px-4 truncate max-w-full ">
                      Planted Date
                    </th>
                    <th className="py-2 px-4 truncate max-w-full ">
                      Harvest Date
                    </th>
                    <th className="py-2 px-4 truncate max-w-full ">
                      Area Planted
                    </th>

                    <th className="py-2 px-4 truncate max-w-full ">Status</th>
                    <th className="py-2 px-4 truncate max-w-full ">
                      Growth Stage
                    </th>
                    <th className="py-2 px-4 truncate max-w-full ">
                      Seed Quantity
                    </th>
                    <th className="py-2 px-4 truncate max-w-full ">
                      Expected Yield
                    </th>

                    <th className="py-2 px-4 truncate max-w-full ">Progress</th>
                    <th className="py-2 px-4 truncate max-w-full  text-right">
                      Actions
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
                      <td className="p-4  max-w-full truncate  text-dark/90 font-semibold flex items-center gap-2">
                        {crop.name}
                      </td>

                      {/* Field */}
                      <td className="p-4   max-w-full truncate text-gray-600">
                        {crop.farm}
                      </td>
                      <td className="p-4  max-w-full truncate text-gray-600">
                        {crop.field}
                      </td>
                      <td className="p-4 max-w-full truncate text-gray-600">
                        {crop.irrigationType}
                      </td>
                      <td className="p-4 ax-w-full truncate text-gray-600">
                        {crop.plantedDate}
                      </td>
                      <td className="p-4  max-w-full truncate text-gray-600">
                        {crop.expectedHarvestDate}
                      </td>
                      <td className="p-4 max-w-full truncate text-gray-600">
                        {crop.areaPlanted} {crop.areaUnit}
                      </td>
                      <td className="p-4 max-w-full truncate">
                        <span
                          className={`px-3 py-1 text-xs rounded-full ${statusStyles[crop.status]}`}
                        >
                          {crop.status}
                        </span>
                      </td>
                      <td className="p-4  max-w-full truncate">
                        <span
                          className={`px-3 py-1 text-xs rounded-full ${statusStyles[crop.growthStage]}`}
                        >
                          {crop.growthStage}
                        </span>
                      </td>

                      <td className="p-4  max-w-full truncate text-gray-600">
                        {crop.seedQuantity} {crop.seedUnit}
                      </td>
                      <td className="p-4 max-w-full truncate text-gray-600">
                        {crop.expectedYield} {crop.yieldUnit}
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
                      <td className="p-4 max-w-full truncate text-right">
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
                <div key={crop.id} className="border rounded-lg p-4 shadow-sm">
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

                  <p className="text-xs text-gray-500">Field: {crop.field}</p>
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

      <div className="mt-4">
        <BothPagination
          total={filtered.length}
          pageSize={PAGE_SIZE}
          pageKey={`cropPage`}
          type="crops"
        />
      </div>
    </div>
  );
}
