"use client";

import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A donut chart with text";

const chartData = [
  { food: "Fertilizer", value: 40, fill: "#3f86ee", exp: "₦248,000" },
  { food: "Labour", value: 25, fill: "#53bf62", exp: "₦155,000" },
  { food: "Seeds", value: 15, fill: "#fdb214", exp: "₦93,000" },
  { food: "Transport", value: 10, fill: "#e9575a", exp: "₦62,000" },
  { food: "Pesticides", value: 6, fill: "#b893ed", exp: "₦37,000" },
  { food: "Others", value: 4, fill: "#c8c7ee", exp: "₦24,000" },
];

const chartConfig = {
  value: { label: "Value" },
  Fertilizer: { label: "Fertilizer" },
  Labour: { label: "Labour" },
  Seeds: { label: "Seeds" },
  Transport: { label: "Transport" },
  Pesticides: { label: "Pesticides" },
  Others: { label: "Others" },
} satisfies ChartConfig;

export function DashboardPieChart() {
  return (
    <Card className="w-full gap-0 bg-white flex-1 relative rounded-xl border border-border/80 hover:shadow-sm transition flex flex-col h-[300px] shrink-0">
      <CardHeader className="pb-0 shrink-0">
        <div className="flex justify-between items-center">
          <h3 className="text-dark  text-base">Expense Breakdown</h3>
        </div>
      </CardHeader>

      <CardContent className="flex-1    min-h-0 relative overflow-hidden">
        <div className="flex sm:flex-row xl:flex-row lg:flex-col flex-col items-center h-full">
          {/* LEFT → PIE CHART */}
          <div className="w-full sm:w-[65%] lg:w-full xl:w-[50%] h-full">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel={false} />}
                />

                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="food"
                  cx="50%"
                  cy="50%"
                  innerRadius="60%"
                  outerRadius="90%"
                  strokeWidth={4}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              dy="-0.3em"
                              className="text-base sm:text-lg font-semibold"
                            >
                              ₦620,000
                            </tspan>

                            <tspan
                              x={viewBox.cx}
                              dy="1.4em"
                              className="text-[11px] sm:text-sm font-normal"
                              fill="#71717a"
                            >
                              Total Expenses
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>

          <div className="w-full sm:w-[35%] lg:w-full xl:w-[50%] ">
            <CustomLegend />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
const CustomLegend = () => {
  return (
    <div className="flex overflow-scroll no-scroll lg:gap-4 xl:gap-2 sm:justify-start justify-center flex-row lg:flex-row xl:flex-col sm:flex-col gap-2 text-sm">
      {chartData.map((item, index) => (
        <div
          key={index}
          className="flex items-center lg:gap-2 xl:gap-5 gap-5 lg:justify-start xl:justify-between sm:justify-between"
        >
          {/* Left */}
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full text-dark/80"
              style={{ backgroundColor: item.fill }}
            />
            {item.food}
          </div>

          {/* Right */}
          <div className="text-zinc-500 hidden sm:flex items-center lg:gap-3 xl:gap-7 gap-7">
            <span>{item.value}%</span>
            <span>{item.exp}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
