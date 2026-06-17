import React from "react";
import { RiFileTextLine } from "react-icons/ri";

export default function TaskDescription({ desc }: { desc: string }) {
  return (
    <div className="flex flex-col  gap-4 border border-border mt-4 rounded-md  p-4 shadow-xs bg-white">
      <div className="flex items-center gap-2 pb-1">
        <RiFileTextLine className="text-lg text-primary-green" />
        <p className="text-base text-dark/90">Description</p>
      </div>
      <p className="text-sm text-gray-500 font-normal leading-relaxed whitespace-pre-line">
        {desc}
      </p>
    </div>
  );
}
