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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

export const description = "A donut chart with text";

const chartData = [
  { food: "wheat", value: 40, fill: "#fbc02d" },
  { food: "corn", value: 35, fill: "#ffeb3b" },
  { food: "rice", value: 25, fill: "#a5d6a7" },
];

const chartConfig = {
  value: { label: "Value" },
  wheat: { label: "Wheat" },
  corn: { label: "Corn" },
  rice: { label: "Rice" },
} satisfies ChartConfig;

export function FarmPieChart() {
  const [val, setVal] = React.useState("monthly");

  const totalvalue = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.value, 0),
    [],
  );

  const values = [
    { id: 1, name: "Monthly", value: "monthly" },
    { id: 2, name: "Weekly", value: "weekly" },
    { id: 3, name: "Daily", value: "daily" },
  ];

  return (
    <Card className="w-full  bg-white flex-1 rounded-xl border border-border/80 hover:shadow-sm transition flex flex-col h-[220px] shrink-0">
      <CardHeader className="pb-0 shrink-0">
        <div className="flex justify-between items-center">
          <h3 className="text-dark font-semibold text-base">
            Production Overview
          </h3>
          <Select onValueChange={(e) => setVal(e)} defaultValue={val}>
            <SelectTrigger className="text-dark border border-border bg-white rounded-lg">
              <SelectValue placeholder="Monthly" />
            </SelectTrigger>
            <SelectContent className="bg-white border-border text-zinc-400">
              {values.map((x) => (
                <SelectItem
                  key={x.id}
                  value={x.value}
                  className="hover:bg-zinc-900 transition-all duration-500 cursor-pointer"
                >
                  {x.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="flex-1 min-h-0  overflow-hidden">
        <ChartContainer
          config={chartConfig}
          className="w-full h-full"
          style={{ minHeight: 0, height: "100%" }}
        >
          <PieChart margin={{ top: 0, right: 0, bottom: 28, left: 0 }}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel={false} />}
            />
            <Pie
              data={chartData}
              startAngle={180}
              endAngle={0}
              dataKey="value"
              nameKey="food"
              cx="50%"
              cy="80%"
              innerRadius="120%"
              outerRadius="155%"
              strokeWidth={4}
              paddingAngle={2}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          dy="-0.15em"
                          fontSize={22}
                          fontWeight={700}
                          fill="currentColor"
                        >
                          {totalvalue.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          dy="1.4em"
                          fontSize={11}
                          fill="#71717a"
                        >
                          Total Productions
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>

            <Legend
              verticalAlign="bottom"
              align="center"
              iconSize={8}
              iconType="square"
              layout="horizontal"
              wrapperStyle={{ paddingTop: 3, fontSize: 13 }}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
