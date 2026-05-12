import CropBoxes from "@/components/crops/CropBoxes";
import CropsFooter from "@/components/crops/CropsFooter";
import CropsHeader from "@/components/crops/CropsHeader";
import CropTable from "@/components/crops/CropTable";

export default function page() {
  return (
    <div className="pt-18 px-2 sm:px-4 pb-8">
      <CropsHeader />
      <CropBoxes />

      <CropTable />
      <CropsFooter />
    </div>
  );
}
