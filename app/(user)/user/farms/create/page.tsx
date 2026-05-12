import CreateFarmForm from "@/components/farm/create/CreateFarmForm";
import React from "react";
import { PiFarm } from "react-icons/pi";

export default function page() {
  return (
    <div className="pt-18 px-2 sm:px-4 ">
      <div>
        <div className="text-xl text-dark font-semibold pb-3">Add Farm</div>
        <div className={`flex items-center  gap-4`}>
          <div
            className={` bg-green-100 text-green-500 size-12 rounded-xl items-center justify-center flex `}
          >
            <PiFarm className="text-2xl" />
          </div>
          <p className="text-sm text-dark/80 font-medium">
            Add a farm to your account
          </p>
        </div>
      </div>
      <p className="text-primary-green pt-3 pb-1 text-sm w-full font-semibold border-border border-b">
        Farm Information
      </p>
      <CreateFarmForm />
    </div>
  );
}
