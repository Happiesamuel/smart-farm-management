"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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
} from "../ui/select";
import { useState } from "react";

export const description = "A simple area chart";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "oklch(62.7% 0.194 149.214)",
  },
} satisfies ChartConfig;

export default function DashboardLinechart() {
  const [val, setVal] = useState("2024");
  const [crop, setCrop] = useState("corn");

  const year = [
    { id: 1, value: "2024" },
    { id: 2, value: "2025" },
    { id: 3, value: "2026" },
  ];
  const crops = [
    { id: 1, name: "Corn", value: "corn" },
    { id: 2, name: "Wheat", value: "wheat" },
    { id: 3, name: "Rice", value: "rice" },
  ];

  return (
    <Card className="lg:flex-1 w-full bg-white  rounded-xl border border-border/80 shadow shadow-dark/10 flex flex-col h-[300px] shrink-0">
      <CardHeader className="pb-0 shrink-0">
        <div className="flex justify-between items-center">
          <h3 className="text-dark font-semibold text-base">
            Monthly Yield Analysis
          </h3>
          <div className="flex items-center gap-3">
            <Select onValueChange={(e) => setCrop(e)} defaultValue={crop}>
              <SelectTrigger className="text-dark border border-border bg-white rounded-lg">
                <SelectValue placeholder="Corn" />
              </SelectTrigger>
              <SelectContent className="bg-white border-border text-zinc-400">
                {crops.map((x) => (
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
            <Select onValueChange={(e) => setVal(e)} defaultValue={val}>
              <SelectTrigger className="text-dark border border-border bg-white rounded-lg">
                <SelectValue placeholder="2024" />
              </SelectTrigger>
              <SelectContent className="bg-white border-border text-zinc-400">
                {year.map((x) => (
                  <SelectItem
                    key={x.id}
                    value={x.value.toString()}
                    className="hover:bg-zinc-900 transition-all duration-500 cursor-pointer"
                  >
                    {x.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 min-h-0  overflow-hidden">
        <ChartContainer
          config={chartConfig}
          className="w-full h-full"
          style={{ minHeight: 0, height: "100%" }}
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="#d6f5e5"
              fillOpacity={0.4}
              stroke="#1d6d2e"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
