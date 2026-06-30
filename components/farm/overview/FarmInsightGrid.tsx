"use client";
import { useState } from "react";
import {
  Award,
  Bot,
  HeartPulse,
  Sprout,
  TriangleAlert,
  Wallet,
  Wheat,
  MapPin,
  Tractor,
  Receipt,
  ShoppingCart,
  ListChecks,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Sparkles,
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

export default function FarmInsightGrid({ alerts }: { alerts: Insight[] }) {
  const [expanded, setExpanded] = useState(false);

  const colors = {
    green: {
      bg: "bg-green-50",
      text: "text-green-700",
      badgeBg: "bg-green-100",
      badgeText: "text-green-600",
      cardBg: "bg-green-50/60",
      cardHover: "hover:bg-green-50",
      border: "border-green-200",
    },
    orange: {
      bg: "bg-orange-50",
      text: "text-orange-700",
      badgeBg: "bg-orange-100",
      badgeText: "text-orange-600",
      cardBg: "bg-orange-50/60",
      cardHover: "hover:bg-orange-50",
      border: "border-orange-200",
    },
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      badgeBg: "bg-blue-100",
      badgeText: "text-blue-600",
      cardBg: "bg-blue-50/60",
      cardHover: "hover:bg-blue-50",
      border: "border-blue-200",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-700",
      badgeBg: "bg-purple-100",
      badgeText: "text-purple-600",
      cardBg: "bg-purple-50/60",
      cardHover: "hover:bg-purple-50",
      border: "border-purple-200",
    },
    red: {
      bg: "bg-red-50",
      text: "text-red-700",
      badgeBg: "bg-red-100",
      badgeText: "text-red-600",
      cardBg: "bg-red-50/60",
      cardHover: "hover:bg-red-50",
      border: "border-red-200",
    },
    gray: {
      bg: "bg-zinc-100",
      text: "text-zinc-700",
      badgeBg: "bg-zinc-200",
      badgeText: "text-zinc-600",
      cardBg: "bg-zinc-50/80",
      cardHover: "hover:bg-zinc-100/60",
      border: "border-zinc-200",
    },
  };

  if (!alerts?.length) {
    return (
      <div className="w-full p-4 bg-white rounded-xl border border-border/80 flex flex-col items-center justify-center h-[200px] mt-4">
        <Bot className="text-zinc-300 mb-2" size={28} />
        <p className="text-sm text-zinc-500">No insights yet</p>
      </div>
    );
  }

  const recommendation = alerts.find((a) => a.icon === "bot");
  const allTiles = alerts
    .filter((a) => a.icon !== "bot")
    .filter((x) => !x.title.startsWith("Active Far"));

  const VISIBLE_COUNT = 4;
  const tiles = expanded ? allTiles : allTiles.slice(0, VISIBLE_COUNT);
  const hasMore = allTiles.length > VISIBLE_COUNT;

  return (
    <div className="w-full mt-4 bg-white border border-border/80 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-lg bg-primary-green/10 text-primary-green flex items-center justify-center">
            <Sparkles size={15} />
          </div>
          <h6 className="text-base font-semibold text-dark">Smart Insights</h6>
        </div>
        <span className="text-xs text-zinc-400">
          {allTiles.length} insights
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {tiles.map((item) => {
          const Icon = icons[item.icon];
          const style = colors[item.color];

          const showBadge =
            item.subtitle.toLowerCase().includes("overdue") ||
            item.subtitle.toLowerCase().includes("need");

          return (
            <div
              key={item.id}
              className={`${style.cardBg} ${style.cardHover} border ${style.border} rounded-xl p-4 transition-colors`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`size-8 rounded-lg flex items-center justify-center ${style.bg} ${style.text}`}
                >
                  <Icon size={16} />
                </div>
                {showBadge && (
                  <span
                    className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${style.badgeBg} ${style.badgeText}`}
                  >
                    {item.subtitle}
                  </span>
                )}
              </div>

              <p className="text-xl font-semibold text-dark mb-0.5 truncate">
                {item.value}
              </p>
              <p className="text-xs text-zinc-500">{item.title}</p>
            </div>
          );
        })}
      </div>

      {hasMore && (
        <button
          onClick={() => setExpanded((p) => !p)}
          className="w-full mt-3 flex items-center justify-center gap-1.5 text-sm font-medium text-primary-green hover:bg-green-50 rounded-lg py-2 transition-colors cursor-pointer"
        >
          {expanded ? (
            <>
              Show less <ChevronUp size={15} />
            </>
          ) : (
            <>
              Show {allTiles.length - VISIBLE_COUNT} more{" "}
              <ChevronDown size={15} />
            </>
          )}
        </button>
      )}

      {recommendation && (
        <div className="mt-3 bg-zinc-50/80 border border-zinc-200 rounded-xl p-4 flex items-start gap-3">
          <div className="size-8 shrink-0 rounded-lg bg-zinc-100 text-zinc-600 flex items-center justify-center">
            <Bot size={16} />
          </div>
          <div>
            <p className="text-sm font-medium text-dark mb-1">Recommendation</p>
            <p className="text-xs text-zinc-500 leading-relaxed">
              {recommendation.subtitle}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
