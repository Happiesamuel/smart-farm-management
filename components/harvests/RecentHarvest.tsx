import React from "react";
import { GiGrass } from "react-icons/gi";

export default function RecentHarvest() {
  const harvests = [
    {
      id: "inv-128",
      date: "May 25, 2025",
      crop: "Maize",
      field: "Field A",
      revenue: "₦50,000",
      quantity: "500",
      unit: "kg",
      farm: "Green Valley Farm",
    },
    {
      id: "inv-127",
      date: "May 20, 2025",
      crop: "Rice",
      farm: "Sunrise Farm",
      quantity: "30",
      unit: "bags",
      field: "Field B",
    },
    {
      id: "inv-126",
      date: "May 15, 2025",
      crop: "Tomatoes",
      farm: "Golden Arces Farm",
      quantity: "20",
      unit: "crates",
      field: "Field C",
    },
    {
      id: "inv-125",
      date: "May 10, 2025",
      crop: "Pepper",
      farm: "Riverbend Farm",
      quantity: "15",
      unit: "crates",
      field: "Field D",
    },
  ];
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
                {har.quantity} {har.unit}
              </p>
              <p className="text-start">{har.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
