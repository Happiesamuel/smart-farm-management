'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useState } from "react";
import { FormLoader, NoResult } from "@/components/loader/GeneralLoader";
import { useApp } from "@/stores/useAppStore";
import { useParams } from "next/navigation";
import { useGetFarmSales } from "@/hooks/sales/useSales";
import { useGetFarmExpenses } from "@/hooks/expense/useExpense";
import { filterByDate } from "@/lib/functions";
const crops = [
  { id: 1, name: "This Week", value: "week" },
  { id: 2, name: "This Month", value: "month" },
  { id: 3, name: "This Year", value: "year" },
];
export default function FinanceTotal() {
const {farmId}=useParams()
const {workspace,user,ready}=useApp()
const [crop, setCrop] = useState<"week" | "month" | "year">("month");
const {sales,status,error} = useGetFarmSales(workspace?.id??null,user?.id??null,farmId as string)
const {expenses,status:expstatus,error:expErr} = useGetFarmExpenses(workspace?.id??null,user?.id??null,farmId as string)
if (!ready) return <div className="h-45"><FormLoader>Loading app...</FormLoader></div>;

if (!user || !workspace) return <div className="h-45"><NoResult>Unauthorised</NoResult></div>

const isLoading =
  status === "pending" || expstatus === 'pending'


if (isLoading) return <div className="h-45"><FormLoader>Loading total summary...</FormLoader></div>;

const errorMessage =
 error?.message || expErr?.message 

if (errorMessage) return <div className="h-45"><NoResult>{errorMessage}</NoResult></div>;

if (!sales?.length||!expenses?.length) return <div className="h-45"><NoResult>No summary!</NoResult></div>;
  const filteredSales = filterByDate(sales, crop, "saleDate");
const filteredExpenses = filterByDate(expenses, crop, "expenseDate");

const totalSales = filteredSales.reduce((sum, s) => sum + +s.totalAmount, 0);
const totalExpenses = filteredExpenses.reduce((sum, e) => sum + +e.amount, 0);

const netProfit = totalSales - totalExpenses;

const profitMargin =
  totalSales > 0 ? ((netProfit / totalSales) * 100).toFixed(1) : "0";
  

const tot = [
  {
    name: "Total Sales",
    amount: `₦${totalSales.toLocaleString()}`,
    col: "text-primary-green",
  },
  {
    name: "Total Expenses",
    amount: `₦${totalExpenses.toLocaleString()}`,
    col: "text-red-500",
  },
  {
    name: "Net Profit",
    amount: `₦${netProfit.toLocaleString()}`,
    col: netProfit >= 0 ? "text-primary-green" : "text-red-500",
  },
  {
    name: "Profit Margin",
    amount: `${profitMargin}%`,
    col: "text-dark/80",
  },
];
  return (
    <div className="space-y-3  border-b border-border pb-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-dark text-sm font-semibold">Finance Summary</p>
        <Select onValueChange={(e:"week" | "month" | "year") => setCrop(e)} defaultValue={crop}>
          <SelectTrigger className="text-dark border border-border bg-white rounded-lg">
            <SelectValue placeholder="Corn" />
          </SelectTrigger>
          <SelectContent className="bg-white mt-6 border-border text-zinc-400">
            {crops.map((x) => (
              <SelectItem
                key={x.id}
                value={x.value}
                className="hover:bg-zinc-900 transition-all text-dark/90 duration-500 cursor-pointer"
              >
                {x.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-4">
        {tot.map((t) => (
          <div
            className="flex items-center text-sm justify-between"
            key={t.name}
          >
            <p className="text-zinc-600">{t.name}</p>
            <p className={`${t.col} font-semibold`}>{t.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
