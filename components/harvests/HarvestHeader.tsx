import React from "react";
import { Button } from "../ui/button";
import { GoPlus } from "react-icons/go";

export default function HarvestHeader() {
  return (
    <div className="pb-5 flex gap-3 sm:flex-row flex-col md:items-center justify-between">
      <div className=" space-y-1">
        <h6 className="text-dark font-semibold  text-2xl">Harvest</h6>
        <p className="text-dark/80 text-sm">Track and manage all harvests.</p>
      </div>
      <Button className="bg-primary-green w-full sm:w-fit cursor-pointer text-white rounded-sm">
        <GoPlus />
        <p>Add Harvest</p>
      </Button>

      {/* expprt haest button */}
    </div>
  );
}
