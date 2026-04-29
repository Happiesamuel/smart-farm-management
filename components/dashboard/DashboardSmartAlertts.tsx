import { IoReceiptOutline } from "react-icons/io5";
import { PiPlant } from "react-icons/pi";
import { SiOverleaf } from "react-icons/si";
import { CgSandClock } from "react-icons/cg";
export default function DashboardSmartAlertts() {
  const alerts = [
    {
      title: "Maize in Field A will be ready in 5 days",
      farm: "Green Valley Farm",
      text: "",
      icon: <PiPlant />,
      iconColor: "bg-[#e7f5eb] text-[#056b36] ",
      border: "bg-[#1a914c]",
      id: 1,
    },
    {
      title: "Irrigation overdue in Field B",
      farm: "Green Valley Farm",
      text: "Last irrigation was 4 days ago.",
      icon: <SiOverleaf />,
      iconColor: "bg-[#e1eefd] text-[#1058d6] ",
      border: "bg-[#1058d6]",
      id: 2,
    },
    {
      title: "High Expense detected",
      farm: "Green Valley Farm",
      text: "Fertilizer expenses are 20% higher than last month",
      icon: <IoReceiptOutline />,
      iconColor: "bg-[#fff1dd] text-[#de852c] ",
      border: "bg-[#de852c]",
      id: 3,
    },
    {
      title: "Task overdue",
      farm: "Green Valley Farm",
      text: "2 tasks are past their due date.",
      icon: <CgSandClock />,
      iconColor: "bg-[#fee7e7] text-[#e82a2d] ",
      border: "bg-[#de852c]",
      id: 4,
    },
  ];
  return (
    <div className="w-full p-4 bg-white flex-1 rounded-xl border border-border/80 hover:shadow-sm transition flex flex-col h-[320px] shrink-0">
      <div className="flex items-center justify-between pb-4">
        <h6 className="text-base text-dark">Smart Alerts</h6>
        <p className="text-sm text-primary-green">View All</p>
      </div>
      <div className="flex overflow-scroll no-scroll  flex-col gap-2">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`  flex last:border-b-0 items-center pb-2 border-b border-border gap-3 `}
          >
            <div className={`${alert.border} w-0.5 h-10`} />
            <div
              className={`text-xl  size-8 flex items-center justify-center rounded-md ${alert.iconColor}`}
            >
              {alert.icon}
            </div>
            <div className="space-y-0.5">
              <p className="text-dark/80 text-sm">{alert.title}</p>
              <p className="text-xs truncate text-zinc-500">{alert.text}</p>
              <p className="text-xs text-zinc-500">{alert.farm}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
