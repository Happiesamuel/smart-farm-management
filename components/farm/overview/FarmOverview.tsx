import React from "react";
import FarmOvervewBoxes from "./FarmOverviewBoxes";
import FarmLineChart from "./FarmLineChart";
import { FarmPieChart } from "./FarmPieChart";
import FarmActivites from "./FarmActivites";
import FarmUpcomingHarvest from "./FarmUpcomingHarvest";

export default function FarmOverview() {
  return (
    <div>
      <FarmOvervewBoxes />
      <div className="flex items-center gap-4 flex-col lg:flex-row">
        <FarmLineChart />
        <FarmPieChart />
      </div>
      <div className="flex items-center justify-between gap-4">
        <FarmActivites />
        <FarmUpcomingHarvest />
      </div>
    </div>
  );
}
