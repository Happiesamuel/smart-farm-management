"use client";

import { useCollaspe } from "@/context/SidebarCollasibleContext";
import { GrMoney } from "react-icons/gr";
import { PiPackage, PiChartLine } from "react-icons/pi";
import { TbPigMoney } from "react-icons/tb";
interface Stat {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  profitMargin: number;
}
export default function ReportBoxes({ stat }: { stat: Stat }) {
  const stats = [
    {
      num: `₦${stat.totalRevenue.toLocaleString()}`,
      name: "Total Revenue",
      icon: <PiPackage />,
      iconColor: "bg-[#e7f5eb] text-[#056b36] ",
      bg: "bg-[#f5faf6]",
      border: "border-green-100",
    },
    {
      num: `₦${stat.totalExpenses.toLocaleString()}`,
      name: "Total Expenses",
      icon: <GrMoney />,
      iconColor: "bg-[#fee7e7] text-[#e82a2d] ",
      bg: "bg-[#fef5f5]",
      border: "border-red-100",
    },
    {
      num: `₦${stat.netProfit.toLocaleString()}`,
      name: "Net Profit",
      icon: <PiChartLine />,
      iconColor: "bg-[#e7f5eb] text-[#056b36] ",
      bg: "bg-[#f5faf6]",
      border: "border-green-100",
    },
    {
      num: `${stat.profitMargin}%`,
      name: "Profit Margin",
      icon: <TbPigMoney />,
      iconColor: "bg-[#e1eefd] text-[#1058d6] ",
      bg: "bg-[#f7fafe]",
      border: "border-blue-100",
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
              <p
                className={` text-gray-500 transition-all duration-500 ${collaspe ? "text-sm" : "text-xs"}`}
              >
                {item.name}
              </p>
              <h3
                className={` font-medium text-dark transition-all duration-500  ${collaspe ? "text-xl" : "text-base"}`}
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
