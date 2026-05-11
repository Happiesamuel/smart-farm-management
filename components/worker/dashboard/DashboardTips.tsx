import React from "react";
import { BsHouseExclamation } from "react-icons/bs";

export default function DashboardTips() {
  return (
    <div className="grid grid-cols-1 gap-2">
      <div className="flex items-center  gap-4 border border-border  rounded-md  p-4 shadow-xs bg-white">
        <div className="bg-[#e7f5eb] text-[#056b36] flex items-center justify-center size-16 rounded-full text-xl">
          <BsHouseExclamation />{" "}
        </div>
        <div className="space-y-2">
          <p className="text-dark/90 font-medium text-base">
            Farm Tip of the day 🌱
          </p>
          <p className="text-sm text-zinc-500 font-normal">
            Water your crops in the early morning to reduce evaporation and save
            water.
          </p>
        </div>
      </div>
      <div className=" space-y-4 border border-border  rounded-md  p-4 shadow-xs bg-white">
        <h4 className="text-dark  text-base">Reminders</h4>
        <div className="space-y-2">
          <p className="text-dark/90 font-medium text-base">🔔 Stay safe!</p>
          <p className="text-sm text-zinc-500 font-normal">
            Always wear protective gear and stay ydrated while working.
          </p>
        </div>
      </div>
    </div>
  );
}
