"use client";

import * as React from "react";
import { Label, Legend, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A donut chart with text";

const chartData = [
  { food: "Maize", value: 33, fill: "#0e9b36" },
  { food: "Rice", value: 25, fill: "#2283c3" },
  { food: "Tomatoes", value: 17, fill: "#e3c21a" },
  { food: "Pepper", value: 15, fill: "#ed0000" },
  { food: "Others", value: 10, fill: "#6e6e6e" },
];

const chartConfig = {
  value: { label: "Value" },
  Maize: { label: "Maize" },
  Rice: { label: "Rice" },
  Tomatoes: { label: "Tomatoes" },
  Pepper: { label: "Pepper" },
  Others: { label: "Others" },
} satisfies ChartConfig;

export function FarmPieChart() {
  const totalvalue = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.value, 0),
    [],
  );

  return (
    <Card className="w-full  bg-white flex-1 rounded-xl border border-border/80 hover:shadow-sm transition flex flex-col h-[300px] shrink-0">
      <CardHeader className="pb-0 shrink-0">
        <div className="flex justify-between items-center">
          <h3 className="text-dark font-semibold text-base">
            Crop Distribution
          </h3>
        </div>
      </CardHeader>

      <CardContent className="flex-1 min-h-0  overflow-hidden">
        <ChartContainer
          config={chartConfig}
          className="w-full h-full"
          style={{ minHeight: 0, height: "100%" }}
        >
          <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
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
              outerRadius="80%"
              strokeWidth={4}
              paddingAngle={2}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx - 48}
                          dy="0em"
                          fontSize={22}
                          fontWeight={700}
                          fill="currentColor"
                        >
                          {totalvalue.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx - 48}
                          dy="1.4em"
                          fontSize={11}
                          fill="#71717a"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <Legend
              verticalAlign="middle"
              align="right"
              iconSize={8}
              iconType="circle"
              layout="vertical"
              wrapperStyle={{
                fontSize: 13,
                lineHeight: "22px",
              }}
              formatter={(value) => {
                const item = chartData.find((x) => x.food === value);
                return `${value} ${item?.value}%`;
              }}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
