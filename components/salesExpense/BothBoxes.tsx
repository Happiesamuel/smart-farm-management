'use client'
import { useGetExpenses } from "@/hooks/expense/useExpense";
import { useGetSales } from "@/hooks/sales/useSales";
import { useApp } from "@/stores/useAppStore";
import { Skeleton } from "../ui/skeleton";
import { getExpenseStats, getSalesStats } from "@/lib/constants";
import { useState } from "react";
import {  filterByStatDate } from "@/lib/functions";


export default function BothBoxes({ type }: { type: string}) {
    const { workspace, user, ready } = useApp();
    const { sales, status } = useGetSales(
      workspace?.id ?? null,
      user?.id ?? null,
    );
    const { expenses, status:expStat } = useGetExpenses(
      workspace?.id ?? null,
      user?.id ?? null,
    );
    const [active,setActive]=useState<"week" | "month" | "year">("week");
    if (status === "pending" || expStat === 'pending' || !ready)
      return (
       <div className="grid grid-cols-2 pb-4  md:grid-cols-4 lg:gap-4 md:gap-1 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-30 w-full bg-zinc-200/80" />
          ))}
        </div>
      );

      const buts = [
        {
      name:'Week',
      val:'week' as const
    },
    {
      name:'Month',
      val:'month' as const
    },
    {
      name:'Year',
      val:'year' as const
    }
  ]
const filtered =
  type === "sales"
    ? filterByStatDate(sales as { [key: string]: string | number }[], active) 
    : filterByStatDate(expenses as { [key: string]: string | number }[], active);

const stats =
  type === "sales"
    ? getSalesStats(filtered, active)  // 👈 was missing active
    : getExpenseStats(filtered, active); 
  return (
    <div className="pb-2">
      <div className="grid grid-cols-2   md:grid-cols-4 lg:gap-4 md:gap-1 gap-2">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className={`p-5  ${item.bg}  rounded-xl border ${item.border} hover:shadow-sm transition flex  flex-col sm:flex-row justify-between items-center gap-2`}
            >
              <div className="space-y-2 sm:text-start text-center">
                <p className="text-sm text-gray-500">{item.name}</p>
                <h3 className="text-xl font-semibold text-dark">{item.num}</h3>
                <p className="text-sm text-center sm:text-start text-gray-500">
                  {item.sub}
                </p>
              </div>
              <div
                className={`size-10 ${item.iconColor} flex items-center justify-center rounded-md`}
              >
                <Icon className="text-2xl" />
              </div>
            </div>
          );
        })}
      </div>
     <div className="flex items-center justify-end mt-2">
       <div className={`flex items-center bg-white/80 border border-border/80 rounded-sm  gap-2.5 transition-all duration-500  justify-end w-fit p-1 px-2`}>{buts.map(b=> <p onClick={()=>setActive(b.val as "week" | "month" | "year")} className={`cursor-pointer font-medium text-sm ${active === b.val ?'bg-primary-green py-1 px-2 rounded-sm text-white' :'text-dark/90'}`} key={b.val}>{b.name}</p>)}</div>
     </div>
    </div>
  );
}
