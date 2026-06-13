"use client";
import FinancePagination from "@/components/layout/FinancePagination";
import TableActions from "@/components/layout/TableAction";
import { FormLoader, NoResult } from "@/components/loader/GeneralLoader";
import { FinanceModal } from "@/components/modals/FinanceModal";
import { useGetFarmExpenses } from "@/hooks/expense/useExpense";
import { useFinanceFilters } from "@/hooks/useFinanceFilters";
import { useApp } from "@/stores/useAppStore";
import { useParams, useSearchParams } from "next/navigation";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import FinanceExpenseFormFetch from "./FinanceExpenseFom";
import { GrMoney } from "react-icons/gr";
import { toast } from "sonner";
import { useDeleteDoc } from "@/hooks/useDelete";
import { useGetFarmCrops } from "@/hooks/crops/useCrops";
import { useGetFarmFields } from "@/hooks/fields/useFields";

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
export default function FinanceExpenseTable() {
  const { farmId } = useParams();
  const searchParams = useSearchParams();
  const { workspace, user, ready } = useApp();
  const { filterByDate } = useFinanceFilters();
  const { remove, status: deleteStat } = useDeleteDoc();
  const { expenses, status, error } = useGetFarmExpenses(
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
  const {
    fields,
    status: fieldStat,
    error: fieldErr,
  } = useGetFarmFields(
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
    status === "pending" || fieldStat === "pending" || cropStat === "pending";

  if (isLoading)
    return (
      <div className="h-70">
        <FormLoader>Loading expense data...</FormLoader>
      </div>
    );

  const errorMessage = error?.message || fieldErr?.message || cropErr?.message;

  if (errorMessage)
    return (
      <div className="h-70">
        <NoResult>{errorMessage}</NoResult>
      </div>
    );

  if (!expenses?.length)
    return (
      <div className="h-70">
        <NoResult>No expense found!</NoResult>
      </div>
    );

  const fieldMap = new Map(fields?.map((f) => [f.$id, f]));
  const cropMap = new Map(crops?.map((c) => [c.$id, c]));
  const expensesArr =
    expenses?.map((expense, index) => {
      const field = fieldMap.get(expense?.fields);
      const crop = cropMap.get(expense?.crops);
      return {
        id: expense.$id ? `EXP-${expense.$id}` : `EXP-${index + 1}`,

        date: new Date(expense.expenseDate).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),

        farm: expense.farmName ?? "-", // optional if you join farms
        cropId: crop?.$id ?? "",
        fieldId: field?.$id ?? "",
        category:
          expense.category.charAt(0).toUpperCase() + expense.category.slice(1),

        description: expense.description ?? "-",

        vendor: expense.vendor ?? "-",

        total: `₦${expense.amount.toLocaleString()}`,

        payment:
          expense.paymentMethod === "transfer"
            ? "Transfer"
            : expense.paymentMethod === "card"
              ? "Card"
              : expense.paymentMethod === "cash"
                ? "Cash"
                : "Mobile Money",

        status:
          expense.status === "paid"
            ? "Paid"
            : expense.status === "pending"
              ? "Pending"
              : "Unknown",
      };
    }) ?? [];

  const PAGE_SIZE = 5;
  const currentPage = Number(searchParams.get("expensePage") || 1);
  const filtered = filterByDate(expensesArr ?? []);
  const paginatedExpense = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  return (
    <div className=" px-4  overflow-hidden">
      {/* Title */}
      <div className="py-2.5 border-t border-border font-semibold text-base text-dark">
        Expense Records
      </div>

      {/* Desktop Table */}
      {!filtered.length ? (
        <div className="h-70">
          <NoResult>No expense found!</NoResult>
        </div>
      ) : (
        <>
          {" "}
          <div className="hidden md:h-[300px] md:block overflow-x-auto">
            <table className="w-full text-sm ">
              <thead className=" bg-zinc-200/50 border rounded-t-2xl border-border text-gray-600">
                <tr className="text-left ">
                  <th className="py-2 truncate max-w-[50px] px-2">Date</th>
                  <th className="py-2 truncate max-w-[50px] pl-1">
                    Expense No.
                  </th>
                  <th className="py-2 truncate max-w-[50px] pl-6">Category</th>
                  <th className="py-2 truncate max-w-[50px] pl-2">Vendor</th>
                  <th className="py-2 truncate max-w-[50px] pl-2">Amount</th>
                  <th className="py-2 truncate max-w-[50px] pl-2">
                    Payment Method
                  </th>
                  <th className="py-2 truncate max-w-[50px] pl-2">
                    Payment Status
                  </th>
                  <th className="py-2 truncate max-w-[50px] px-2 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedExpense.map((s) => (
                  <tr key={s.id} className="border-t hover:bg-gray-50">
                    <td
                      title={s.date}
                      className="py-3 truncate font-medium max-w-[70px] pl-2 text-xs text-zinc-700"
                    >
                      {s.date}
                    </td>
                    <td
                      title={s.id}
                      className="py-3 truncate font-medium max-w-[100px] pl-2 text-xs text-zinc-700"
                    >
                      {s.id}
                    </td>

                    <td
                      title={`${s.category}`}
                      className="py-3 truncate font-medium max-w-[100px] pl-6 text-xs text-zinc-700 flex items-center gap-2"
                    >
                      {s.category}
                    </td>

                    <td
                      title={s.vendor}
                      className="py-3 truncate font-medium max-w-[70px] pl-2 text-xs text-zinc-700"
                    >
                      {s.vendor}
                    </td>

                    <td
                      title={s.total.toString()}
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
                      className="py-3 truncate font-medium max-w-[70px] pl-2 text-xs text-zinc-700"
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
                                  text={"Edit your crop"}
                                  forWhat="Edit"
                                  type={"Expense"}
                                  iconColor="bg-[#e8f5ec] text-[#2d8952]"
                                  Icon={GrMoney}
                                  open={true}
                                  onClose={onClose}
                                >
                                  <FinanceExpenseFormFetch
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
                                    collection: "expenses",
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
                                      toast("Error deleting expenses", {
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
            {paginatedExpense.map((s) => (
              <div key={s.id} className="border rounded-lg p-4 shadow-sm">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">{s.date}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${statusStyles[s.status]}`}
                  >
                    {s.status}
                  </span>
                </div>

                <p className="text-sm mt-1">{s.vendor}</p>

                <div className="text-xs text-gray-500 mt-2">{s.category}</div>

                <div className="flex items-center gap-3">
                  <div className="font-semibold mt-2">{s.total}</div>

                  <div className="mt-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${paymentStyles[s.payment]}`}
                    >
                      {s.payment}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <FinancePagination
        type="expenses"
        total={filtered.length}
        pageKey="expensePage"
      />
    </div>
  );
}
