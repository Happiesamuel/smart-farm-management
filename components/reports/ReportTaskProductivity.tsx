"use client";

import { CheckCircle2, Clock, AlertCircle, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Completed Tasks",
    value: 128,
    change: "+24%",
    trend: "up",
    icon: CheckCircle2,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Pending Tasks",
    value: 36,
    change: "-8%",
    trend: "down",
    icon: Clock,
    color: "bg-orange-100 text-orange-500",
  },
  {
    title: "Overdue Tasks",
    value: 14,
    change: "-12%",
    trend: "down",
    icon: AlertCircle,
    color: "bg-red-100 text-red-500",
  },
  {
    title: "Completion Rate",
    value: "78%",
    change: "+10%",
    trend: "up",
    icon: TrendingUp,
    color: "bg-blue-100 text-blue-500",
  },
];

export default function ReportTaskProductivity() {
  return (
    <div className="w-full p-4 bg-white relative flex-1 rounded-xl border border-border/80 hover:shadow-sm transition flex flex-col h-[300px] lg:h-[300px] no-scroll shrink-0">
      <h3 className="text-sm font-medium text-dark mb-3">Task Productivity</h3>

      <div className="space-y-2">
        {stats.map((item, i) => {
          const Icon = item.icon;

          return (
            <div
              key={i}
              className="flex items-center justify-between border rounded-lg px-3 py-2"
            >
              {/* Left */}
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full flex items-center justify-center ${item.color}`}
                >
                  <Icon size={16} />
                </div>

                <p className="text-sm text-zinc-700">{item.title}</p>
              </div>

              {/* Right */}
              <div className="flex items-center gap-6">
                <p className="text-sm font-medium text-zinc-900">
                  {item.value}
                </p>

                <p
                  className={`text-xs font-medium ${
                    item.trend === "up" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {item.trend === "up" ? "↑" : "↓"} {item.change}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
