import {
  Award,
  Bot,
  HeartPulse,
  Sprout,
  TriangleAlert,
  Wallet,
  Wheat, // harvest
  MapPin, // field
  Tractor, // farm
  Receipt, // expense
  ShoppingCart, // sales
  ListChecks, // task
  TrendingUp, // growth
} from "lucide-react";

type InsightIcon =
  | "health"
  | "priority"
  | "crop"
  | "money"
  | "worker"
  | "bot"
  | "harvest"
  | "field"
  | "farm"
  | "expense"
  | "sales"
  | "task"
  | "growth";

type InsightColor = "green" | "orange" | "blue" | "purple" | "gray" | "red";

type Insight = {
  id: number;
  title: string;
  value: string;
  subtitle: string;
  icon: InsightIcon;
  color: InsightColor;
};

const icons: Record<InsightIcon, React.ComponentType<{ size?: number }>> = {
  health: HeartPulse,
  priority: TriangleAlert,
  crop: Sprout,
  money: Wallet,
  worker: Award,
  bot: Bot,
  harvest: Wheat,
  field: MapPin,
  farm: Tractor,
  expense: Receipt,
  sales: ShoppingCart,
  task: ListChecks,
  growth: TrendingUp,
};
export default function DashboardSmartAlerts({
  alerts,
}: {
  alerts: Insight[];
}) {
  const colors = {
    green: {
      bg: "bg-green-50",
      text: "text-green-700",
      border: "bg-green-500",
    },
    orange: {
      bg: "bg-orange-50",
      text: "text-orange-700",
      border: "bg-orange-500",
    },
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "bg-blue-500",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-700",
      border: "bg-purple-500",
    },
    red: {
      bg: "bg-red-50",
      text: "text-red-700",
      border: "bg-red-500",
    },
    gray: {
      bg: "bg-zinc-50",
      text: "text-zinc-700",
      border: "bg-zinc-300",
    },
  };

  if (!alerts?.length) {
    return (
      <div className="w-full p-4 bg-white rounded-xl border border-border/80 flex flex-col h-[320px]">
        <div className="flex items-center justify-between pb-4">
          <h6 className="text-base font-semibold text-dark">Smart Insights</h6>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-2 text-center">
          <div className="size-10 rounded-full bg-zinc-50 text-zinc-400 flex items-center justify-center">
            <Bot size={18} />
          </div>
          <p className="text-sm text-zinc-500">No insights yet</p>
          <p className="text-xs text-zinc-400">
            Add farms, crops, or tasks to see insights here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 bg-white rounded-xl border border-border/80 hover:shadow-sm transition flex flex-col h-[320px]">
      <div className="flex items-center justify-between pb-4">
        <h6 className="text-base font-semibold text-dark">Smart Insights</h6>
      </div>

      <div className="flex flex-col gap-1 overflow-y-auto no-scrollbar">
        {alerts.map((item) => {
          const Icon = icons[item.icon];
          const style = colors[item.color];

          return (
            <div
              key={item.id}
              className="flex items-start gap-3 px-2 py-2.5 rounded-lg hover:bg-zinc-50/80 transition-colors border-b border-border last:border-0"
            >
              <div
                className={`w-0.5 self-stretch rounded-full ${style.border}`}
              />

              <div
                className={`size-9 shrink-0 rounded-lg flex items-center justify-center ${style.bg} ${style.text}`}
              >
                <Icon size={18} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h6 className="text-sm font-medium text-dark truncate">
                    {item.title}
                  </h6>
                  <span
                    className={`text-sm font-semibold shrink-0 ${style.text}`}
                  >
                    {item.value}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
