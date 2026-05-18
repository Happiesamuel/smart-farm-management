"use client";
import { Button } from "../ui/button";
import { GoPlus } from "react-icons/go";
import { FinanceModal } from "../modals/FinanceModal";
import { useState } from "react";
import { GiDigDug } from "react-icons/gi";
import CreateHarvestForm from "../farm/harvest/CreateHarvestForm";
export default function HarvestHeader() {
  const [open, setOpen] = useState(false);
  return (
    <div className="pb-5 flex gap-3 sm:flex-row flex-col md:items-center justify-between">
      <div className=" space-y-1">
        <h6 className="text-dark font-semibold  text-2xl">Harvest</h6>
        <p className="text-dark/80 text-sm">Track and manage all harvests.</p>
      </div>
      <Button
        onClick={() => setOpen(true)}
        className="bg-primary-green w-full sm:w-fit cursor-pointer text-white rounded-sm"
      >
        <GoPlus />
        <p>Add Harvest</p>
      </Button>
      <FinanceModal
        text={"Add a new harvest to your farm"}
        type={"Harvest"}
        iconColor={"bg-[#e8f5ec] text-[#2d8952]"}
        Icon={GiDigDug}
        open={open}
        onClose={() => setOpen(false)}
      >
        <CreateHarvestForm />
      </FinanceModal>
      {/* expprt haest button */}
    </div>
  );
}
