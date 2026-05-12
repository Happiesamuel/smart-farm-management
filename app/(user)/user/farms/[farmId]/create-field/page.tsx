import CreateFieldForm from "@/components/farm/fields/CreateFieldForm";

import { IoGrid } from "react-icons/io5";

export default function page() {
  return (
    <div className="pt-18 px-2 sm:px-4 ">
      <div>
        <div className="text-xl text-dark font-semibold pb-3">Add Field</div>
        <div className={`flex items-center  gap-4`}>
          <div
            className={` bg-[#e8f5ec] text-[#2d8952] size-12 rounded-xl items-center justify-center flex `}
          >
            <IoGrid className="text-2xl" />
          </div>
          <p className="text-sm text-dark/80 font-medium">
            Add a new field to your farm
          </p>
        </div>
      </div>

      <CreateFieldForm />
    </div>
  );
}
