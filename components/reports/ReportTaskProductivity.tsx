"use client";

import { CheckCircle2, Clock, AlertCircle, TrendingUp } from "lucide-react";

export default function ReportTaskProductivity({
  tasks,
}: {
  tasks: { [key: string]: string }[];
}) {
  const now = new Date();

  const completed = tasks.filter((t) => t.status === "completed").length;

  const pending = tasks.filter(
    (t) => t.status === "pending" || t.status === "in_progress",
  ).length;

  const overdue = tasks.filter((t) => {
    const due = new Date(t.dueDate || t.$createdAt);
    return due < now && t.status !== "completed";
  }).length;

  const total = tasks.length;

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    {
      title: "Completed Tasks",
      value: completed,
      icon: CheckCircle2,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Pending Tasks",
      value: pending,
      icon: Clock,
      color: "bg-orange-100 text-orange-500",
    },
    {
      title: "Overdue Tasks",
      value: overdue,
      icon: AlertCircle,
      color: "bg-red-100 text-red-500",
    },
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: "bg-blue-100 text-blue-500",
    },
  ];

  return (
    <div className="w-full p-4 bg-white rounded-xl border border-border/80 flex flex-col h-[300px]">
      <h3 className="text-sm font-medium text-dark mb-3">Task Productivity</h3>

      <div className="space-y-2">
        {stats.map((item, i) => {
          const Icon = item.icon;

          return (
            <div
              key={i}
              className="flex items-center justify-between border rounded-lg px-3 py-2"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${item.color}`}>
                  <Icon size={16} />
                </div>

                <p className="text-sm text-zinc-700">{item.title}</p>
              </div>

              <p className="text-sm font-medium text-zinc-900">{item.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
