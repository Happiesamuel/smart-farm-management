import DashboardBoxes from "@/components/worker/dashboard/DashboardBoxes";
import DashboardHeader from "@/components/worker/dashboard/DashboardHeader";
import DashboardTodaysTask from "@/components/worker/dashboard/DashboardTodaysTask";
import DashoardRecentActivities from "@/components/worker/dashboard/DashoardRecentActivities";
import React from "react";

export default function page() {
  return (
    <div className="pt-18 px-2 sm:px-4 pb-8">
      <DashboardHeader />
      <DashboardBoxes />
      <div className="grid grid-cols-[1fr_0.7fr] gap-4">
        <DashboardTodaysTask />
        <DashoardRecentActivities />
      </div>
    </div>
  );
}
