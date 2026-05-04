import React from "react";
import { CropsPieChart } from "./CropsPieChat";
import { CropsBarChart } from "./CropsBarChart";

export default function CropsFooter() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 pt-4 gap-4">
      <CropsPieChart />
      <CropsBarChart />
    </div>
  );
}
