"use client";

import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { NoResult } from "../loader/GeneralLoader";

export const description = "A donut chart with text";

const chartConfig = {
  value: { label: "Value" },
  Fertilizer: { label: "Fertilizer" },
  Labour: { label: "Labour" },
  Seeds: { label: "Seeds" },
  Transport: { label: "Transport" },
  Pesticides: { label: "Pesticides" },
  Others: { label: "Others" },
} satisfies ChartConfig;

export function ReportPieChart({
  chartData,
  total,
}: {
  chartData: { food: string; value: number; fill: string; exp: string }[];
  total: number;
}) {
  return (
    <Card className="w-full gap-0 bg-white flex-1 relative rounded-xl border border-border/80 hover:shadow-sm transition flex flex-col h-[300px] shrink-0">
      <CardHeader className="pb-0 shrink-0">
        <div className="flex justify-between items-center">
          <h3 className="text-dark  text-base">Expense Breakdown</h3>
        </div>
      </CardHeader>

      {!chartData.length ? (
        <div className="h-full">
          <NoResult>No expense record found!</NoResult>
        </div>
      ) : (
        <CardContent className="flex-1    min-h-0 relative overflow-hidden">
          <div className="flex sm:flex-row xl:flex-row lg:flex-col flex-col items-center h-full">
            {/* LEFT → PIE CHART */}
            <div className="w-full sm:w-[65%] lg:w-full xl:w-[50%] h-full">
              <ChartContainer
                config={chartConfig}
                className="w-full md:h-full h-[180px] lg:h-[180px] xl:h-full"
              >
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
                    innerRadius="50%"
                    outerRadius="90%"
                    strokeWidth={4}
                  ></Pie>
                </PieChart>
              </ChartContainer>
            </div>

            <div className="w-full h-full relative sm:w-[35%] lg:w-full xl:w-[50%] ">
              <div className="flex  w-full items-center justify-between mt-2 text-sm text-dark font-semibold">
                <p>Total</p>
                <p> ₦{total.toLocaleString()}</p>
              </div>
              <div className="md:h-[200px] lg:h-fit xl:h-[200px] flex mt-2 items-start justify-center  overflow-scroll no-scroll">
                <CustomLegend chartData={chartData} />
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
const CustomLegend = ({
  chartData,
}: {
  chartData: { food: string; value: number; fill: string; exp: string }[];
}) => {
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
              style={{ backgroundColor: item.fill as unknown as string }}
            />
            {item.food.slice(0, 1).toUpperCase() + item.food.slice(1)}
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
