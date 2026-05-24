import CreateCropForm from "@/components/farm/crops/CreateCropForm";

import { PiPlantDuotone } from "react-icons/pi";

export default function page() {
  return (
    <div className="pt-18 px-2 sm:px-4 ">
      <div>
        <div className="text-xl text-dark font-semibold pb-3">Add Crop</div>
        <div className={`flex items-center  gap-4`}>
          <div
            className={` bg-[#e8f5ec] text-[#2d8952] size-12 rounded-xl items-center justify-center flex `}
          >
            <PiPlantDuotone className="text-2xl" />
          </div>
          <p className="text-sm text-dark/80 font-medium">
            Add a new crop to your field
          </p>
        </div>
      </div>

      <CreateCropForm />
    </div>
  );
}
