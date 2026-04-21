import React from "react";

import {
  PiFarm,
  PiPlant,
  PiPackage,
  PiCurrencyDollar,
  PiChartLine,
} from "react-icons/pi";
export default function DashboardFarms() {
  const stats = [
    {
      num: 2,
      name: "Active Farms",
      icon: <PiFarm />,
      bg: "bg-green-50",
      border: "border-green-200",
      iconColor: "text-green-600",
    },
    {
      num: 12,
      name: "Total Crops",
      icon: <PiPlant />,
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      iconColor: "text-emerald-600",
    },
    {
      num: 8,
      name: "Total Harvests",
      icon: <PiPackage />,
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      iconColor: "text-yellow-600",
    },
    {
      num: "₦250,000",
      name: "Total Revenue",
      icon: <PiCurrencyDollar />,
      bg: "bg-blue-50",
      border: "border-blue-200",
      iconColor: "text-blue-600",
    },
    {
      num: "₦100,000",
      name: "Net Profit",
      icon: <PiChartLine />,
      bg: "bg-green-50", // change to red if loss
      border: "border-green-200",
      iconColor: "text-green-600",
    },
  ];
  return (
    <div className="pb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((item, i) => (
          <div
            key={i}
            className={`p-5 rounded-2xl border ${item.bg} ${item.border} flex items-center gap-4`}
          >
            <div className={`text-2xl ${item.iconColor}`}>{item.icon}</div>

            <div>
              <p className="text-sm text-gray-500">{item.name}</p>
              <h3 className="text-xl font-semibold text-gray-900">
                {item.num}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
