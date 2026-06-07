"use client";
import { useGetAllFarmStats } from "@/hooks/farms/useFarm";
import { useApp } from "@/stores/useAppStore";
import React from "react";
import { GiMoneyStack } from "react-icons/gi";
import { MdOutlineWater } from "react-icons/md";
import { PiFarm, PiPlant } from "react-icons/pi";
import { Skeleton } from "../ui/skeleton";

export default function FarmAverage() {
  const { workspace, user, ready } = useApp();
  const { data, status } = useGetAllFarmStats(
    workspace?.id ?? null,
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
      num: data?.totalFarms ?? 0,
      name: "Total Farms",
      icon: <PiFarm className="text-2xl" />,
      bg: "bg-green-50",
      border: "border-green-200",
    },
    {
      num: data?.totalFields ?? 0,
      name: "Total Fields",
      icon: <MdOutlineWater className="text-2xl" />,
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    },
    {
      num: data?.totalCrops ?? 0,
      name: "Total Crops",
      icon: <PiPlant className="text-2xl" />,
      bg: "bg-yellow-50",
      border: "border-yellow-200",
    },
    {
      num: `₦${(data?.totalRevenue ?? 0).toLocaleString()}`,
      name: "Total Revenue",
      icon: <GiMoneyStack className="text-2xl" />,
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
  ];

  return (
    <div className="py-4">
      <div className="grid grid-cols-2  sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((item, i) => (
          <div
            key={i}
            className={`p-5  bg-white  rounded-xl border border-border/80  hover:shadow-sm transition flex sm:flex-row flex-col items-start gap-4`}
          >
            <div
              className={`text-2xl bg-[linear-gradient(180deg,#fbfffb,#bae9bd)] flex items-center justify-center size-8 rounded-md text-primary-green`}
            >
              {item.icon}
            </div>

            <div className="text-center space-y-2 sm:text-left">
              <p className="text-sm text-gray-500">{item.name}</p>
              <h3 className="text-xl font-semibold text-dark">{item.num}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
