"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
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

export const description = "An area chart with gradient fill";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#e9575a",
  },
  mobile: {
    label: "Mobile",
    color: "#53bf62",
  },
} satisfies ChartConfig;

export function DashboardAreachart() {
  const [val, setVal] = useState("year");

  const year = [
    { id: 1, value: "year", name: "This Year" },
    { id: 2, value: "month", name: "This Month" },
  ];
  const arr = [
    {
      num: "₦1,250,000",
      name: "Total Revenue",
      bg: "bg-[#f5faf6]",
      border: "border-green-100",
    },
    {
      num: "₦620,000",
      name: "Total Expenses",
      bg: "bg-[#fef5f5]",
      border: "border-red-100",
    },
    {
      num: "₦630,000",
      name: "Net Profit",
      bg: "bg-[#f5faf6]",
      border: "border-green-100",
    },
  ];
  return (
    <Card className="w-full gap-0 bg-white flex-1 relative rounded-xl border border-border/80 hover:shadow-sm transition flex flex-col h-[500px] md:h-[300px] shrink-0">
      <CardHeader className="pb-0 shrink-0">
        <div className="flex justify-between items-center">
          <h3 className="text-dark  text-base">Farm Overview</h3>
          <div className="flex items-center gap-3">
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
                    {x.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="">
        <ChartContainer
          config={chartConfig}
          className="w-full h-[185px] md:h-[130px] pb-2"
          style={{ minHeight: 0 }}
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
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
        <div className="flex  items-center justify-center gap-2 pb-2">
          <div className="flex items-center gap-1">
            <div className="size-2 bg-[#53bf62]" />
            <p>Revenue</p>
          </div>
          <p>vs</p>
          <div className="flex items-center gap-1">
            <div className="size-2 bg-[#e9575a]" />
            <p>Expenses</p>
          </div>
        </div>
        <div className="grid gap-2 bg-none border-none grid-cols-1 md:grid-cols-3 items-center">
          {arr.map((a) => (
            <div
              className={`space-y-2 ${a.border} rounded-md border p-2 ${a.bg}`}
              key={a.name}
            >
              <p className="text-zinc-500">{a.name}</p>
              <p className="text-dark text-base">{a.num}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
