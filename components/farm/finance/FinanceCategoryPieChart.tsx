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
  { food: "Fertilizer", value: 40, fill: "#7c0e9b" },
  { food: "Labour", value: 28, fill: "#e3c21a" },
  { food: "Seeds", value: 16, fill: "#1ae324" },
  { food: "Transport", value: 10, fill: "#009aed" },
  { food: "Others", value: 6, fill: "#6e6e6e" },
];

const chartConfig = {
  value: { label: "Value" },
  Fertilizer: { label: "Fertilizer" },
  Labour: { label: "Labour" },
  Seeds: { label: "Seeds" },
  Transport: { label: "Transport" },
  Others: { label: "Others" },
} satisfies ChartConfig;

export function FinanceCategoryPieChart() {
  return (
    <Card className="w-full gap-0  h-[220px] shrink-0">
      <CardHeader className="pb-0 shrink-0">
        <div className="flex justify-between items-center">
          <h3 className="text-dark font-semibold text-base">
            Cateory Breakdown
          </h3>
        </div>
      </CardHeader>

      <CardContent className="flex-1   min-h-0 relative overflow-hidden">
        <div className="flex sm:flex-row lg:flex-row  flex-col items-center h-full">
          {/* LEFT → PIE CHART */}
          <div className="w-full sm:w-[65%] lg:w-full xl:w-[62%] h-full">
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
                  cx="40%"
                  cy="50%"
                  innerRadius="50%"
                  outerRadius="80%"
                  strokeWidth={4}
                  paddingAngle={2}
                ></Pie>
              </PieChart>
            </ChartContainer>
          </div>

          <div className="w-full sm:w-[35%] lg:w-full  ">
            <CustomLegend />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
const CustomLegend = () => {
  return (
    <div className="flex overflow-scroll no-scroll lg:gap-2 sm:justify-start justify-center flex-row lg:flex-col sm:flex-col gap-2 text-xs">
      {chartData.map((item, index) => (
        <div
          key={index}
          className="flex items-center lg:gap-5 gap-5 lg:justify-between sm:justify-between"
        >
          {/* Left */}
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: item.fill }}
            />
            {item.food}
          </div>

          {/* Right */}
          <div className="text-zinc-500 hidden sm:flex items-center lg:gap-3 xl:gap-7 gap-7">
            <span>{item.value}%</span>
          </div>
        </div>
      ))}
    </div>
  );
};
