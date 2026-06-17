"use client";
import { useApp } from "@/stores/useAppStore";
import { GiDigDug, GiGrassMushroom } from "react-icons/gi";
import { TbDatabaseEdit } from "react-icons/tb";
import { Skeleton } from "../ui/skeleton";
import { useGetHarvest } from "@/hooks/harvest/useHarvest";
import { useGetSales } from "@/hooks/sales/useSales";
import { NoResult } from "../loader/GeneralLoader";
import { buildHarvestStats } from "@/lib/functions";

export default function HaarvestBoxes() {
  const { workspace, user, ready } = useApp();
  const { harvests, status, error } = useGetHarvest(
    workspace?.id ?? null,
    user?.id ?? null,
  );
  const {
    sales,
    status: salesStat,
    error: salesErr,
  } = useGetSales(workspace?.id ?? null, user?.id ?? null);

  if (!ready)
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 pb-4 lg:grid-cols-5 gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-30 w-full bg-zinc-200/80" />
        ))}
      </div>
    );

  if (!user || !workspace)
    return (
      <div className="h-70">
        <NoResult>Unauthorised</NoResult>
      </div>
    );

  const isLoading = status === "pending" || salesStat === "pending";

  if (isLoading)
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 pb-4 lg:grid-cols-5 gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-30 w-full bg-zinc-200/80" />
        ))}
      </div>
    );

  const errorMessage = error?.message || salesErr?.message;

  if (errorMessage)
    return (
      <div className="h-70">
        <NoResult>{errorMessage}</NoResult>
      </div>
    );

  const { totalHarvests, totalQty, totalRevenue, thisMonth } =
    buildHarvestStats(harvests!, sales!);
  const stats = [
    {
      num: totalHarvests,
      name: "Total Harvests",
      icon: <GiDigDug />,
      iconColor: "bg-[#e8f5ec] text-[#2d8952]",
      bg: "bg-[#f8fdf9]",
      sub: "All Time",
      border: "border-green-100",
    },
    {
      num: `${totalQty.toLocaleString()} kg`,
      name: "Total Quantity",
      icon: <GiGrassMushroom />,
      iconColor: "bg-[#e8f5ec] text-[#2d8952]",
      bg: "bg-[#f8fdf9]",
      sub: "All Time",
      border: "border-green-100",
    },
    {
      num: `₦${totalRevenue.toLocaleString()}`,
      name: "Total Revenue",
      icon: <TbDatabaseEdit />,
      iconColor: "bg-[#f1ecfd] text-[#5837e8]",
      bg: "bg-[#f9f7fd]",
      border: "border-purple-100",
      sub: "All Time",
    },
    {
      num: thisMonth,
      name: "This Month",
      icon: <GiDigDug />,
      iconColor: "bg-[#fee7e7] text-[#e82a2d]",
      bg: "bg-[#fef5f5]",
      border: "border-red-100",
      sub: "Harvests",
    },
  ];
  return (
    <div className="pb-4">
      <div className="grid grid-cols-2 sm:grid-cols-4  lg:grid-cols-4 gap-2">
        {stats.map((item, i) => (
          <div
            key={i}
            className={`px-4 py-4 rounded-md border ${item.bg} ${item.border} flex sm:flex-row flex-col items-center md:items-start gap-3`}
          >
            <div
              className={`text-xl size-8 flex items-center justify-center rounded-md ${item.iconColor}`}
            >
              {item.icon}
            </div>

            <div className="text-center sm:text-left space-y-1">
              <p className="text-sm text-dark/80 font-medium">{item.name}</p>
              <h3 className={`text-xl font-medium text-dark `}>{item.num}</h3>
              <p className="text-xs text-gray-500">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
