'use client'
import { FormLoader, NoResult } from "@/components/loader/GeneralLoader";
import { useGetExpenses} from "@/hooks/expense/useExpense";
import { useFinanceFilters } from "@/hooks/useFinanceFilters";
import { useApp } from "@/stores/useAppStore";
import {  usePathname, useSearchParams } from "next/navigation";
import { FaEye, FaEllipsisV } from "react-icons/fa";
import BothPagination from "./BothPagination";
import { useGetFarm } from "@/hooks/farms/useFarm";




const paymentStyles: Record<string, string> = {
  Transfer: "bg-green-100 text-green-700",
  Cash: "bg-blue-100 text-blue-700",
  Card:'bg-purple-100 text-purple-700',
  'Mobile Money':'bg-amber-100 text-amber-700'
};
const statusStyles: Record<string, string> = {
  Paid: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Pending: "bg-amber-100 text-amber-700",
};

export default function ExpenseTable({type}:{type:string}) {
const searchParams = useSearchParams()
const {workspace,user,ready}=useApp()
const { filterByDate } = useFinanceFilters();
const {expenses,status,error} = useGetExpenses(workspace?.id??null,user?.id??null)
const {farms,status:farmStat,error:farmErr} = useGetFarm(workspace?.id??null,user?.id??null)
   const pathname = usePathname();
 const slug = pathname.split('/').at(3);


if (!ready) return <div className="h-70"><FormLoader>Loading app...</FormLoader></div>;

if (!user || !workspace) return <div className="h-70"><NoResult>Unauthorised</NoResult></div>

const isLoading =
  status === "pending" ||farmStat==='pending'

if (isLoading) return <div className="h-70"><FormLoader>Loading expense data...</FormLoader></div>;

const errorMessage =
 error?.message  || farmErr?.message

if (errorMessage) return <div className="h-70"><NoResult>{errorMessage}</NoResult></div>;

if (!expenses?.length) return <div className="h-70"><NoResult>No expense found!</NoResult></div>;



const farmMap = new Map(
  farms?.map((f) => [f.$id, f])
);


const expensesArr =
  expenses?.map((expense, index) => {
        const farm = farmMap.get(expense?.farms);
    return {
      id: expense.$id? `EXP-${expense.$id}` : `EXP-${index + 1}`,

      date: new Date(expense.expenseDate).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),

farm:farm?.farmName ?? "-",

      category:
        expense.category.charAt(0).toUpperCase() +
        expense.category.slice(1),

      description: expense.description ?? "-",

      vendor: expense.vendor ?? "-",

      total: `₦${expense.amount.toLocaleString()}`,

      payment:
        expense.paymentMethod === "transfer"
          ? "Transfer":   expense.paymentMethod === "card" ?'Card':   expense.paymentMethod === "cash"?'Cash'
          : 'Mobile Money',

      status:
        expense.status === "paid"
          ? "Paid"
          : expense.status === "pending"
          ? "Pending"
          : "Unknown",
    };
  }) ?? [];



  const PAGE_SIZE = 10;
const currentPage = Number(searchParams.get(`${slug}Page`) || 1);
const filtered = filterByDate(expensesArr ?? []);
const paginatedExpense = filtered.slice(  
  (currentPage - 1) * PAGE_SIZE,
  currentPage * PAGE_SIZE,
);
console.log(expenses)
  
  return (
    <>
    
    <div className="  overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm ">
          <thead className=" bg-zinc-200/50 border rounded-t-2xl border-border text-gray-600">
            <tr className="text-left ">
              <th className="py-2 truncate max-w-[50px] px-2">Date</th>
              <th className="py-2 truncate max-w-[50px] pl-1">Expense No.</th>
              <th className="py-2 truncate max-w-[50px] pl-4">Category</th>
              <th className="py-2 truncate max-w-[50px] px-4">Farm</th>
              <th className="py-2 truncate max-w-[50px] pl-">Vendor</th>
              <th className="py-2 truncate max-w-[50px] pl-2">Amount</th>
              <th className="py-2 truncate max-w-[50px] pl-5">
                Payment Status
              </th>
              <th className="py-2 truncate max-w-[50px] pl-2">
                Payment Method
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
                  className="py-3 truncate font-medium max-w-[70px] px-2 text-[13px] text-zinc-600"
                >
                  {s.date}
                </td>

                <td
                  title={`${s.id}`}
                  className="py-3 truncate font-medium max-w-[70px] pl-1 text-[13px] text-zinc-600 flex items-center gap-2"
                >
                  {s.id}
                </td>

                <td
                  title={s.category}
                  className="py-3 truncate font-medium max-w-[70px] pl-4 pr-1 text-[13px] text-zinc-600"
                >
                  {s.category}
                </td>
                <td
                  title={s.farm}
                  className="py-3 truncate font-medium max-w-[70px] px-1 text-[13px] text-zinc-600"
                >
                  {s.farm}
                </td>

                <td
                  title={s.vendor}
                  className="py-3 truncate font-medium max-w-[70px] px-2 pr-3 text-[13px] text-zinc-600"
                >
                  {s.vendor}
                </td>

                <td
                  title={s.total}
                  className="py-3 truncate font-semibold max-w-[70px] pl-2 text-[13px] text-zinc-600 "
                >
                  {s.total}
                </td>

                <td
                  title={s.status}
                  className="py-3 truncate font-medium max-w-[70px] pl-4 text-[13px] text-zinc-600"
                >
                  <span
                    className={`px-2 py-0.5 text-[12px] rounded-full ${statusStyles[s.status]}`}
                  >
                    {s.status}
                  </span>
                </td>
                <td
                  title={s.payment}
                  className="py-3 truncate font-medium max-w-[70px] pl-2 text-[13px] text-zinc-600"
                >
                  <span
                    className={`px-2 py-0.5 text-[12px] rounded-full ${paymentStyles[s.payment]}`}
                  >
                    {s.payment}
                  </span>
                </td>

                <td className="py-3 px-2 truncate font-medium max-w-[70px] px- text-[13px] text-zinc-600 text-right">
                  <div className="flex justify-end gap-3 text-gray-500">
                    <FaEye className="cursor-pointer hover:text-black" />
                    <FaEllipsisV className="cursor-pointer hover:text-black" />
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

          

            <p className="text-sm text-gray-500 mt-1">{s.farm}</p>
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

    </div>
    <BothPagination type={type} total={filtered.length} pageSize={PAGE_SIZE} pageKey={`${slug}Page`}/>
    </>
  );
}
