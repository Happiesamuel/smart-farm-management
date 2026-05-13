import Link from "next/link";
import React from "react";
import { PiFarm } from "react-icons/pi";

export default function FarmList() {
  const farms = [
    {
      id: 1,
      name: "Green Valley Farm",
      location: "Abuja, Nigeria",
      totalFields: 4,
      totalCrops: 6,
      status: "Active",
    },
    {
      id: 2,
      name: "Sunrise Organic Farm",
      location: "Kano, Nigeria",
      totalFields: 5,
      totalCrops: 7,
      status: "Active",
    },
    {
      id: 3,
      name: "Golden Harvest Farm",
      location: "Kaduna, Nigeria",
      totalFields: 6,
      totalCrops: 5,
      status: "Active",
    },
    {
      id: 4,
      name: "Riverbank Agro Farm",
      location: "Benue, Nigeria",
      totalFields: 3,
      totalCrops: 4,
      status: "Inactive",
    },
    {
      id: 5,
      name: "Savannah Crop Farm",
      location: "Jos, Nigeria",
      totalFields: 7,
      totalCrops: 8,
      status: "Active",
    },
    {
      id: 6,
      name: "Evergreen Plantation",
      location: "Ibadan, Nigeria",
      totalFields: 5,
      totalCrops: 6,
      status: "Active",
    },
  ];
  const statusStyles: Record<string, string> = {
    Active: "bg-green-100 text-green-700",
    Inactive: "bg-red-100 text-red-700",
  };

  return (
    <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 mx-auto w-full sm:w-[90%] lg:w-full xl:w-[90%] gap-4 mt-6">
      {farms.map((box) => {
        return (
          <Link
            href={`/user/settings/farm-information/${box.id}`}
            key={box.name}
            className="w-full p-4 cursor-pointer h-[100px] max-w-sm gap-4 bg-white items-start justify-cente relative rounded-md border border-border/80 hover:shadow-sm transition flex shrink-0"
          >
            <div
              className={`text-2xl size-12 flex items-center justify-center rounded-md bg-green-100 text-green-700`}
            >
              <PiFarm />
            </div>
            <div className="space-y-1 w-full">
              <div className="flex items-center w-full justify-between">
                <h6 className="text-dark text-sm">{box.name}</h6>
                <p
                  className={`px-2 py-0.5 text-[12px] rounded-full ${statusStyles[box.status]}`}
                >
                  {box.status}
                </p>
              </div>
              <p className="text-sm text-zinc-500 font-normal">
                {box.location}
              </p>
              <p className="text-sm space-x-2 text-zinc-500 font-normal">
                <span>{box.totalFields} fields</span>
                <span>{box.totalCrops} crops</span>
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
