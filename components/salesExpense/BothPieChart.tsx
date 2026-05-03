"use client";

import { Label, Pie, PieChart } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useState } from "react";

export const description = "A donut chart with text";

const chartConfig = {
  value: { label: "Value" },
  Paid: { label: "Paid" },
  Pending: { label: "Pending" },
} satisfies ChartConfig;

export function BothPieChart({
  type,
  data,
}: {
  data: { food: string; value: number; fill: string; exp: string }[];
  type: string;
}) {
  const [val, setVal] = useState("year");

  const year = [
    { id: 1, value: "year", name: "This Year" },
    { id: 2, value: "month", name: "This Month" },
  ];
  return (
    <Card className="w-full gap-0  flex-1 relative bg-transparent rounded-non   flex flex-col h-[300px] shrink-0">
      <CardHeader className="pb-0 shrink-0">
        <div className="flex justify-between mb-2 gap-2 items-center">
          <h3 className="text-dark font-semibold text-sm">
            {type === "sale" ? "Sales" : "Expenses"} Overview
          </h3>
          <Select onValueChange={(e) => setVal(e)} defaultValue={val}>
            <SelectTrigger className="text-dark  border border-border bg-white rounded-lg">
              <SelectValue placeholder="This Year" />
            </SelectTrigger>
            <SelectContent className="bg-white border-border text-zinc-400">
              {year.map((x) => (
                <SelectItem
                  key={x.id}
                  value={x.value.toString()}
                  className="hover:bg-zinc-900 transition-all duration-500 cursor-pointer"
                >
                  {x.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="flex-1    min-h-0 relative overflow-hidden">
        <div className="flex  flex-col items-center h-full">
          {/* LEFT → PIE CHART */}
          <div className="w-full h-full">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel={false} />}
                />

                <Pie
                  data={data}
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
                              className="text-sm font-semibold"
                            >
                              ₦620,000
                            </tspan>

                            <tspan
                              x={viewBox.cx}
                              dy="1.4em"
                              className="text-[11px]  font-normal"
                              fill="#71717a"
                            >
                              Total {type === "sale" ? "Revenue" : "Expenses"}
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

          <div className="w-full  ">
            <CustomLegend data={data} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
const CustomLegend = ({
  data,
}: {
  data: { food: string; value: number; fill: string; exp: string }[];
}) => {
  return (
    <div className="flex overflow-scroll no-scroll flex-col gap-2 text-sm">
      {data.map((item, index) => (
        <div key={index} className="flex items-center gap-5 justify-between">
          {/* Left */}
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2  text-dark/80"
              style={{ backgroundColor: item.fill }}
            />
            {item.food}
          </div>

          <div className="text-zinc-500 hidden sm:flex items-center lg:gap-3 xl:gap-7 gap-7">
            {/* <span>{item.value}%</span> */}
            <span>{item.exp}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
