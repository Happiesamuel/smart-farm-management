"use client";

import {
  FaLeaf,
  FaBox,
  FaCheckCircle,
  FaMoneyBillWave,
  FaTasks,
} from "react-icons/fa";

type Props = {
  farm: { [key: string]: string };
  tasks: { [key: string]: string }[];
  crops: { [key: string]: string }[];
  harvests: { [key: string]: string }[];
  expenses: { [key: string]: string }[];
  sales: { [key: string]: string }[];
  fields: { [key: string]: string }[];
};

export default function FarmSmartAlerts({
  farm,
  tasks,
  crops,
  harvests,
  expenses,
  sales,
}: Props) {
  const alerts = [];

  const now = new Date();

  //------------------------------------
  // Overdue Tasks
  //------------------------------------

  const overdue = tasks.filter(
    (t) => t.status !== "completed" && new Date(t.dueDate) < now,
  );

  if (overdue.length) {
    alerts.push({
      type: "warning",
      icon: FaTasks,
      title: `${overdue.length} overdue task${overdue.length > 1 ? "s" : ""}`,
      subtitle: "Complete overdue work to avoid crop delays.",
      color: "border-red-200 bg-red-50 text-red-700",
    });
  }

  //------------------------------------
  // Harvest Ready
  //------------------------------------

  const readyHarvest = crops.filter(
    (c) => c.growthStage === "harvesting" && c.status !== "harvested",
  );

  if (readyHarvest.length) {
    alerts.push({
      type: "success",
      icon: FaLeaf,
      title: `${readyHarvest.length} crop${
        readyHarvest.length > 1 ? "s are" : " is"
      } ready for harvest`,
      subtitle: "Plan harvesting soon.",
      color: "border-green-200 bg-green-50 text-green-700",
    });
  }

  //------------------------------------
  // Revenue vs Expense
  //------------------------------------

  const totalRevenue = sales.reduce((sum, s) => sum + Number(s.amount), 0);

  const totalExpense = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  if (totalRevenue && totalExpense > totalRevenue * 0.7) {
    alerts.push({
      type: "info",
      icon: FaMoneyBillWave,
      title: "Expenses are getting high",
      subtitle: "Expenses exceed 70% of farm revenue.",
      color: "border-orange-200 bg-orange-50 text-orange-700",
    });
  }

  //------------------------------------
  // Empty Farm
  //------------------------------------

  if (!crops.length) {
    alerts.push({
      type: "info",
      icon: FaBox,
      title: "No crops planted",
      subtitle: "Start planting to begin tracking growth.",
      color: "border-blue-200 bg-blue-50 text-blue-700",
    });
  }

  //------------------------------------
  // Everything looks good
  //------------------------------------

  if (!alerts.length) {
    alerts.push({
      type: "success",
      icon: FaCheckCircle,
      title: "Farm looks healthy",
      subtitle: "No issues detected at the moment.",
      color: "border-green-200 bg-green-50 text-green-700",
    });
  }

  return (
    <div className="mt-4 rounded-xl border border-border bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-dark text-base">
            Smart Farm Alerts
          </h2>

          <p className="text-xs text-zinc-500">
            Smart recommendations for{" "}
            <span className="font-medium">{farm.farmName}</span>
          </p>
        </div>

        <div className="rounded-full bg-primary-green/10 px-3 py-1 text-xs font-medium text-primary-green">
          {alerts.length} Alert{alerts.length > 1 && "s"}
        </div>
      </div>

      <div className="space-y-3">
        {alerts.map((alert, index) => {
          const Icon = alert.icon;

          return (
            <div
              key={index}
              className={`rounded-lg border p-4 transition hover:shadow-sm ${alert.color}`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 rounded-md bg-white/80 p-2">
                  <Icon className="text-lg" />
                </div>

                <div className="flex-1">
                  <p className="font-medium">{alert.title}</p>

                  <p className="mt-1 text-sm opacity-80">{alert.subtitle}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
