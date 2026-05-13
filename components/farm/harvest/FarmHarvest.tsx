import { Button } from "@/components/ui/button";
import FarmHarvestBoxes from "./FarmHarvestBoxes";
import FarmHarvestTable from "./FarmHarvestTable";
import Link from "next/link";
import { GoPlus } from "react-icons/go";

export default function FarmHarvest() {
  return (
    <div>
      <FarmHarvestBoxes />
      <div className="flex items-center justify-end">
        <Button className="bg-primary-green w-full sm:w-fit cursor-pointer text-white">
          <Link
            href={"/user/farms/1/add-harvest"}
            className="flex items-center gap-1"
          >
            <GoPlus />
            <p>Add Harvest</p>
          </Link>
        </Button>
      </div>
      <FarmHarvestTable />
    </div>
  );
}
