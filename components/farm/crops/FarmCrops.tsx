import FarmCropsTable from "./FarmCropsTable";
import FarmCropsFilter from "./FarmCropsFilter";
import CropPagination from "../../layout/CropPagination";

export default function FarmCrops() {
  return (
    <div>
      <FarmCropsFilter />
      <FarmCropsTable />
      <CropPagination />
    </div>
  );
}
