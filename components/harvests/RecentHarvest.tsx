import React from "react";
import { GiGrass } from "react-icons/gi";

export default function RecentHarvest({
  harvests,
}: {
  harvests: {
    id: string;
    date: string;
    crop: string;
    field: string;
    revenue: string;
    quantity: number;
    unit: string;
    farm: string;
  }[];
}) {
  return (
    <div className="w-full p-4  gap-0 bg-transparent flex-1 relative rounded-xl border border-border/80 hover:shadow-sm transition flex flex-col h-[300px shrink-0">
      <h3 className="text-dark/90 font-semibold text-sm">Recent Harvests</h3>

      <div className="flex flex-col gap-6 sm:gap-4 mt-6">
        {harvests.map((har) => (
          <div
            key={har.id}
            className="flex sm:flex-row flex-col gap-2 sm:items-center  text-sm text-zinc-600 justify-between"
          >
            <div className="flex items-center flex-1  gap-2">
              <div className="size-10 rounded-md bg-green-100 text-green-700 border-green-200 border flex items-center justify-center">
                <GiGrass />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-dark/90">
                  {har.crop} from {har.field}
                </p>
                <p>{har.farm}</p>
              </div>
            </div>
            <div className="flex justify-end sm:justify-between w-full flex-[0.8] items-center gap-4 lg:gap-2 xl:gap-10 sm:gap-10">
              <p>
                {Number(har.quantity).toLocaleString()} {har.unit}
              </p>
              <p className="text-start">{har.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
