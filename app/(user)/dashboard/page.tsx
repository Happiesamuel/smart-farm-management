import DashboardMass from "@/components/dashboard/DashboardMass";
import { DashboardProductionOveriew } from "@/components/dashboard/DashboardProductionOverview";
import DashboardWeather from "@/components/dashboard/DashboardWeather";
import React from "react";

export default function page() {
  return (
    <div className="pt-18 px-4">
      <div className="pb-5 space-y-1">
        <h6 className="text-dark font-semibold tracking-[3px] text-2xl">
          Good Morning !
        </h6>
        <p className="text-dark/80 text-sm">
          Optimize Your Farm Operations with Real-Time Insights
        </p>
      </div>
      <div className="flex md:flex-row flex-col items-stretch lg:h-[220px] justify-between gap-4">
        <DashboardWeather />
        <DashboardProductionOveriew />
        <DashboardMass />
      </div>
    </div>
  );
}
