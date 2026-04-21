import React from "react";
import { FaGlobeAfrica } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

export default function DashboardMass() {
  return (
    <div className="flex-1 sm:col-span-2 md:col-span-2 xl:col-span-1  min-h-full justify-between flex gap-3 flex-col  xl:flex-col sm:flex-row ">
      <div className="flex w-full  p-4 items-start justify-between bg-white  rounded-xl border border-border/80  hover:shadow-sm transition">
        <div className="space-y-1">
          <p className="text-dark font-medium text-sm">Total Land Area</p>
          <div className="space-y-0.5">
            <h6 className="text-xl font-semibold">1,200 acres</h6>
            <p className="text-zinc-500  text-xs">
              <span className="text-primary-green">+8.08% </span>from last month
            </p>
          </div>
        </div>
        <div className="bg-green-600 rounded-full size-7 flex items-center justify-center">
          <FaGlobeAfrica className="text-white" />
        </div>
      </div>
      <div className="flex w-full p-4 items-start justify-between bg-white  rounded-xl border border-border/80  hover:shadow-sm transition">
        <div className="space-y-1">
          <p className="text-dark font-medium text-sm">Revenue</p>
          <div className="space-y-0.5">
            <h6 className="text-xl font-semibold">₦50,000</h6>
            <p className="text-zinc-500  text-xs">
              <span className="text-primary-green">+12.45% </span>from last
              month
            </p>
          </div>
        </div>
        <div className="bg-purple-600 rounded-full size-7 flex items-center justify-center">
          <FaMoneyBillTrendUp className="text-white text-base" />
        </div>
      </div>
    </div>
  );
}
