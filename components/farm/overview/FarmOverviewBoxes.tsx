"use client";
import { buildFarmOverview } from "@/lib/stat";
import { useMemo } from "react";

export default function FarmOvervewBoxes({
  farmId,
  fields,
  crops,
  tasks,
  sales,
  expenses,
}: {
  farmId: string;
  fields: { [key: string]: string | number }[];
  crops: { [key: string]: string | number }[];
  tasks: { [key: string]: string | number }[];
  sales: { [key: string]: string | number }[];
  expenses: { [key: string]: string | number }[];
}) {
  const stats = useMemo(() => {
    if (!farmId) return null;

    return buildFarmOverview({
      farmId: farmId,
      fields,
      crops,
      tasks,
      sales,
      expenses,
    });
  }, [farmId, fields, crops, tasks, sales, expenses]);
  const statsArr = [
    {
      num: stats?.totalFields ?? 0,
      name: "Fields",
      sub: "Total Fields",
    },
    {
      num: stats?.totalCrops ?? 0,
      name: "Crops",
      sub: "Active crops",
    },
    {
      num: stats?.activeTasks ?? 0,
      name: "Tasks",
      sub: "Pending tasks",
    },
    {
      num: `₦${(stats?.revenue ?? 0).toLocaleString()}`,
      name: "Revenue",
      sub: "This month",
    },
    {
      num: `₦${(stats?.profit ?? 0).toLocaleString()}`,
      name: "Profit",
      sub: "This month",
    },
  ];
  return (
    <div className="py-4">
      <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-5 lg:gap-4 md:gap-1 gap-4">
        {statsArr.map((item, i) => (
          <div
            key={i}
            className={`p-5  bg-white  rounded-xl border border-border/80  hover:shadow-sm transition flex  flex-col items-start gap-1`}
          >
            <p className="text-sm text-gray-500">{item.name}</p>
            <h3 className="text-xl font-semibold text-dark">{item.num}</h3>
            <p className="text-sm text-gray-500">{item.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
