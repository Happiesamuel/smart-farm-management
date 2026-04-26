import { FaExclamationTriangle, FaLeaf, FaBox } from "react-icons/fa";
import { IconType } from "react-icons";
type AlertType = "warning" | "success" | "info";

type Alert = {
  id: number;
  type: AlertType;
  message: string;
  action: string;
  icon: IconType;
};
const alerts: Alert[] = [
  {
    id: 1,
    type: "warning",
    message: "Field B has not been irrigated for 5 days.",
    action: "View Field",
    icon: FaExclamationTriangle,
  },
  {
    id: 2,
    type: "success",
    message: "Maize in Field A will be ready for harvest in 5 days.",
    action: "View Crop",
    icon: FaLeaf,
  },
  {
    id: 3,
    type: "info",
    message: "Fertilizer stock is running low.",
    action: "View Stock",
    icon: FaBox,
  },
];

const styles: Record<AlertType, string> = {
  warning: "bg-yellow-50 border border-yellow-200 text-yellow-800",
  success: "bg-green-50 border border-green-200 text-green-800",
  info: "bg-blue-50 border border-blue-200 text-blue-800",
};

export default function FarmSmartAlerts() {
  return (
    <div className="w-full p-4 mt-4  bg-white flex-1 rounded-xl border border-border/80 hover:shadow-sm transition flex flex-col  shrink-0">
      <h2 className="text-base text-dark font-semibold mb-4">Smart Alerts</h2>

      <div className="space-y-3">
        {alerts.map((alert) => {
          const Icon = alert.icon;

          return (
            <div
              key={alert.id}
              className={`flex flex-col gap-2 sm:flex-row sm:items-center justify-between px-4 py-3 rounded-lg ${styles[alert.type]}`}
            >
              <div className="flex items-center gap-3">
                <Icon className="text-base" />
                <span className="text-sm">{alert.message}</span>
              </div>

              <button className="bg-white text-dark text-xs font-medium cursor-pointer px-3 py-1 rounded-md border">
                {alert.action}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
