import Image from "next/image";
import UserImg from "../../../public/user.png";
import { MdOutlineCalendarToday } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";

export default function TaskCreation() {
  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      <div className="flex items-center gap-4 border border-border rounded-md  p-4 shadow-xs bg-white">
        <div className="relative size-12 aspect-video">
          <Image
            src={UserImg}
            alt="user"
            fill
            className="rounded-full size-full object-cover object-center"
          />
        </div>
        <div className="space-y-2">
          <p className="text-xs text-zinc-500 font-normal">Assigned to</p>
          <p className="text-sm text-dark/80 font-medium">John Doe</p>
        </div>
      </div>
      <div className="flex items-center gap-4 border border-border rounded-md  p-4 shadow-xs bg-white">
        <div className="bg-zinc-200 size-12 flex items-center justify-center rounded-full">
          <MdOutlineCalendarToday className="text-dark/90" />
        </div>
        <div className="space-y-2 w-[75%]">
          <p className="text-xs text-zinc-500 font-normal">Due Date</p>
          <div className="flex w-full gap-1 items-center justify-between">
            <p className="text-sm text-dark/80 font-medium">May 25, 2026</p>
            <p className="text-xs text-zinc-500 font-normal">10:00 AM</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 border border-border rounded-md  p-4 shadow-xs bg-white">
        <div className="bg-green-100 size-12 flex items-center justify-center rounded-full">
          <FaRegUser className="text-green-600" />
        </div>
        <div className="space-y-2 ">
          <p className="text-xs text-zinc-500 font-normal">Created by</p>
          <p className="text-sm text-dark/80 font-medium">Farm Manager</p>
        </div>
      </div>
      <div className="flex items-center gap-4 border border-border rounded-md  p-4 shadow-xs bg-white">
        <div className="bg-zinc-200 size-12 flex items-center justify-center rounded-full">
          <MdOutlineCalendarToday className="text-dark/90" />
        </div>
        <div className="space-y-2 w-[75%]">
          <p className="text-xs text-zinc-500 font-normal">Created Date</p>
          <div className="flex w-full gap-1 items-center justify-between">
            <p className="text-sm text-dark/80 font-medium">May 20, 2026</p>
            <p className="text-xs text-zinc-500 font-normal">07:30 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
