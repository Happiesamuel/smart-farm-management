import React from "react";
import FarmCropsTable from "./FarmCropsTable";
import FarmCropsFilter from "./FarmCropsFilter";
import CropPagination from "./CropPagination";

export default function FarmCrops() {
  return (
    <div>
      <FarmCropsFilter />
      <FarmCropsTable />
      <CropPagination />
    </div>
  );
}
