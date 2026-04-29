import { FaRegCalendarCheck } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { GrMoney } from "react-icons/gr";
import { PiFarm, PiPlant } from "react-icons/pi";
import { TfiLayoutGrid4 } from "react-icons/tfi";

export default function DashboardQucikActions() {
  const stats = [
    {
      name: "Add Farm",
      icon: <PiFarm />,
      iconColor: "bg-[#e8f5ec] text-[#2d8952] ",
      bg: "bg-[#f8fdf9]",
      border: "border-green-100",
      text: "text-[#2d8952]",
    },
    {
      name: "Add Field",
      icon: <TfiLayoutGrid4 />,
      iconColor: "bg-[#e1eefd] text-[#1058d6] ",
      bg: "bg-[#f7fafe]",
      border: "border-blue-100",
      text: "text-[#1058d6]",
    },
    {
      name: "Add Crop",
      icon: <PiPlant />,
      iconColor: "bg-[#f1ecfd] text-[#5837e8] ",
      bg: "bg-[#f9f7fd]",
      border: "border-green-100",
      text: "text-[#5837e8]",
    },
    {
      name: "Add Tasks",
      icon: <FaRegCalendarCheck />,
      iconColor: "bg-[#fff1dd] text-[#de852c] ",
      bg: "bg-[#fefaf2]",
      border: "border-orange-100",
      text: "text-[#de852c]",
    },
    {
      name: "Record Sale",
      icon: <FiShoppingCart />,
      iconColor: "bg-[#e8f5ec] text-[#2d8952] ",
      bg: "bg-[#f8fdf9]",
      border: "border-green-100",
      text: "text-[#2d8952]",
    },
    {
      name: "Add Expense",
      icon: <GrMoney />,
      iconColor: "bg-[#fee7e7] text-[#e82a2d] ",
      bg: "bg-[#fef5f5]",
      border: "border-red-100",
      text: "text-[#e82a2d]",
    },
  ];
  return (
    <div className="w-full p-4 bg-white flex-1 rounded-xl border border-border/80 hover:shadow-sm transition flex flex-col h-[350px shrink-0">
      <h3 className="font-medium pb-4 text-base text-dark">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-2">
        {stats.map((item, i) => (
          <div
            key={i}
            className={`px-2 py-4 cursor-pointer hover:scale-[1.02] transition-all duration-400 rounded-md border ${item.bg} ${item.border} flex sm:flex-row flex-col items-center gap-2`}
          >
            <div
              className={`text-xl size-8 flex items-center justify-center rounded-md ${item.iconColor}`}
            >
              {item.icon}
            </div>

            <div className="text-center sm:text-left">
              <p className={` text-sm ${item.text}`}>{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
