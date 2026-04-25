import React from "react";
import FarmOvervewBoxes from "./FarmOverviewBoxes";
import FarmLineChart from "./FarmLineChart";
import { FarmPieChart } from "./FarmPieChart";

export default function FarmOverview() {
  return (
    <div>
      <FarmOvervewBoxes />
      <div className="flex items-center gap-4 flex-col lg:flex-row">
        <FarmLineChart />
        <FarmPieChart />
      </div>
    </div>
  );
}
