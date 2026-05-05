import HaarvestBoxes from "@/components/harvests/HarvestBoxes";
import HarvestHeader from "@/components/harvests/HarvestHeader";
import HarvestTable from "@/components/harvests/HarvestTable";

export default function page() {
  return (
    <div className="pt-18 px-2 sm:px-4 pb-8">
      <HarvestHeader />
      <HaarvestBoxes />

      <HarvestTable />
      {/* <CropsFooter /> */}
    </div>
  );
}
