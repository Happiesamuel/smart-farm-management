import FieldActivityForm from "@/components/field/activity/FieldActivityForm";
import React from "react";
import { RiFileList3Line } from "react-icons/ri";

export default function page() {
  return (
    <div className="pt-18 px-2 sm:px-4 ">
      <div>
        <div className="text-xl text-dark font-semibold pb-3">
          Record Activity
        </div>
        <div className={`flex items-center pb-4  gap-4`}>
          <div
            className={` bg-[#e8f5ec] text-[#2d8952] size-12 rounded-xl items-center justify-center flex `}
          >
            <RiFileList3Line className="text-2xl" />
          </div>
          <p className="text-sm text-dark/80 font-medium">
            Add a new activity on your farm
          </p>
        </div>
      </div>
      <div className="w-full lg:w-[90%] mx-auto ">
        <FieldActivityForm />
      </div>
    </div>
  );
}
