import BothPagination from "../../salesExpense/BothPagination";
import FarmHarvestTableHeader from "./FarmHarvestTableHeader";
import { useParams, useSearchParams } from "next/navigation";
import { useCropFilter } from "@/hooks/useCropFilter";
import { useApp } from "@/stores/useAppStore";
import { useGetFarmCrops } from "@/hooks/crops/useCrops";
import { useGetFarmFields } from "@/hooks/fields/useFields";
import { useGetFarmHarvest } from "@/hooks/harvest/useHarvest";
import { FormLoader, NoResult } from "@/components/loader/GeneralLoader";
import TableActions from "@/components/layout/TableAction";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { FinanceModal } from "@/components/modals/FinanceModal";
import CreateHarvestFormFetch from "./CreateHarvestForm";
import { GiDigDug } from "react-icons/gi";
import { useDeleteDoc } from "@/hooks/useDelete";
import { toast } from "sonner";

const qualityStyles: Record<string, string> = {
  Excellent: "bg-emerald-100 text-emerald-700",
  Good: "bg-green-100 text-green-700",
  Average: "bg-yellow-100 text-yellow-700",
  Poor: "bg-red-100 text-red-700",
};

const statusStyles: Record<string, string> = {
  Sold: "bg-blue-100 text-blue-700",
  Stored: "bg-purple-100 text-purple-700",
  Wasted: "bg-red-100 text-red-700",
};

export default function FarmHarvestTable() {
  const { farmId } = useParams();
  const searchParams = useSearchParams();
  const { filterCrop } = useCropFilter();
  const { remove, status: deleteStat } = useDeleteDoc();
  const { workspace, user, ready } = useApp();
  const { crops, status, error } = useGetFarmCrops(
    workspace?.id ?? null,
    user?.id ?? null,
    farmId as string,
  );
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
    harvestStat === "pending";

  if (isLoading)
    return (
      <div className="h-70">
        <FormLoader>Loading harvest record...</FormLoader>
      </div>
    );

  const errorMessage =
    error?.message || fieldErr?.message || harvestErr?.message;

  if (errorMessage)
    return (
      <div className="h-70">
        <NoResult>{errorMessage}</NoResult>
      </div>
    );

  if (!harvests?.length)
    return (
      <div className="h-70">
        <NoResult>No harvest record!</NoResult>
      </div>
    );

  const fieldMap = new Map(fields?.map((f) => [f.$id, f]));
  const cropMap = new Map(crops?.map((c) => [c.$id, c]));
  const harvestArr =
    harvests?.map((harvest) => {
      const field = fieldMap.get(harvest.fields);
      const crop = cropMap.get(harvest.crops);

      return {
        id: harvest.$id,
        date: new Date(harvest.harvestDate).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        fieldId: field?.$id ?? "",
        cropId: crop?.$id ?? "",
        buyer: harvest.buyer || "",
        description: harvest.description || "",
        crop: crop?.cropName ?? "Unknown Crop",
        status:
          harvest.status.slice(0, 1).toUpperCase() + harvest.status.slice(1),
        quantity: harvest.quantity,
        unit: harvest.unit,
        unitPrice: `₦${harvest.pricePerUnit.toLocaleString()}`,
        revenue: `₦${harvest.totalAmount.toLocaleString()}`,
        field: field?.fieldName ?? "Unknown Field",
        quality:
          harvest.quality.slice(0, 1).toUpperCase() + harvest.quality.slice(1),
      };
    }) ?? [];

  const PAGE_SIZE = 10;
  const currentPage = Number(searchParams.get("harvestPage") || 1);
  const filtered = filterCrop(harvestArr ?? []);
  const paginatedHarvest = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const allFields = fields?.length
    ? [
        { name: "All Fields", value: "all" },
        ...fields?.map((x) => {
          return {
            name: x.fieldName,
            value: x.fieldName.split(" ").join("+"),
          };
        }),
      ]
    : [];

  return (
    <div className="mt-2">
      <FarmHarvestTableHeader fields={allFields} />
      <div className="  overflow-hidden mt-4">
        {!filtered.length ? (
          <div className="h-100">
            <NoResult>No harvest found!</NoResult>
          </div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm ">
                <thead className=" bg-zinc-200/50 border rounded-t-2xl border-border text-gray-600">
                  <tr className="text-left ">
                    <th className="py-2 truncate max-w-[50px] px-2">Crop</th>
                    <th className="py-2 truncate max-w-[50px] pl-2">Field</th>
                    <th className="py-2 truncate max-w-[50px] pr-4 pl-2">
                      Harvest Date
                    </th>
                    <th className="py-2 truncate max-w-[50px] pl-">Quantity</th>
                    <th className="py-2 truncate max-w-[50px] pl-">
                      Unit Price
                    </th>
                    <th className="py-2 truncate max-w-[50px] pl-2">Quality</th>
                    <th className="py-2 truncate max-w-[50px] pl-2">Revenue</th>
                    <th className="py-2 truncate max-w-[50px] pl-2">Status</th>
                    <th className="py-2 truncate max-w-[50px] px-2 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedHarvest.map((s) => (
                    <tr key={s.id} className="border-t hover:bg-gray-50">
                      <td
                        title={`${s.crop}`}
                        className="py-3 truncate font-medium max-w-[70px] pl-2 pr-4 text-[13px] text-zinc-600 flex items-center gap-2"
                      >
                        {s.crop}
                      </td>
                      <td
                        title={`${s.field}`}
                        className="py-3 truncate font-medium max-w-[70px] px-2 text-[13px] text-zinc-600 fle items-center gap-2"
                      >
                        {s.field}
                      </td>
                      <td
                        title={s.date}
                        className="py-3 truncate font-medium max-w-[70px] px-2 text-[13px] text-zinc-600"
                      >
                        {s.date}
                      </td>

                      <td
                        title={`${s.quantity} ${s.unit}`}
                        className="py-3 truncate font-medium max-w-[70px] pl-2 text-[13px] text-zinc-600"
                      >
                        {s.quantity} {s.unit}
                      </td>
                      <td
                        title={s.unitPrice}
                        className="py-3 truncate font-medium max-w-[70px] pr-4 text-[13px] text-zinc-600"
                      >
                        {s.unitPrice}
                      </td>
                      <td
                        title={s.quality}
                        className={`py-3 truncate  font-medium max-w-[70px] pl-2 pr- text-[13px] text-zinc-600`}
                      >
                        <span
                          className={`px-2 py-0.5 text-[12px] rounded-full ${qualityStyles[s.quality]} `}
                        >
                          {s.quality}
                        </span>
                      </td>
                      <td
                        title={s.revenue}
                        className="py-3 truncate font-semibold max-w-[70px] px-2 text-[13px] text-zinc-700 "
                      >
                        {s.revenue}
                      </td>
                      <td
                        title={s.quality}
                        className={`py-3 truncate  font-medium max-w-[70px] pl-2 pr- text-[13px] text-zinc-600`}
                      >
                        <span
                          className={`px-2 py-0.5 text-[12px] rounded-full ${statusStyles[s.status]} `}
                        >
                          {s.status}
                        </span>
                      </td>

                      <td className="py-3 px-2 truncate font-medium max-w-[70px] px- text-[13px] text-zinc-600 text-right">
                        <div className="flex justify-end gap-3 text-gray-500">
                          <TableActions
                            actions={[
                              {
                                type: "modal",
                                label: "Edit",
                                icon: <LuPencil className="text-sm" />,
                                modal: (onClose) => (
                                  <FinanceModal
                                    text={"Edit your harvest"}
                                    forWhat="Edit"
                                    type={"Harvest"}
                                    iconColor="bg-[#e8f5ec] text-[#2d8952]"
                                    Icon={GiDigDug}
                                    open={true}
                                    onClose={onClose}
                                  >
                                    <CreateHarvestFormFetch
                                      def={s}
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
                                      collection: "harvests",
                                      id: s.id,
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
                                        toast("Error deleting harvest", {
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
              {paginatedHarvest.map((harvest) => (
                <div
                  key={harvest.id}
                  className="border rounded-lg p-4 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex gap-2 items-center font-medium">
                      {harvest.crop}
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${statusStyles[harvest.status]}`}
                    >
                      {harvest.status}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500">
                    Field: {harvest.field}
                  </p>
                  <p className="text-xs text-gray-500">
                    Harvest Date: {harvest.date}
                  </p>

                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-500">
                      Unit Price: {harvest.unitPrice}
                    </p>
                    <p className="text-xs text-gray-500">
                      Revenue: {harvest.revenue}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-500">
                      Quantity: {harvest.quantity} {harvest.unit}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${qualityStyles[harvest.quality]}`}
                    >
                      {harvest.quality}
                    </span>
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
          pageKey={`harvestPage`}
          type="harvests"
        />
      </div>
    </div>
  );
}
