"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
export const description = "A bar chart with a label";

const chartData = [
  { food: "Growing", value: 23, fill: "#03732b", area: "80ac" },
  { food: "Flowering", value: 6, fill: "#4e8afd", area: "70ac" },
  { food: "Harvested", value: 9, fill: "#fcb304", area: "50ac" },
  { food: "Completed", value: 6, fill: "#e45551", area: "40ac" },
];

const chartConfig = {
  value: { label: "Value" },
  Growing: { label: "Growing" },
  Flowering: { label: "Flowering" },
  Harvested: { label: "Harvested" },
  Completed: { label: "Completed" },
} satisfies ChartConfig;

export function CropsBarChart() {
  return (
    <Card className="w-full gap-0  flex-1 relative rounded-xl border border-border/80 bg-transparent hover:shadow-sm transition flex flex-col h-[300px] shrink-0">
      <CardHeader className="pb-0 shrink-0">
        <div className="flex justify-between items-center">
          <h3 className="text-dark/90 font-semibold text-sm">
            Crop Status Overview
          </h3>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[250px] w-full" config={chartConfig}>
          <BarChart accessibilityLayer data={chartData} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="food"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Bar dataKey="value" fill="#03732b" radius={8}>
              <LabelList
                dataKey="value"
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
