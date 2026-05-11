import { FaRegCheckCircle } from "react-icons/fa";
import { LuFolderCheck } from "react-icons/lu";
import { PiPlantBold } from "react-icons/pi";
import { RiTaskLine } from "react-icons/ri";

export default function DashboardBoxes() {
  const boxes = [
    {
      num: 8,
      icon: RiTaskLine,
      iconColor: "bg-[#e7f5eb] text-[#056b36]/80 ",
      text: "Tasks Assigned",
      sub: "3 pending",
      color: "text-[#de852c]",
    },
    {
      num: 3,
      icon: LuFolderCheck,
      iconColor: "bg-[#e7f5eb] text-[#056b36] ",
      text: "Tasks Completed",
      sub: "Today",
      color: "text-[#056b36]",
    },
    {
      num: 2,
      icon: PiPlantBold,
      iconColor: "bg-[#e1eefd] text-[#1058d6] ",
      text: "Fields Working On",
      sub: "Active",
      color: "text-[#056b36]/80",
    },
    {
      num: "92%",
      icon: FaRegCheckCircle,
      iconColor: "bg-[#f1ecfd] text-[#5837e8] ",
      text: "Attendance",
      sub: "This week",
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
