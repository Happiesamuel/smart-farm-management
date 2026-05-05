import React from "react";
import { HarvestPieChart } from "./HarvestPieChat";
import RecentHarvest from "./RecentHarvest";

export default function HarvestFooter() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 pt-4 gap-4">
      <HarvestPieChart />
      <RecentHarvest />
    </div>
  );
}
