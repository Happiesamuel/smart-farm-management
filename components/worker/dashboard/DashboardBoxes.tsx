import { buildWorkerStats } from "@/lib/workerFn";
import { FaRegCheckCircle } from "react-icons/fa";
import { LuFolderCheck } from "react-icons/lu";
import { PiPlantBold } from "react-icons/pi";
import { RiTaskLine } from "react-icons/ri";

export default function DashboardBoxes({
  tasks,
  id,
}: {
  tasks: { [key: string]: string }[];
  id: string;
}) {
  const newTask = tasks?.filter((x) => x.assignTo === id);
  const stats = buildWorkerStats(newTask ?? []);
  const boxes = [
    {
      num: stats.assigned,
      icon: RiTaskLine,
      iconColor: "bg-[#e7f5eb] text-[#056b36]/80",
      text: "Tasks Assigned",
      sub: `${stats.pending} pending`,
      color: "text-[#de852c]",
    },
    {
      num: stats.completedTotal,
      icon: LuFolderCheck,
      iconColor: "bg-[#e7f5eb] text-[#056b36]",
      text: "Tasks Completed",
      sub: `${stats.completedToday} today`,
      color: "text-[#056b36]",
    },
    {
      num: stats.activeFields,
      icon: PiPlantBold,
      iconColor: "bg-[#e1eefd] text-[#1058d6]",
      text: "Fields Working On",
      sub: "Active",
      color: "text-[#056b36]/80",
    },
    {
      num: `${stats.attendance}%`,
      icon: FaRegCheckCircle,
      iconColor: "bg-[#f1ecfd] text-[#5837e8]",
      text: "Attendance",
      sub: "Completion rate",
      color: "text-zinc-500",
    },
  ];
  return (
    <div className="pb-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-2">
        {boxes.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className={`px-2 py-4 rounded-md shadow border border-border bg-white  flex sm:flex-row flex-col items-center gap-3`}
            >
              <div
                className={`text-2xl size-12 flex items-center justify-center rounded-md ${item.iconColor}`}
              >
                <Icon />
              </div>

              <div className="text-center sm:text-left">
                <h3
                  className={` font-medium text-dark transition-all duration-500  text-xl`}
                >
                  {item.num}
                </h3>
                <p
                  className={` text-gray-500 transition-all duration-500 text-sm`}
                >
                  {item.text}
                </p>
                <p
                  className={` transition-all duration-500 text-sm ${item.color}`}
                >
                  {item.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
