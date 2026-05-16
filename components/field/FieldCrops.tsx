import React from "react";
import FieldsCropsTable from "./FieldCropsTable";

export default function FieldCrops() {
  return (
    <div className="pt-2 space-y-4">
      <div className="flex items-center ">
        <div className="flex flex-col w-full max-w-[350px] gap-5 border border-border  rounded-md  p-4 shadow-xs bg-white">
          <div className="flex items-center gap-3">
            <h5 className="text-base text-dark font-semibold">Maize</h5>
            <p
              className={`rounded-full bg-green-50 text-green-600 p-0.5 px-2 text-xs border-green-200 border`}
            >
              Growing
            </p>
          </div>

          <div className="grid grid-cols-2">
            <div className="space-y-1">
              <p className="text-zinc-500 text-xs font-normal">Soil Type</p>
              <p className="text-dark/90 text-sm font-medium">Loamy Soil</p>
            </div>
            <div className="space-y-1">
              <p className="text-zinc-500 text-xs font-normal">Size</p>
              <p className="text-dark/90 text-sm font-medium">2.5 arces</p>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="space-y-1">
              <p className="text-zinc-500 text-xs font-normal">Planted on</p>
              <p className="text-dark/90 text-sm font-medium">Jan 02, 2025</p>
            </div>
            <div className="space-y-1">
              <p className="text-zinc-500 text-xs font-normal">
                Expected Harvest
              </p>
              <p className="text-dark/90 text-sm font-medium">April 10, 2025</p>
            </div>
          </div>

          <div className="flex flex-col  gap-2">
            <div className="flex items-center gap-4">
              <p className="text-xs text-zinc-500 font-normal">Progress</p>
              <p className="text-xs text-dark font-medium">70%</p>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-green-600 rounded-full"
                style={{ width: `${70}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <FieldsCropsTable />
    </div>
  );
}
