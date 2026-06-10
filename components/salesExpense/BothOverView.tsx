'use client'
import { BothPieChart } from "./BothPieChart";
import BothSummary from "./BothSummary";
import { useApp } from "@/stores/useAppStore";
import { useGetSales } from "@/hooks/sales/useSales";
import { useGetCrops } from "@/hooks/crops/useCrops";
import { useGetHarvest } from "@/hooks/harvest/useHarvest";
import { FormLoader, NoResult } from "../loader/GeneralLoader";
import { filterChartDate, getExpensePieData, getSalesPieData, getTopCropsAllFarms, getTopExpenseCategories } from "@/lib/functions";
import { useGetExpenses } from "@/hooks/expense/useExpense";
import { useState } from "react";

export default function BothOverView({
  type,
}: {
  type: string;
}) {


  const [val, setVal] = useState<"year" | "month">("year");

const {workspace,user,ready}=useApp()
const {sales,status,error} = useGetSales(workspace?.id??null,user?.id??null)
const {crops,status:cropStat,error:cropErr} = useGetCrops(workspace?.id??null,user?.id??null)
const {harvests,status:harStat,error:harErr} = useGetHarvest(workspace?.id??null,user?.id??null)


const {expenses,status:expStat,error:expErr} = useGetExpenses(workspace?.id??null,user?.id??null)


if (!ready) return <div className="h-100 xl:h-full "><FormLoader>Loading app...</FormLoader></div>;

if (!user || !workspace) return <div className="h-100 xl:h-full"><NoResult>Unauthorised</NoResult></div>

const isLoading =
  status === "pending" ||
  cropStat === "pending"||harStat==='pending' || expStat === 'pending';

if (isLoading) return <div className="h-100 xl:h-full"><FormLoader>{type === 'sale' ? 'Loading top crops...' : 'Loading top expense cateories...'}</FormLoader></div>;

const errorMessage =
 error?.message  || cropErr?.message||harErr?.message||expErr?.message;

if (errorMessage) return <div className="h-100 xl:h-full"><NoResult>{errorMessage}</NoResult></div>;

if (!sales?.length&&type==='sale') return <div className="h-100 xl:h-full"><NoResult>No sales found!</NoResult></div>;
if (!expenses?.length&&type!=='sale') return <div className="h-100 xl:h-full"><NoResult>No expense found!</NoResult></div>;





const topCropsArr = getTopCropsAllFarms({
  sales:sales as  {[key:string]:string|number}[],
  harvests:harvests as  {[key:string]:string|number}[],
  crops:crops as  {[key:string]:string|number}[],
});

const topExpenseArr = getTopExpenseCategories(expenses as  {[key:string]:string|number}[]);
const filteredSales = filterChartDate(sales  as  {[key:string]:string|number}[], val);
const filteredExpense = filterChartDate(expenses  as  {[key:string]:string|number}[], val);

const salesData = getSalesPieData({   sales:filteredSales as  {[key:string]:string|number}[],
  harvests:harvests as  {[key:string]:string|number}[],
  crops:crops as  {[key:string]:string|number}[],});
const expenseData = getExpensePieData(filteredExpense as  {[key:string]:string|number}[]);





  return (
    <div className="border-l border-border mt-4 pb-8 xl:pb-0 lg:mt-0 lg:rounded-tl-md lg:rounded-bl-md">
      <BothPieChart type={type} val={val} setVal={setVal} data={type === 'sale'? salesData.slice(0, 5) :expenseData.slice(0, 5)} />
      <BothSummary type={type} arr={type === 'sale'? topCropsArr :topExpenseArr} />
    </div>
  );
}
