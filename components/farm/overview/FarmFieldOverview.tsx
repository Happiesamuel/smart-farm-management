import React from "react";
import { PiPlant } from "react-icons/pi";

export default function FarmFieldOverview() {
  const fields = [
    {
      name: "Field A",
      size: "25 arces",
      crop: "Maize",
      status: "Growing",
    },
    {
      name: "Field B",
      size: "30 arces",
      crop: "Rice",
      status: "Growing",
    },
    {
      name: "Field C",
      size: "35 arces",
      crop: "Tomatoes",
      status: "Growing",
    },
    {
      name: "Field D",
      size: "30 arces",
      crop: "Pepper",
      status: "Nursery",
    },
  ];
  return (
    <div className="w-full p-4 h-[300px]  bg-white flex-1 rounded-xl border border-border/80 hover:shadow-sm transition flex flex-col  shrink-0">
      <div className="flex pb-4 items-center justify-between">
        <p className="text-dark text-base font-semibold">Field Activites</p>
        <p className="text-sm text-primary-green font-normal">View All</p>
      </div>

      <div className="space-y-4">
        {fields.map((act) => (
          <div
            key={act.name}
            className="flex  justify-between items-center gap-3.5"
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center size-7 rounded bg-green-100/80 border border-green-200 text-primary-green ">
                <PiPlant />
              </div>

              <div className="space-y-1 text-sm">
                <p className="text-dark.90">{act.name}</p>
                <p className="text-zinc-600 text-xs">{act.size}</p>
              </div>
            </div>
            <div className="flex items-center text-sm gap-5 ">
              <p className="text-dark/95 text-sm">{act.crop}</p>
              <p className="px-2 py-0.5 rounded-full bg-green-100 text-green-500 text-xs">
                {act.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
