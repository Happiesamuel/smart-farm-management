import React from "react";
import { RiFileList3Line } from "react-icons/ri";

export default function TaskInfo() {
  return (
    <div className="flex flex-col   gap-4 border border-border  rounded-md  p-4 shadow-xs bg-white">
      <div className="flex items-center gap-2 pb-1">
        <RiFileList3Line className="text-lg text-primary-green" />
        <p className="text-base text-dark/90">Task Information</p>
      </div>

      <div className="space-y-2">
        <div className="border-b border-border pb-2 grid grid-cols-[0.5fr_1fr] sm:grid-cols-[0.4fr_1fr]">
          <p className="text-dark/80 text-sm font-medium">Farm</p>
          <p className="text-dark/90 text-sm font-medium">Green Valley Farm</p>
        </div>
        <div className="border-b border-border pb-2 grid grid-cols-[0.5fr_1fr] sm:grid-cols-[0.4fr_1fr]">
          <p className="text-dark/80 text-sm font-medium">Field</p>
          <p className="text-dark/90 text-sm font-medium">Field A</p>
        </div>
        <div className="border-b border-border pb-2 grid grid-cols-[0.5fr_1fr] sm:grid-cols-[0.4fr_1fr]">
          <p className="text-dark/80 text-sm font-medium">Crop</p>
          <p className="text-dark/90 text-sm font-medium">Maize</p>
        </div>
        <div className="border-b border-border pb-2 grid grid-cols-[0.5fr_1fr] sm:grid-cols-[0.4fr_1fr]">
          <p className="text-dark/80 text-sm font-medium">Task Type</p>
          <p className="text-dark/90 text-sm font-medium">Irrigation</p>
        </div>
        <div className="border-b border-border pb-2 grid grid-cols-[0.5fr_1fr] sm:grid-cols-[0.4fr_1fr]">
          <p className="text-dark/80 text-sm font-medium">Priority</p>
          <div className="flex items-center gap-2">
            <p className="rounded-full size-2 bg-red-500" />
            <p className="text-dark/90 text-sm font-medium"> High</p>
          </div>
        </div>
        <div className=" pb-2 grid grid-cols-[0.5fr_1fr] sm:grid-cols-[0.4fr_1fr]">
          <p className="text-dark/80 text-sm font-medium">Status</p>
          <div className="flex items-center gap-2">
            <p className="rounded-full size-2 bg-green-500" />
            <p className="text-dark/90 text-sm font-medium"> In Progress</p>
          </div>
        </div>
      </div>
    </div>
  );
}
