"use client";
import { Button } from "../ui/button";
import { GoPlus } from "react-icons/go";
import { FinanceModal } from "../modals/FinanceModal";
import { useState } from "react";
import { TbPlant2 } from "react-icons/tb";
import CreateCropFormFetch from "../farm/crops/CreateCropForm";

export default function CropsHeader() {
  const [open, setOpen] = useState(false);
  return (
    <div className="pb-5 flex gap-3 sm:flex-row flex-col md:items-center justify-between">
      <div className=" space-y-1">
        <h6 className="text-dark font-semibold  text-2xl">Crops</h6>
        <p className="text-dark/80 text-sm">
          View and manage all your crops across your farms
        </p>
      </div>
      <Button
        onClick={() => setOpen(true)}
        className="bg-primary-green w-full sm:w-fit cursor-pointer text-white rounded-sm"
      >
        <GoPlus />
        <p>Add Crop</p>
      </Button>

      <FinanceModal
        text={"Add a new crop to your farm"}
        type={"Crop"}
        iconColor={"bg-[#e1eefd] text-[#1058d6]"}
        Icon={TbPlant2}
        open={open}
        onClose={() => setOpen(false)}
      >
        <CreateCropFormFetch onClose={() => setOpen(false)} />
      </FinanceModal>

      {/* export crop button */}
    </div>
  );
}
