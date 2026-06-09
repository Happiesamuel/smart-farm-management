"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetFarmFinanceStats } from "@/hooks/farms/useFarm";
import { useApp } from "@/stores/useAppStore";
import { useParams } from "next/navigation";
import { GiMoneyStack, GiTakeMyMoney } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { TbPigMoney } from "react-icons/tb";

export default function FarmFinanceBoxes() {
  const { workspace, user, ready } = useApp();
  const { farmId } = useParams();
  const { data, status } = useGetFarmFinanceStats(
    workspace?.id ?? null,
    farmId as string,
    user?.id ?? null,
  );
  if (status === "pending" || !ready)
    return (
      <div className="grid grid-cols-2 py-4 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-30 w-full bg-zinc-200/80" />
        ))}
      </div>
    );

  const stats = [
    {
      num: `₦${(data?.totalRevenue ?? 0).toLocaleString()}`,
      name: "Total Revenue",
      sub: `${data?.revenueChange?.toFixed(1)}% vs last month`,
      slug: "revenue",
      icon: GiMoneyStack,
      iconColor: "bg-[#e8f5ec] text-[#2d8952]",
      bg: "bg-[#f8fdf9]",
      border: "border-green-100",
    },
    {
      num: `₦${(data?.totalExpenses ?? 0).toLocaleString()}`,
      name: "Total Expenses",
      sub: `${data?.expenseChange?.toFixed(1)}% vs last month`,
      slug: "expenses",
      icon: GrMoney,
      iconColor: "bg-[#fee7e7] text-[#e82a2d]",
      bg: "bg-[#fef5f5]",
      border: "border-red-100",
    },
    {
      num: `₦${(data?.profit ?? 0).toLocaleString()}`,
      name: "Net Profit",
      sub: `${data?.profitChange?.toFixed(1)}% vs last month`,
      slug: "profit",
      icon: GiTakeMyMoney,
      iconColor: "bg-[#e1eefd] text-[#1058d6]",
      bg: "bg-[#f7fafe]",
      border: "border-blue-100",
    },
    {
      num: `${(data?.margin ?? 0).toFixed(1)}%`,
      name: "Profit Margin",
      sub: `${data?.marginChange?.toFixed(1)}% vs last month`,
      slug: "margin",
      icon: TbPigMoney,
      iconColor: "bg-[#f1ecfd] text-[#5837e8]",
      bg: "bg-[#f9f7fd]",
      border: "border-green-100",
    },
  ];

  return (
    <div className="pb-4">
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
    </div>
  );
}
