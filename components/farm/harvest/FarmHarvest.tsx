"use client";
import { Button } from "@/components/ui/button";
import FarmHarvestBoxes from "./FarmHarvestBoxes";
import FarmHarvestTable from "./FarmHarvestTable";
import Link from "next/link";
import { GoPlus } from "react-icons/go";
import { useParams } from "next/navigation";

export default function FarmHarvest() {
  const { workspaceId } = useParams();
  return (
    <div>
      <FarmHarvestBoxes />
      <div className="flex items-center justify-end">
        <Button className="bg-primary-green w-full sm:w-fit cursor-pointer text-white">
          <Link
            href={`/user/${workspaceId}/farms/1/add-harvest`}
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
