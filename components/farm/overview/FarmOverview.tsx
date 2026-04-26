import React from "react";
import FarmOvervewBoxes from "./FarmOverviewBoxes";
import FarmLineChart from "./FarmLineChart";
import { FarmPieChart } from "./FarmPieChart";
import FarmActivites from "./FarmActivites";
import FarmUpcomingHarvest from "./FarmUpcomingHarvest";
import FarmSmartAlerts from "./FarmSmartAlert";

export default function FarmOverview() {
  return (
    <div>
      <FarmOvervewBoxes />
      <div className="flex items-center gap-4 flex-col lg:flex-row">
        <FarmLineChart />
        <FarmPieChart />
      </div>
      <div className="flex md:flex-row flex-col pt-4 items-center justify-between gap-4">
        <FarmActivites />
        <FarmUpcomingHarvest />
      </div>
      <FarmSmartAlerts />
    </div>
  );
}
