"use client";

import { useCollaspe } from "@/context/SidebarCollasibleContext";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import { PiFarm, PiPlant, PiPackage, PiChartLine } from "react-icons/pi";
import { TfiLayoutGrid4 } from "react-icons/tfi";
export default function DashboardFarms() {
  const stats = [
    {
      num: 2,
      name: "Total Farms",
      icon: <PiFarm />,
      iconColor: "bg-[#e8f5ec] text-[#2d8952] ",
      bg: "bg-[#f8fdf9]",
      border: "border-green-100",
    },
    {
      num: 12,
      name: "Total Fields",
      icon: <TfiLayoutGrid4 />,
      iconColor: "bg-[#e1eefd] text-[#1058d6] ",
      bg: "bg-[#f7fafe]",
      border: "border-blue-100",
    },
    {
      num: 18,
      name: "Total Crops",
      icon: <PiPlant />,
      iconColor: "bg-[#f1ecfd] text-[#5837e8] ",
      bg: "bg-[#f9f7fd]",
      border: "border-purple-100",
    },
    {
      num: 8,
      name: "Active Tasks",
      icon: <FaRegCalendarCheck />,
      iconColor: "bg-[#fff1dd] text-[#de852c] ",
      bg: "bg-[#fefaf2]",
      border: "border-orange-100",
    },
    {
      num: "₦1,250,000",
      name: "Total Revenue",
      icon: <PiPackage />,
      iconColor: "bg-[#e7f5eb] text-[#056b36] ",
      bg: "bg-[#f5faf6]",
      border: "border-green-100",
    },
    {
      num: "₦620,000",
      name: "Total Expenses",
      icon: <GrMoney />,
      iconColor: "bg-[#fee7e7] text-[#e82a2d] ",
      bg: "bg-[#fef5f5]",
      border: "border-red-100",
    },
    {
      num: "₦630,000",
      name: "Net Profit",
      icon: <PiChartLine />,
      iconColor: "bg-[#e7f5eb] text-[#056b36] ",
      bg: "bg-[#f5faf6]",
      border: "border-green-100",
    },
  ];
  const { collaspe } = useCollaspe();
  return (
    <div className="pb-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-2">
        {stats.map((item, i) => (
          <div
            key={i}
            className={`px-2 py-4 rounded-md border ${item.bg} ${item.border} flex sm:flex-row flex-col items-center gap-2`}
          >
            <div
              className={`text-xl size-8 flex items-center justify-center rounded-md ${item.iconColor}`}
            >
              {item.icon}
            </div>

            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-500">{item.name}</p>
              <h3
                className={`text-xl font-medium text-dark truncate ${collaspe ? "max-w-full" : "max-w-[100px]"}`}
              >
                {item.num}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
