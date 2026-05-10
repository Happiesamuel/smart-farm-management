import { FaRegUser, FaUserClock } from "react-icons/fa6";
import { MdLabelImportantOutline } from "react-icons/md";

export default function TaskActivity() {
  const acts = [
    {
      title: "Task created by Farm Manager",
      date: "May 20, 2026 at 07:30 AM",
      iconColor: "bg-[#e8f5ec] text-[#2d8952] ",
      bg: "bg-[#f8fdf9]",
      icon: FaRegUser,
      id: 1,
    },
    {
      title: "Task assigned to John Doe",
      date: "May 20, 2026 at 08:15 AM",
      iconColor: "bg-[#e1eefd] text-[#1058d6] ",
      bg: "bg-[#f7fafe]",
      icon: FaRegUser,
      id: 2,
    },
    {
      title: "Status changed to Pending",
      date: "May 20, 2026 at 08:20 AM",
      iconColor: "bg-[#fee7e7] text-[#e82a2d] ",
      bg: "bg-[#fef5f5]",
      icon: MdLabelImportantOutline,
      id: 3,
    },
    {
      title: "Status changed to In Progress",
      date: "May 20, 2026 at 08:20 AM",
      iconColor: "bg-[#fff1dd] text-[#de852c] ",
      bg: "bg-[#fefaf2]",
      icon: MdLabelImportantOutline,
      id: 4,
    },
    {
      title: "Status changed to Completed",
      date: "May 20, 2026 at 08:20 AM",
      iconColor: "bg-[#e8f5ec] text-[#2d8952] ",
      bg: "bg-[#f8fdf9]",
      icon: MdLabelImportantOutline,
      id: 5,
    },
  ];
  return (
    <div className="flex flex-col  gap-4 border border-border  rounded-md  p-4 shadow-xs bg-white">
      <div className="flex items-center gap-2 pb-1">
        <FaUserClock className="text-lg text-primary-green" />
        <p className="text-base text-dark/90">Activity Timeline</p>
      </div>
      <div className="space-y-3 overflow-scroll no-scroll h-[200px]">
        {acts.map((act) => {
          const Icon = act.icon;
          return (
            <div key={act.id} className="flex items-center gap-3">
              <div
                className={`flex items-center justify-center rounded-full size-8 text-sm ${act.iconColor}`}
              >
                <Icon />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-dark/90 font-medium">{act.title}</p>
                <p className="text-xs text-zinc-500 font-normal">{act.date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
