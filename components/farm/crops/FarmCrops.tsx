import FarmCropsTable from "./FarmCropsTable";
import FarmCropsFilter from "./FarmCropsFilter";
import CropPagination from "../../layout/CropPagination";

export default function FarmCrops() {
  return (
    <div className="pt-4">
      <FarmCropsFilter />
      <FarmCropsTable />
      <CropPagination />
    </div>
  );
}
