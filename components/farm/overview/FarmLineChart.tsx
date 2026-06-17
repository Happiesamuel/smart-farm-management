"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Dispatch, SetStateAction } from "react";
import { NoResult } from "@/components/loader/GeneralLoader";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#53bf62",
  },
  expenses: {
    label: "Expenses",
    color: "#e9575a",
  },
} satisfies ChartConfig;

export function FarmAreachart({
  val,
  setVal,
  chartData,
  revenue,
  expense,
}: {
  val: "year" | "month";
  setVal: Dispatch<SetStateAction<"year" | "month">>;
  chartData: { month: string; revenue: number; expenses: number }[];
  revenue: number;
  expense: number;
}) {
  const year = [
    { id: 1, value: "year", name: "This Year" },
    { id: 2, value: "month", name: "This Month" },
  ];

  return (
    <Card className="w-full gap-0 bg-white flex-1 relative rounded-xl border border-border/80 hover:shadow-sm transition flex flex-col h-[340px] md:h-[300px] shrink-0">
      <CardHeader className="pb-0 shrink-0">
        <div className="flex justify-between items-center">
          <h3 className="text-dark  text-base">Revenue vs Expenses</h3>
          <div className="flex items-center gap-3">
            <Select
              onValueChange={(e: "year" | "month") => setVal(e)}
              defaultValue={val}
            >
              <SelectTrigger className="text-dark border border-border bg-white rounded-lg">
                <SelectValue placeholder="month" />
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
      {!chartData.length ? (
        <div className="h-full">
          <NoResult>No Profit Data</NoResult>
        </div>
      ) : (
        <CardContent className="">
          <div className="flex items-center gap-6 mt-2">
            <div className="space-y-1">
              <p className="text-xs text-zinc-600 font-normal">Revenue</p>
              <p className="text-sm text-primary-green font-normal">
                ₦{revenue.toLocaleString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-zinc-600 font-normal">Expenses</p>
              <p className="text-sm text-red-500 font-normal">
                ₦{expense.toLocaleString()}
              </p>
            </div>
          </div>
          <ChartContainer
            config={chartConfig}
            className="w-full h-[200px] md:h-[170px] pb-2"
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
                <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-revenue)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-revenue)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-expenses)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-expenses)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <Area
                fillOpacity={0.4}
                stackId="a"
                dataKey="revenue"
                type="natural"
                fill="url(#fillRevenue)"
                stroke="var(--color-revenue)"
              />
              <Area
                dataKey="expenses"
                fill="url(#fillExpenses)"
                stroke="var(--color-expenses)"
                type="natural"
                fillOpacity={0.4}
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
        </CardContent>
      )}
    </Card>
  );
}
