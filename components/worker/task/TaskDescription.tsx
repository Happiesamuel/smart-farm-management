import React from "react";
import { RiFileTextLine } from "react-icons/ri";

export default function TaskDescription() {
  return (
    <div className="flex flex-col  gap-4 border border-border mt-4 rounded-md  p-4 shadow-xs bg-white">
      <div className="flex items-center gap-2 pb-1">
        <RiFileTextLine className="text-lg text-primary-green" />
        <p className="text-base text-dark/90">Description</p>
      </div>
      <p className="text-sm text-gray-500 font-normal leading-relaxed whitespace-pre-line">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus,
        quo omnis blanditiis labore cumque quidem commodi ipsam illo ipsum
        veritatis quam accusantium natus, quia, excepturi eum perferendis porro
        quisquam? Dolorum. Lorem ipsum dolor, sit amet consectetur adipisicing
        elit. Tempore suscipit, provident autem porro eligendi aliquid odit
        voluptates, quas fugit quos sunt odio iure animi, itaque quaerat.
        Incidunt voluptatibus quas suscipit?
      </p>
    </div>
  );
}
