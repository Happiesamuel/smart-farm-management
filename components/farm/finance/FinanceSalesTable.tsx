"use client";
import FinancePagination from "@/components/layout/FinancePagination";
import { FormLoader, NoResult } from "@/components/loader/GeneralLoader";
import { useGetFarmCrops } from "@/hooks/crops/useCrops";
import { useGetFarmHarvest } from "@/hooks/harvest/useHarvest";
import { useGetFarmSales } from "@/hooks/sales/useSales";
import { useFinanceFilters } from "@/hooks/useFinanceFilters";
import { useApp } from "@/stores/useAppStore";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useDeleteDoc } from "@/hooks/useDelete";
import { FiShoppingCart } from "react-icons/fi";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { FinanceModal } from "@/components/modals/FinanceModal";
import FinanceSalesFormFetch from "./FinanceSalesForm";
import TableActions from "@/components/layout/TableAction";

const paymentStyles: Record<string, string> = {
  Transfer: "bg-green-100 text-green-700",
  Cash: "bg-blue-100 text-blue-700",
  Card: "bg-purple-100 text-purple-700",
  "Mobile Money": "bg-amber-100 text-amber-700",
};

const statusStyles: Record<string, string> = {
  Paid: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Pending: "bg-amber-100 text-amber-700",
};

export default function FinanceSalesTable() {
  const { farmId } = useParams();
  const searchParams = useSearchParams();
  const { remove, status: deleteStat } = useDeleteDoc();
  const { workspace, user, ready } = useApp();
  const { filterByDate } = useFinanceFilters();
  const { sales, status, error } = useGetFarmSales(
    workspace?.id ?? null,
    user?.id ?? null,
    farmId as string,
  );
  const {
    harvests,
    status: harStat,
    error: harErr,
  } = useGetFarmHarvest(
    workspace?.id ?? null,
    user?.id ?? null,
    farmId as string,
  );
  const {
    crops,
    status: cropStat,
    error: cropErr,
  } = useGetFarmCrops(
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
    status === "pending" || harStat === "pending" || cropStat === "pending";

  if (isLoading)
    return (
      <div className="h-70">
        <FormLoader>Loading sales data...</FormLoader>
      </div>
    );

  const errorMessage = error?.message || harErr?.message || cropErr?.message;

  if (errorMessage)
    return (
      <div className="h-70">
        <NoResult>{errorMessage}</NoResult>
      </div>
    );

  if (!sales?.length)
    return (
      <div className="h-70">
        <NoResult>No sales found!</NoResult>
      </div>
    );

  const harvestMap = new Map(harvests?.map((h) => [h.$id, h]));

  const cropMap = new Map(crops?.map((c) => [c.$id, c]));

  const salesArr =
    sales?.map((sale, index) => {
      const harvest = harvestMap.get(sale.harvests);
      const crop = cropMap.get(harvest?.crops);

      return {
        id: sale.$id ? `INV-${sale.$id}` : `INV-${index + 1}`,
        harvestId: harvest?.$id ?? "",
        cropId: crop?.id ?? "",
        date: new Date(sale.saleDate).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),

        crop: crop?.cropName ?? "Unknown Crop",

        buyer: sale.buyer,

        quantity: sale.quantity,
        unit: sale.unit,

        unitPrice: `₦${sale.unitPrice.toLocaleString()}`,

        total: `₦${sale.totalAmount.toLocaleString()}`,

        payment:
          sale.paymentMethod === "transfer"
            ? "Transfer"
            : sale.paymentMethod === "card"
              ? "Card"
              : sale.paymentMethod === "cash"
                ? "Cash"
                : "Mobile Money",

        status:
          sale.status === "completed"
            ? "Paid"
            : sale.status === "cancelled"
              ? "Cancelled"
              : "Pending",
      };
    }) ?? [];

  const PAGE_SIZE = 5;
  const currentPage = Number(searchParams.get("salesPage") || 1);
  const filtered = filterByDate(salesArr ?? []);
  const paginatedSales = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className=" px-4  overflow-hidden">
      {/* Title */}
      <div className="py-2.5  font-semibold text-base text-dark">
        Sales Records
      </div>

      {/* Desktop Table */}

      {!filtered.length ? (
        <div className="h-70">
          <NoResult>No sale found!</NoResult>
        </div>
      ) : (
        <>
          <div className="hidden md:block md:h-[300px] overflow-x-auto">
            <table className="w-full text-sm ">
              <thead className=" bg-zinc-200/50 border rounded-t-2xl border-border text-gray-600">
                <tr className="text-left ">
                  <th className="py-2 truncate max-w-[50px] px-2">Date</th>
                  <th className="py-2 truncate max-w-[50px] pl-2">Crop</th>
                  <th className="py-2 truncate max-w-[50px] pl-4">Buyer</th>
                  <th className="py-2 truncate max-w-[50px] pr-2">Quantity</th>
                  <th className="py-2 truncate max-w-[50px] pr-2">
                    Unit Price
                  </th>
                  <th className="py-2 truncate max-w-[50px] pl-2">
                    Total Amount
                  </th>
                  <th className="py-2 truncate max-w-[50px] pl-2">
                    Payment Method
                  </th>
                  <th className="py-2 truncate max-w-[50px] pl-6">Status</th>
                  <th className="py-2 truncate max-w-[5s0px] px-2 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedSales?.map((s) => (
                  <tr key={s.id} className="border-t hover:bg-gray-50">
                    <td
                      title={s.date}
                      className="py-3 truncate font-medium max-w-[70px] pl-2 text-xs text-zinc-700"
                    >
                      {s.date}
                    </td>

                    <td
                      title={` ${s.crop}`}
                      className="py-3 truncate font-medium max-w-[70px] pl-2 text-xs text-zinc-700 flex items-center gap-2"
                    >
                      {s.crop}
                    </td>

                    <td
                      title={s.buyer}
                      className="py-3 truncate font-medium max-w-[70px] px-4 text-xs text-zinc-700"
                    >
                      {s.buyer}
                    </td>
                    <td
                      title={`${s.quantity} ${s.unit}`}
                      className="py-3 truncate font-medium max-w-[70px] pl-2 text-xs text-zinc-700"
                    >
                      {s.quantity} {s.unit}
                    </td>
                    <td
                      title={s.unitPrice}
                      className="py-3 truncate font-medium max-w-[70px] pl-2 text-xs text-zinc-700"
                    >
                      {s.unitPrice}
                    </td>
                    <td
                      title={s.total}
                      className="py-3 truncate font-medium max-w-[70px] pl-2 text-xs text-zinc-700 font-medium"
                    >
                      {s.total}
                    </td>

                    <td
                      title={s.payment}
                      className="py-3 truncate font-medium max-w-[70px] pl-2 text-xs text-zinc-700"
                    >
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${paymentStyles[s.payment]}`}
                      >
                        {s.payment}
                      </span>
                    </td>

                    <td
                      title={s.status}
                      className="py-3 truncate font-medium max-w-[70px] pl-6 text-xs text-zinc-700"
                    >
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${statusStyles[s.status]}`}
                      >
                        {s.status}
                      </span>
                    </td>

                    <td className="py-3 px-2 truncate font-medium max-w-[70px] px- text-xs text-zinc-700 text-right">
                      <div className="flex justify-end gap-3 text-gray-500">
                        <TableActions
                          actions={[
                            {
                              type: "modal",
                              label: "Edit",
                              icon: <LuPencil className="text-sm" />,
                              modal: (onClose) => (
                                <FinanceModal
                                  text={"Edit your sale record"}
                                  forWhat="Edit"
                                  type={"Sale"}
                                  iconColor="bg-[#e8f5ec] text-[#2d8952]"
                                  Icon={FiShoppingCart}
                                  open={true}
                                  onClose={onClose}
                                >
                                  <FinanceSalesFormFetch
                                    def={s}
                                    type={"edit"}
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
                                    collection: "sales",
                                    id: s.id.slice(4),
                                    workspaceId: workspace.id,
                                    userId: user.id,
                                  },
                                  {
                                    onSuccess: () => {
                                      toast("Deleted successfully", {
                                        description: "You've deleted a record",
                                      });
                                    },
                                    onError: (err) =>
                                      toast("Error deleting sale", {
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
            {paginatedSales.map((s) => (
              <div key={s.id} className="border rounded-lg p-4 shadow-sm">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">{s.date}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${statusStyles[s.status]}`}
                  >
                    {s.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-medium mt-2">
                  {s.crop}
                </div>

                <p className="text-sm mt-1">{s.buyer}</p>

                <div className="flex items-center gap-2 mt-2">
                  <div className="text-xs text-gray-500 ">
                    Qty: {s.quantity}
                  </div>

                  <div className="text-xs text-gray-500">
                    Unit: {s.unitPrice}
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-2">
                  <div className="font-semibold ">{s.total}</div>

                  <div className="">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${paymentStyles[s.payment]}`}
                    >
                      {s.payment}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>{" "}
        </>
      )}
      {/* Mobile Cards */}

      <FinancePagination
        type="sales"
        total={filtered.length}
        pageKey="salesPage"
      />
    </div>
  );
}
