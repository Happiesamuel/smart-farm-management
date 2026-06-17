import Image from "next/image";
import UserImg from "../../../public/user.png";
import { MdOutlineCalendarToday } from "react-icons/md";

export default function TaskCreation({
  assignTo,
  createdAt,
  createdBy,
  dueDate,
}: {
  assignTo: {
    name: string;
    avatar: string;
    role: string;
  };
  createdBy: {
    name: string;
    avatar: string;
    role: string;
  };
  createdAt: string;
  dueDate: string;
}) {
  const dateObj = new Date(dueDate);
  const createObj = new Date(createdAt);
  const date = dateObj.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const time = dateObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const createDate = createObj.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const createTime = createObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-2 xl:gap-4 md:gap-4 mt-4">
      <div className="flex items-center gap-4 border border-border rounded-md  p-4 shadow-xs bg-white">
        <div className="relative size-12 aspect-video">
          <Image
            src={assignTo.avatar || UserImg}
            alt="user"
            fill
            className="rounded-full size-full object-cover object-center"
          />
        </div>
        <div className="space-y-2">
          <p className="text-xs text-zinc-500 font-normal">Assigned to</p>
          <p className="text-sm text-dark/80 font-medium">{assignTo.name}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 border border-border rounded-md  p-4 shadow-xs bg-white">
        <div className="bg-zinc-200 size-12 flex items-center justify-center rounded-full">
          <MdOutlineCalendarToday className="text-dark/90" />
        </div>
        <div className="space-y-2 lg:w-[90%] xl:w-[75%] w-[75%]">
          <p className="text-xs text-zinc-500 font-normal">Due Date</p>
          <div className="flex w-full gap-1 items-center justify-between lg:flex-col lg:items-start xl:flex-row xl:items-center">
            <p className="text-sm text-dark/80 font-medium">{date}</p>
            <p className="text-xs text-zinc-500 font-normal">{time}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 border border-border rounded-md  p-4 shadow-xs bg-white">
        <div className="relative size-12 aspect-video">
          <Image
            src={createdBy.avatar || UserImg}
            alt="user"
            fill
            className="rounded-full size-full object-cover object-center"
          />
        </div>
        <div className="space-y-2 ">
          <p className="text-xs text-zinc-500 font-normal">Created by</p>
          <p className="text-sm text-dark/80 font-medium">{createdBy.name}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 border border-border rounded-md  p-4 shadow-xs bg-white">
        <div className="bg-zinc-200 size-12 flex items-center justify-center rounded-full">
          <MdOutlineCalendarToday className="text-dark/90" />
        </div>
        <div className="space-y-2  w-[75%]">
          <p className="text-xs text-zinc-500 font-normal">Created Date</p>
          <div className="flex w-full gap-1 items-center lg:flex-col lg:items-start xl:flex-row xl:items-center justify-between">
            <p className="text-sm text-dark/80 font-medium">{createDate}</p>
            <p className="text-xs text-zinc-500 font-normal">{createTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
